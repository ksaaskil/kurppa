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
  const [isTranscribing, setIsTranscibing] = useState(false);
  const [transcriptionError, setTranscriptionError] = useState(
    undefined as Error | undefined,
  );

  const reset = useCallback(() => {
    setTranscriptionError(undefined);
  }, []);

  const transcribe = useCallback(async (audio: Blob) => {
    setTranscriptionError(undefined);
    setIsTranscibing(true);
    try {
      return await transcribeAudio(audio);
    } catch (error: any) {
      console.error(`Error transcribing`, error);
      setTranscriptionError(error);
    } finally {
      setIsTranscibing(false);
    }
  }, []);

  return { transcribe, isTranscribing, transcriptionError, reset };
}

export { useTranscribe };
