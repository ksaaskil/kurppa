"use client";
import dynamic from "next/dynamic";
import { useRecordVoice } from "@/app/hooks/useRecordVoice";
import ProcessingStatus from "./components/ProcessingStatus";
import { useObservations } from "./hooks/useObservations";
import { useEffect, useState } from "react";
import LastObservation from "./components/LastObservation";
import Instructions from "./components/Instructions";
import NavBar from "./components/NavBar";
import useProcessing from "./hooks/useProcessing";
import SettingsDialog from "./components/SettingsDialog";
import ObservationsDialog from "./components/ObservationsDialog";
import InfoDialog from "./components/InfoDialog";
import ActionButtons from "./components/ActionButtons";

const Map = dynamic(() => import("./components/Map"), {
  loading: () => <p>Kartta latautuu...</p>,
  ssr: false,
});

export default function Home() {
  const { recording, startRecording, stopRecording, audio } = useRecordVoice();

  const {
    processAudio,
    transcription,
    transcriptionError,
    decipherError,
    isTranscribing,
    decipherResult,
    deciphering,
    prompt,
  } = useProcessing();

  useEffect(() => {
    if (audio) {
      processAudio(audio);
    }
  }, [audio, processAudio]);

  const { observations, createObservation } = useObservations();

  useEffect(() => {
    if (decipherResult && !decipherResult.processed) {
      decipherResult.processed = true;
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

  const [showMap, setShowMap] = useState(false);

  function toggleMap() {
    setShowMap(!showMap);
  }

  return (
    <main className="min-h-screen">
      <NavBar toggleMap={toggleMap} />
      <div className="h-[calc(100vh-74px)] relative">
        <div className="h-full container mx-auto flex flex-col items-center justify-end">
          <div className="grow p-4">
            {lastObservation && (
              <LastObservation observation={lastObservation} />
            )}
            {!lastObservation && <Instructions />}
          </div>
          <ActionButtons
            processing={processing}
            recording={recording}
            toggleRecording={toggleRecording}
          />

          <ProcessingStatus
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
        {showMap && <Map />}
      </div>
      <SettingsDialog />
      <ObservationsDialog observations={observations} />
      <InfoDialog />
    </main>
  );
}
