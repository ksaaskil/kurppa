import { ApiErrorResponse, DecipherResult } from "../utils/shared";
import Decipher from "./DecipherStatus";
import Transcription from "./TranscriptionStatus";

export default function ProcessingStatus({
  transcription,
  transcriptionError,
  isTranscribing,
  decipherResult,
  decipherError,
  isDeciphering,
  visible,
  isRecording,
}: {
  transcription?: string;
  transcriptionError?: Error;
  isTranscribing: boolean;
  decipherResult?: DecipherResult;
  decipherError?: ApiErrorResponse;
  isDeciphering: boolean;
  prompt?: string;
  visible: boolean;
  isRecording: boolean;
}) {
  return (
    (visible && (
      <div className="toast toast-end toast-middle flex flex-col">
        <div className="flex flex-col items-end justify-between alert bg-neutral min-w-96">
          <Transcription
            transcription={transcription}
            transcriptionError={transcriptionError}
            isTranscribing={isTranscribing}
          />
          <Decipher
            result={decipherResult}
            error={decipherError}
            loading={isDeciphering}
          />
        </div>
      </div>
    )) ||
    null
  );
}
