import { useCallback, useState } from "react";
import {
  ApiErrorResponse,
  DecipherApiResponse,
  DecipherResult,
} from "../utils/shared";

interface DecipherTextResult {
  result?: DecipherResult;
  errors?: ApiErrorResponse[];
}

async function decipherText(
  transcription: string,
): Promise<DecipherTextResult> {
  const response = await fetch("/api/decipher", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: transcription,
    }),
  });
  const responseJson: DecipherApiResponse = await response.json();

  const { species, amount, errors } = responseJson;

  if (errors) {
    return { errors };
  }

  if (!species || !amount) {
    throw new Error("Invalid species or amount from deciphering input");
  }

  console.log(`Got response: ${JSON.stringify(response)}`);
  return { result: { species, amount, processed: false } };
}

function useDecipher() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DecipherResult | undefined>(undefined);
  const [error, setError] = useState(undefined as ApiErrorResponse | undefined);
  const [prompt, setPrompt] = useState(undefined as string | undefined);

  const reset = useCallback(() => {
    setError(undefined);
  }, []);

  const decipher = useCallback(async function decipher(transcription: string) {
    setError(undefined);
    setLoading(true);
    try {
      const { result, errors } = await decipherText(transcription);
      if (errors) {
        setError(errors[0]);
        return;
      }
      setResult(result);
      return result;
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { decipher, loading, error, prompt, reset, result };
}

export { useDecipher };
