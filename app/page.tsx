"use client";
import { useRecordVoice } from "@/app/hooks/useRecordVoice";
import { useTranscribe } from "@/app/hooks/useTranscribe";
import { useDecipher } from "./hooks/useDecipher";
import RecordButton from "./components/RecordButton";
import StatusToast from "./components/StatusToast";

export default function Home() {
  const { recording, startRecording, stopRecording, audio } = useRecordVoice();

  const { transcription, isTranscribing, transcriptionError } = useTranscribe({
    audio,
  });

  const {
    result: decipherResult,
    error: decipherError,
    loading: deciphering,
    prompt,
  } = useDecipher({ userInput: transcription });

  function toggleRecording() {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
  }

  const processing = isTranscribing || deciphering;

  return (
    <main className="flex min-h-screen flex-col items-center justify-end p-24">
      <div>
        <RecordButton
          processing={processing}
          recording={recording}
          toggleRecording={toggleRecording}
        />
        <StatusToast
          transcription={transcription}
          transcriptionError={transcriptionError}
          isTranscribing={isTranscribing}
          decipherResult={decipherResult}
          decipherError={decipherError}
          isDeciphering={deciphering}
          prompt={prompt}
        />
      </div>
    </main>
  );
}
