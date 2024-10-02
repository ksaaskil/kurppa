import ast  # for converting embeddings saved as strings back to arrays
import logging
import os  # for getting API token from env variable OPENAI_API_KEY

import pandas as pd  # for storing text and embeddings data
import tiktoken  # for counting tokens
from openai import OpenAI  # for calling the OpenAI API
from scipy import spatial  # for calculating vector similarities for search

logging.basicConfig(level=logging.INFO)

EMBEDDING_MODEL = "text-embedding-3-small"
GPT_MODEL = "gpt-4o-mini"
EMBEDDINGS_PATH = "embeddings.csv"
PRINT_MESSAGE = True


def strings_ranked_by_relatedness(
    client: OpenAI,
    query: str,
    df: pd.DataFrame,
    relatedness_fn=lambda x, y: 1 - spatial.distance.cosine(x, y),
    top_n: int = 100,
) -> tuple[list[str], list[float]]:
    """Returns a list of strings and relatednesses, sorted from most related to least."""
    query_embedding_response = client.embeddings.create(
        model=EMBEDDING_MODEL,
        input=query,
    )
    query_embedding = query_embedding_response.data[0].embedding
    strings_and_relatednesses = [
        (row["text"], relatedness_fn(query_embedding, row["embedding"]))
        for i, row in df.iterrows()
    ]
    strings_and_relatednesses.sort(key=lambda x: x[1], reverse=True)
    strings, relatednesses = zip(*strings_and_relatednesses)
    return strings[:top_n], relatednesses[:top_n]


def query_message(
    client: OpenAI, query: str, df: pd.DataFrame, model: str, token_budget: int
) -> str:
    """Return a message for GPT, with relevant source texts pulled from a dataframe."""
    strings, relatednesses = strings_ranked_by_relatedness(client, query, df)
    introduction = 'Käytä allaolevia artikkeleita lintulajeista vastaamiseen. Jos vastausta ei löydy artikkeleista, kirjoita "En löytänyt vastausta."'
    question = f"\n\nKysymys: {query}"
    message = introduction
    inserted_documents = 0
    for string in strings:
        next_article = f'\n\nLintulajin kuvaus:\n"""\n{string}\n"""'
        if num_tokens(message + next_article + question, model=model) > token_budget:
            break
        else:
            message += next_article
            inserted_documents += 1
    logging.info(f"Retrieved {inserted_documents} documents")
    return message + question


def num_tokens(text: str, model: str = GPT_MODEL) -> int:
    """Return the number of tokens in a string."""
    encoding = tiktoken.encoding_for_model(model)
    return len(encoding.encode(text))


_embeddings_df: pd.DataFrame | None = None


def get_embeddings() -> pd.DataFrame:
    global _embeddings_df
    if _embeddings_df is None:
        logging.info(f"Loading embeddings from {EMBEDDINGS_PATH}")
        _embeddings_df = pd.read_csv(EMBEDDINGS_PATH)
        _embeddings_df["embedding"] = _embeddings_df["embedding"].apply(
            ast.literal_eval
        )
        logging.info(f"Loaded {_embeddings_df.shape[0]} embeddings")
    return _embeddings_df


PROMPT = """
Autat käyttäjää tunnistamaan mahdollisen lintulajin.
Tehtäväsi on palauttaa lista mahdollisista lintulajeista jotka sopivat käyttäjän
antamiin tuntomerkkeihin. Voit myös kysyä lisätietoja tai kertoa lisää lajin tuntomerkeistä.
"""
DEFAULT_TOKEN_BUDGET = 32 * 1024 - 500


def ask(
    client: OpenAI,
    query: str,
    model: str = GPT_MODEL,
    token_budget: int = DEFAULT_TOKEN_BUDGET,
    print_message: bool = False,
) -> tuple[str, str]:
    """Answers a query using GPT and a dataframe of relevant texts and embeddings."""
    df = get_embeddings()
    message = query_message(client, query, df, model=model, token_budget=token_budget)
    if print_message:
        print(message)

    messages = [
        {"role": "system", "content": PROMPT},
        {"role": "user", "content": message},
    ]
    response = client.chat.completions.create(
        model=model,
        messages=messages,  # type: ignore
        temperature=0,
    )
    response_message = response.choices[0].message.content
    if not response_message:
        raise Exception("Empty response from GPT")
    return response_message, message


def ask_stream(
    client: OpenAI,
    query: str,
    model: str = GPT_MODEL,
    token_budget: int = DEFAULT_TOKEN_BUDGET,
):
    df = get_embeddings()
    message = query_message(client, query, df, model=model, token_budget=token_budget)

    messages = [
        {"role": "system", "content": PROMPT},
        {"role": "user", "content": message},
    ]
    response = client.chat.completions.create(
        model=model,
        messages=messages,  # type: ignore
        temperature=0,
        stream=True,
    )
    partial_message = ""
    for chunk in response:
        if chunk.choices[0].delta.content is not None:
            partial_message = partial_message + chunk.choices[0].delta.content
            yield partial_message


def main():
    client = OpenAI(
        api_key=os.environ.get(
            "OPENAI_API_KEY", "<your OpenAI API key if not set as env var>"
        )
    )
    # Read input from stdin
    query = input("Kysy mitä tahansa Suomen linnuista: ")
    response, message = ask(client, query, print_message=PRINT_MESSAGE)

    if PRINT_MESSAGE:
        logging.info(f"Message: {message}")

    print(response)


if __name__ == "__main__":
    main()
