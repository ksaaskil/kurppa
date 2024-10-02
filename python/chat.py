import os

import gradio as gr
from ask import ask
from openai import OpenAI


def make_predict(client: OpenAI):
    def predict(message, history):
        # Ignore history for now
        # history_openai_format = []
        # for human, assistant in history:
        #     history_openai_format.append({"role": "user", "content": human})
        #     history_openai_format.append({"role": "assistant", "content": assistant})

        # history_openai_format.append({"role": "user", "content": message})
        response, _ = ask(client, query=message)
        return response

        """ response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=history_openai_format,
            temperature=1.0,
            stream=True,
        )
        partial_message = ""
        for chunk in response:
            if chunk.choices[0].delta.content is not None:
                partial_message = partial_message + chunk.choices[0].delta.content
                yield partial_message """

    return predict


def main():
    OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY", None)
    if not OPENAI_API_KEY:
        raise ValueError("OPENAI_API_KEY not set. Set it as an environment variable.")
    client = OpenAI(api_key=OPENAI_API_KEY)
    predict = make_predict(client)
    gr.ChatInterface(predict).launch()


if __name__ == "__main__":
    main()
