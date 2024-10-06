"use client";
import { useRecordVoice } from "@/app/hooks/useRecordVoice";
import { useObservations } from "./hooks/useObservations";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import useProcessing from "./hooks/useProcessing";
import SettingsDialog from "./components/SettingsDialog";
import ObservationsDialog from "./components/ObservationsDialog";
import InfoDialog from "./components/InfoDialog";
import RecordView from "./components/RecordView";

export default function Home() {
  const {
    recording,
    startRecording,
    stopRecording,
    audio,
    error: errorRecording,
  } = useRecordVoice();

  const { processAudio, status: processingStatus } = useProcessing({
    recording,
    errorRecording,
  });

  useEffect(() => {
    if (audio) {
      processAudio(audio);
    }
  }, [audio, processAudio]);

  const { observations, createObservation } = useObservations();

  useEffect(() => {
    const result = processingStatus.result;
    if (result && !result.processed) {
      result.processed = true;
      createObservation(result);
    }
  }, [processingStatus, createObservation]);

  function toggleRecording() {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
  }

  const lastObservation = observations[observations.length - 1];

  const [showMap, setShowMap] = useState(false);

  function toggleMap() {
    setShowMap(!showMap);
  }

  return (
    <main className="min-h-dvh">
      <NavBar toggleMap={toggleMap} />
      <div className="h-[calc(100dvh-64px)] relative">
        <RecordView
          toggleRecording={toggleRecording}
          lastObservation={lastObservation}
          recording={recording}
          processingStatus={processingStatus}
          showMap={showMap}
        />
      </div>
      <SettingsDialog />
      <ObservationsDialog observations={observations} />
      <InfoDialog />
    </main>
  );
}
