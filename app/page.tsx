"use client";
import { useRecordVoice } from "@/app/hooks/useRecordVoice";
import RecordButton from "./components/RecordButton";
import StatusToast from "./components/StatusToast";
import { useObservations } from "./hooks/useObservations";
import { useEffect, useState } from "react";
import LastObservation from "./components/LastObservation";
import Instructions from "./components/Instructions";
import NavBar from "./components/NavBar";
import useProcessing from "./hooks/useProcessing";
import SettingsButton from "./components/SettingsButton";
import ObservationsButton from "./components/ObservationsButton";
export default function Home() {
  const { recording, startRecording, stopRecording, audio } = useRecordVoice();

  const {
    transcription,
    transcriptionError,
    decipherError,
    isTranscribing,
    decipherResult,
    deciphering,
    prompt,
  } = useProcessing({ audio });

  const { observations, createObservation } = useObservations();

  useEffect(() => {
    if (decipherResult) {
      createObservation(decipherResult);
    }
  }, [decipherResult, createObservation]);

  function toggleRecording() {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
  }

  const processing = isTranscribing || deciphering;

  const lastObservation = observations[observations.length - 1];

  const [settingsVisible, setSettingsVisible] = useState(false);
  const [observationsVisible, setObservationsVisible] = useState(false);

  function openSettings() {
    setSettingsVisible(true);
  }

  function openObservations() {
    setObservationsVisible(true);
  }

  return (
    <main className="min-h-screen">
      <NavBar />
      <div className="h-[calc(100vh-74px)] flex flex-col items-center justify-end">
        <div className="grow p-4">
          {lastObservation && <LastObservation observation={lastObservation} />}
          {!lastObservation && <Instructions />}
        </div>
        <div className="p-24 flex flex-row justify-center w-full">
          <div className="mx-24 mt-8">
            <ObservationsButton onClick={openObservations} />
          </div>

          <div className="mx-24">
            <RecordButton
              processing={processing}
              recording={recording}
              toggleRecording={toggleRecording}
            />
          </div>

          <div className="mx-24 mt-8">
            <SettingsButton onClick={openSettings} />
          </div>
        </div>
        <StatusToast
          transcription={transcription}
          transcriptionError={transcriptionError}
          isTranscribing={isTranscribing}
          decipherResult={decipherResult}
          decipherError={decipherError}
          isDeciphering={deciphering}
          isRecording={recording}
          visible={
            !recording &&
            (processing ||
              !!decipherError ||
              !!transcriptionError ||
              !!decipherResult)
          }
          prompt={prompt}
        />
      </div>
    </main>
  );
}
