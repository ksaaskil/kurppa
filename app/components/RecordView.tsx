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
      <div className="px-2 w-full lg:max-w-lg">
        {lastObservation && <LastObservation observation={lastObservation} />}
        {!lastObservation && <Instructions />}
      </div>
      <div className="px-2 w-full lg:max-w-lg mt-2">
        <ActionButtons
          processing={processingStatus.processing}
          recording={recording}
          toggleRecording={toggleRecording}
        />
      </div>

      <ProcessingStatus
        status={processingStatus}
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
