"""Create embeddings for scraped articles."""
import logging
import os
from pathlib import Path

import openai
import pandas as pd

EMBEDDING_MODEL = "text-embedding-3-small"
BATCH_SIZE = 1000  # you can submit up to 2048 embedding inputs per request
SAVE_PATH = "embeddings.csv"

logging.basicConfig(level=logging.INFO)

def main():
    client = openai.OpenAI(api_key=os.environ.get("OPENAI_API_KEY", "<your OpenAI API key if not set as env var>"))
    embeddings = []
    # Read all files from folder `scraped`
    files = os.listdir("scraped")

    data = {
        file: Path(f"scraped/{file}").read_text()
        for file in files
    }
    # Add bird name to the data
    strings = [f"""
<h1>{key.strip('.txt')}</h1>
{value}
""" for key, value in data.items()]

    for batch_start in range(0, len(strings), BATCH_SIZE):
        batch_end = batch_start + BATCH_SIZE
        batch = strings[batch_start:batch_end]
        print(f"Batch {batch_start} to {batch_end-1}")
        response = client.embeddings.create(model=EMBEDDING_MODEL, input=batch)
        for i, be in enumerate(response.data):
            assert i == be.index  # double check embeddings are in same order as input
        batch_embeddings = [e.embedding for e in response.data]
        embeddings.extend(batch_embeddings)

    df = pd.DataFrame({"text": strings, "embedding": embeddings})

    df.to_csv(SAVE_PATH, index=False)

if __name__ == "__main__":
    main()
