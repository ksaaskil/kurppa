import { useCallback, useState } from "react";
import { useDecipher } from "./useDecipher";
import { useTranscribe } from "./useTranscribe";

export default function useProcessing() {
  const [audio, setAudio] = useState<Blob | undefined>(undefined);
  const [transcription, setTranscription] = useState<string | undefined>(
    undefined,
  );

  const { transcribe, isTranscribing, transcriptionError } = useTranscribe();

  const processAudio = useCallback(
    async (audio: Blob) => {
      setAudio(audio);
      setTranscription(undefined);
      const text = await transcribe(audio);
      setTranscription(text);
    },
    [transcribe],
  );

  const {
    result: decipherResult,
    error: decipherError,
    loading: deciphering,
    prompt,
  } = useDecipher({ userInput: transcription });

  const isProcessing = isTranscribing || deciphering;
  const processingError = transcriptionError || decipherError;

  return {
    isProcessing,
    processingError,
    transcription,
    isTranscribing,
    decipherResult,
    deciphering,
    prompt,
    transcriptionError,
    decipherError,
    processAudio,
  };
}
