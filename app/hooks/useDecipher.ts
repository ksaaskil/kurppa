import { useEffect, useState } from "react";
import { DecipherResult } from "../utils/shared";

function useDecipher({ userInput }: { userInput: String | undefined }) {
  const [result, setResult] = useState(undefined as DecipherResult | undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined as Error | undefined);
  const [prompt, setPrompt] = useState(undefined as string | undefined);

  useEffect(() => {
    async function decipher() {
      setError(undefined);
      if (!userInput) {
        setResult(undefined);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch("/api/decipher", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: userInput,
          }),
        });
        const responseJson = await response.json();

        const { species, amount, error, prompt } = responseJson;

        if (prompt) {
          setPrompt(prompt);
        }

        if (error) {
          setResult(undefined);
          setError(error);
          return;
        }

        if (!species || !amount) {
          throw new Error("Invalid species or amount from deciphering input");
        }

        console.log(`Got response: ${JSON.stringify(response)}`);
        setResult({ species, amount });
      } catch (error: any) {
        console.error(error);
        setResult(undefined);
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    decipher();
  }, [userInput]);

  return { result, loading, error, prompt };
}

export { useDecipher };
