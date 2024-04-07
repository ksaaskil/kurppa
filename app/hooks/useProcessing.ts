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
  const [audio, setAudio] = useState<Blob | undefined>(undefined);

  const {
    process: transcribe,
    loading: isTranscribing,
    error: transcriptionError,
    result: transcription,
    reset: resetTranscribe,
  } = useTranscribe();

  const {
    process: decipher,
    error: decipherError,
    loading: deciphering,
    result: decipherResult,
    reset: resetDecipher,
  } = useDecipher();

  const processAudio = useCallback(
    async (audio: Blob) => {
      // Reset workflow steps
      resetTranscribe();
      resetDecipher();

      setProcessing(true);
      try {
        // Step 1
        setAudio(audio);
        // Step 2
        const transcriptionResult = await transcribe(audio);
        if (!transcriptionResult) {
          return;
        }
        // Step 3
        await decipher(transcriptionResult);
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
