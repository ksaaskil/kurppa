import { ProcessingStatus as IProcessingStatus } from "../hooks/useProcessing";
import Decipher from "./DecipherStatus";
import Transcription from "./TranscriptionStatus";

export default function ProcessingStatus({
  status,
  visible,
}: {
  status: IProcessingStatus;
  visible: boolean;
}) {
  return (
    (visible && (
      <div className="toast toast-end toast-middle flex flex-col">
        <div className="flex flex-col items-end justify-between alert bg-neutral min-w-96">
          <Transcription
            transcription={status.transcription.result}
            transcriptionError={status.transcription.error}
            isTranscribing={status.transcription.processing}
          />
          <Decipher
            result={status.decipher.result}
            error={status.decipher.error}
            loading={status.decipher.processing}
          />
        </div>
      </div>
    )) ||
    null
  );
}
