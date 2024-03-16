import { useEffect, useState } from "react";
import { blobToBase64 } from "../utils/blobToBase64";

function useTranscribe({ audio }: { audio: Blob | null }) {
  const [transcription, setTranscription] = useState(
    undefined as String | undefined,
  );
  const [isTranscribing, setIsTranscibing] = useState(false);
  const [transcriptionError, setTranscriptionError] = useState(
    null as Error | null,
  );

  useEffect(() => {
    async function transcribe() {
      setTranscriptionError(null);

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
        const { text } = response;
        console.log(`Got response: ${text}`);
        setTranscription(text);
      } catch (error: any) {
        console.error(error);
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
