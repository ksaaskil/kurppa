import RecordButton from "./RecordButton";

export default function ActionButtons({
  recording,
  processing,
  toggleRecording,
}: {
  recording: boolean;
  processing: boolean;
  toggleRecording: () => void;
}) {
  return (
    <div className="flex flex-col justify-between w-full lg:max-w-lg mb-4">
      <div className="">
        <RecordButton
          processing={processing}
          recording={recording}
          toggleRecording={toggleRecording}
        />
      </div>
    </div>
  );
}
