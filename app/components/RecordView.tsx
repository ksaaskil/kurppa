import { Observation } from "../utils/shared";
import ActionButtons from "./ActionButtons";
import Instructions from "./Instructions";
import LastObservation from "./LastObservation";
import ProcessingStatus from "./ProcessingStatus";
import { ProcessingStatus as IProcessingStatus } from "../hooks/useProcessing";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), {
  loading: () => <p>Kartta latautuu...</p>,
  ssr: false,
});

export default function RecordView({
  toggleRecording,
  lastObservation,
  recording,
  processingStatus,
  showMap,
}: {
  toggleRecording: () => void;
  lastObservation?: Observation;
  recording: boolean;
  processingStatus: IProcessingStatus;
  showMap: boolean;
}) {
  return (
    <div className="h-full container mx-auto flex flex-col items-center justify-end lg:max-w-lg space-y-4 px-2">
      <div className="w-full flex-grow grow">{showMap && <Map />}</div>
      <div className="w-full">
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
      <div className="w-full">
        {lastObservation && <LastObservation observation={lastObservation} />}
        {!lastObservation && <Instructions />}
      </div>
      <div className="w-full">
        <ActionButtons
          processing={processingStatus.processing}
          recording={recording}
          toggleRecording={toggleRecording}
        />
      </div>
    </div>
  );
}
