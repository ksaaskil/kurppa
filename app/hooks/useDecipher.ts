import { useEffect, useState } from "react";
import { ApiErrorResponse, DecipherApiResponse, DecipherResult } from "../utils/shared";

function useDecipher({ userInput }: { userInput: String | undefined }) {
  const [result, setResult] = useState(undefined as DecipherResult | undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined as ApiErrorResponse | undefined);
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
        const responseJson: DecipherApiResponse = await response.json();

        const { species, amount, errors, prompt } = responseJson;

        if (prompt) {
          setPrompt(prompt);
        }

        if (errors) {
          setResult(undefined);
          setError(errors[0]);
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
        setError({ title: "Error calling decipher API", detail: error.message });
      } finally {
        setLoading(false);
      }
    }

    decipher();
  }, [userInput]);

  return { result, loading, error, prompt };
}

export { useDecipher };
