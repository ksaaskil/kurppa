import { useCallback, useState } from "react";
import { blobToBase64 } from "../utils/blobToBase64";

async function transcribeAudio(audio: Blob): Promise<string> {
  const audioBase64 = await blobToBase64(audio);
  try {
    const response = await fetch("/api/transcribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        audio: audioBase64,
        mimeType: audio.type,
      }),
    }).then((res) => res.json());
    const { text, error } = response;

    if (error) {
      console.error(`Error transcribing`, error);
      throw new Error(error);
    }

    console.log(`Got response: ${text}`);
    return text;
  } catch (error: any) {
    console.error(`Error transcribing`, error);
    throw error;
  }
}

function useTranscribe() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | undefined>(undefined);
  const [error, setError] = useState(undefined as Error | undefined);

  const reset = useCallback(() => {
    setError(undefined);
  }, []);

  const process = useCallback(async (audio: Blob) => {
    setError(undefined);
    setLoading(true);
    try {
      const result = await transcribeAudio(audio);
      setResult(result);
      return result;
    } catch (error: any) {
      console.error(`Error transcribing`, error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { process, loading, error, reset, result };
}

export { useTranscribe };
