import { useEffect, useState } from "react";

function useTranscribe({ audioBase64 }: { audioBase64: String | null }) {
  const [transcription, setTranscription] = useState("");
  const [isTranscribing, setIsTranscibing] = useState(false);
  const [transcriptionError, setTranscriptionError] = useState(null as Error | null);

  async function transcribe() {
    setTranscriptionError(null);
    if (!audioBase64) {
      setTranscription("");
      return;
    }

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
      // const { text } = response;
      const { text } = { text: "Kolme varista" }; // DEBUG
      console.log(`Got response: ${text}`);
      setTranscription(text);
    } catch (error: any) {
      console.error(error);
      setTranscriptionError(error);
    } finally {
      setIsTranscibing(false);
    }
  }

  useEffect(() => {
    transcribe();
  }, [audioBase64]);

  return { transcription, isTranscribing, transcriptionError };
}

export { useTranscribe };
