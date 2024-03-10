"use client";
import { useRecordVoice } from "@/app/hooks/useRecordVoice";
import { useTranscribe } from "@/app/hooks/useTranscribe";
import Transcription from "./components/transcription";

export default function Home() {
  const { recording, startRecording, stopRecording, recordingBase64 } =
    useRecordVoice();

  const { transcription, isTranscribing } = useTranscribe({
    audioBase64: recordingBase64,
  });

  function toggleRecording() {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <button className="btn" onClick={toggleRecording}>
          {recording ? `Nauhoittaa...` : `Kirjaa havainto`}
        </button>
        <Transcription
          transcription={transcription}
          isTranscribing={isTranscribing}
        />
      </div>
    </main>
  );
}
