import os

import gradio as gr
from ask import ask_stream
from openai import OpenAI


def make_predict(client: OpenAI):
    def predict(message, history):
        # Ignore history for now
        """messages = []
        for human, assistant in history:
            messages.append({"role": "user", "content": human})
            messages.append({"role": "assistant", "content": assistant})
        messages.append({"role": "user", "content": message})"""

        for res in ask_stream(client, message):
            yield res

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
