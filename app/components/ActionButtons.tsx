import ObservationsButton from "./ObservationsButton";
import RecordButton from "./RecordButton";
import SettingsButton from "./SettingsButton";

export default function ActionButtons({
  recording,
  processing,
  toggleRecording,
}: {
  recording: boolean;
  processing: boolean;
  toggleRecording: () => void;
}) {
  function openSettings() {
    (document.getElementById("settings") as any)?.showModal();
  }

  function openObservations() {
    (document.getElementById("observations") as any)?.showModal();
  }

  return (
    <div className="flex flex-row justify-between w-full p-4 lg:max-w-lg mb-4">
      <div className="mt-8">
        <ObservationsButton onClick={openObservations} />
      </div>

      <div className="">
        <RecordButton
          processing={processing}
          recording={recording}
          toggleRecording={toggleRecording}
        />
      </div>

      <div className="mt-8">
        <SettingsButton onClick={openSettings} />
      </div>
    </div>
  );
}
