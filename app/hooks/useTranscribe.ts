import { useEffect, useState } from "react";
import { blobToBase64 } from "../utils/blobToBase64";

function useTranscribe({ audio }: { audio: Blob | null }) {
  const [transcription, setTranscription] = useState(
    undefined as string | undefined,
  );
  const [isTranscribing, setIsTranscibing] = useState(false);
  const [transcriptionError, setTranscriptionError] = useState(
    undefined as Error | undefined,
  );

  useEffect(() => {
    async function transcribe() {
      setTranscriptionError(undefined);

      if (!audio) {
        setTranscription(undefined);
        return;
      }

      const audioBase64 = await blobToBase64(audio);

      setIsTranscibing(true);
      try {
        const response = await fetch("/api/transcribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            audio: audioBase64,
          }),
        }).then((res) => res.json());
        const { text, error } = response;

        if (error) {
          console.error(`Error transcribing`, error);
          setTranscriptionError(new Error(error));
          return;
        }

        console.log(`Got response: ${text}`);
        setTranscription(text);
      } catch (error: any) {
        console.error(`Error transcribing`, error);
        setTranscriptionError(error);
      } finally {
        setIsTranscibing(false);
      }
    }
    transcribe();
  }, [audio]);

  return { transcription, isTranscribing, transcriptionError };
}

export { useTranscribe };
