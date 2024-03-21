import { useDecipher } from "./useDecipher";
import { useTranscribe } from "./useTranscribe";

interface UseProcessingProps {
    audio?: Blob;
}

export default function useProcessing({ audio }: UseProcessingProps) {
    const { transcription, isTranscribing, transcriptionError } = useTranscribe({
        audio,
    });

    const {
        result: decipherResult,
        error: decipherError,
        loading: deciphering,
        prompt,
    } = useDecipher({ userInput: transcription });

    const isProcessing = isTranscribing || deciphering;
    const processingError = transcriptionError || decipherError;

    return { isProcessing, processingError, transcription, isTranscribing, decipherResult, deciphering, prompt, transcriptionError, decipherError }
}