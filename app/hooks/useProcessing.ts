import { useCallback, useState } from "react";
import { useDecipher } from "./useDecipher";
import { useTranscribe } from "./useTranscribe";
import { DecipherResult } from "../utils/shared";

export interface WorkflowStepStatus {
  result?: any;
  error?: any;
  processing: boolean;
}

export interface ProcessingStatus {
  record: WorkflowStepStatus;
  transcription: WorkflowStepStatus;
  decipher: WorkflowStepStatus;
  processing: boolean;
  result?: DecipherResult;
  error?: any;
}

export default function useProcessing({ recording }: { recording: boolean }) {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<any>(undefined);
  const [audio, setAudio] = useState<Blob | undefined>(undefined);
  const [transcription, setTranscription] = useState<string | undefined>(
    undefined,
  );

  const {
    transcribe,
    isTranscribing,
    transcriptionError,
    reset: resetTranscribe,
  } = useTranscribe();

  const [decipherResult, setDecipherResult] = useState<
    DecipherResult | undefined
  >(undefined);
  const {
    decipher,
    error: decipherError,
    loading: deciphering,
    prompt,
    reset: resetDecipher,
  } = useDecipher();

  const processAudio = useCallback(
    async (audio: Blob) => {
      setError(undefined);
      setProcessing(true);
      resetTranscribe();
      resetDecipher();
      try {
        setAudio(audio);
        setTranscription(undefined);
        const text = await transcribe(audio);
        if (!text) {
          return;
        }
        setTranscription(text);
        const decipherResult = await decipher(text);
        setDecipherResult(decipherResult);
      } finally {
        setProcessing(false);
      }
    },
    [transcribe, decipher, resetDecipher, resetTranscribe],
  );

  const status: ProcessingStatus = {
    record: {
      processing: recording,
      result: audio,
    },
    transcription: {
      processing: isTranscribing,
      result: transcription,
      error: transcriptionError,
    },
    decipher: {
      processing: deciphering,
      result: decipherResult,
      error: decipherError,
    },
    processing,
    result: decipherResult,
    error: transcriptionError || decipherError,
  };

  return {
    processAudio,
    status,
  };
}
