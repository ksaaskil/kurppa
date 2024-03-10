import { useEffect, useState } from "react";

function useTranscribe({ audioBase64 }: { audioBase64: String | null }) {
  const [transcription, setTranscription] = useState("");
  const [isTranscribing, setIsTranscibing] = useState(false);

  async function transcribe() {
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
      const { text } = response;
      console.log(`Got response: ${text}`);
      setTranscription(text);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTranscibing(false);
    }
  }

  useEffect(() => {
    transcribe();
  }, [audioBase64]);

  return { transcription, isTranscribing };
}

export { useTranscribe };
