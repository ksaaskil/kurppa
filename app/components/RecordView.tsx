import { Observation } from "../utils/shared";
import ActionButtons from "./ActionButtons";
import Instructions from "./Instructions";
import LastObservation from "./LastObservation";
import ProcessingStatus from "./ProcessingStatus";
import { ProcessingStatus as IProcessingStatus } from "../hooks/useProcessing";

export default function RecordView({
  toggleRecording,
  lastObservation,
  recording,
  processingStatus,
}: {
  toggleRecording: () => void;
  lastObservation?: Observation;
  recording: boolean;
  processingStatus: IProcessingStatus;
}) {
  return (
    <div className="h-full container mx-auto flex flex-col items-center justify-end">
      <div className="grow p-4">
        {lastObservation && <LastObservation observation={lastObservation} />}
        {!lastObservation && <Instructions />}
      </div>
      <ActionButtons
        processing={processingStatus.processing}
        recording={recording}
        toggleRecording={toggleRecording}
      />

      <ProcessingStatus
        transcription={processingStatus.transcription.result}
        transcriptionError={processingStatus.transcription.error}
        isTranscribing={processingStatus.transcription.processing}
        decipherResult={processingStatus.decipher.result}
        decipherError={processingStatus.decipher.error}
        isDeciphering={processingStatus.decipher.processing}
        isRecording={recording}
        visible={
          !recording &&
          (processingStatus.processing ||
            !!processingStatus.decipher.error ||
            !!processingStatus.transcription.error ||
            !!processingStatus.transcription.result)
        }
      />
    </div>
  );
}
