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
}

export default function useProcessing({ recording }: { recording: boolean }) {
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
    processing: isProcessing,
    result: decipherResult,
  };

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
    status,
  };
}
