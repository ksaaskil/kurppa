"use client";
import { useRecordVoice } from "@/app/hooks/useRecordVoice";
import { useTranscribe } from "@/app/hooks/useTranscribe";
import { useDecipher } from "./hooks/useDecipher";
import RecordButton from "./components/RecordButton";
import StatusToast from "./components/StatusToast";
import { useObservations } from "./hooks/useObservations";
import { useEffect } from "react";
import LastObservation from "./components/LastObservation";
import Instructions from "./components/Instructions";

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

  return (
    <main className="flex min-h-screen flex-col items-center justify-end p-24">
      <div className="grow">
        {lastObservation && <LastObservation observation={lastObservation} />}
        {!lastObservation && <Instructions />}
      </div>
      <div className="">
        <RecordButton
          processing={processing}
          recording={recording}
          toggleRecording={toggleRecording}
        />
      </div>
      <StatusToast
        transcription={transcription}
        transcriptionError={transcriptionError}
        isTranscribing={isTranscribing}
        decipherResult={decipherResult}
        decipherError={decipherError}
        isDeciphering={deciphering}
        prompt={prompt}
      />
    </main>
  );
}
