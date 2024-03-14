"use client";
import { useRecordVoice } from "@/app/hooks/useRecordVoice";
import { useTranscribe } from "@/app/hooks/useTranscribe";
import Transcription from "./components/transcription";
import { useDecipher } from "./hooks/useDecipher";
import Decipher from "./components/decipher";

export default function Home() {
  const { recording, startRecording, stopRecording, recordingBase64 } =
    useRecordVoice();

  const { transcription, isTranscribing, transcriptionError } = useTranscribe({
    audioBase64: recordingBase64,
  });

  const { result: decipherResult, error: decipherError, loading: deciphering, prompt } = useDecipher({ userInput: transcription });

  function toggleRecording() {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
  }

  const processing = isTranscribing || deciphering;
  const btnClassSuffix = recording ? "warning" : processing ? "neutral" : "primary";

  return (
    <main className="flex min-h-screen flex-col items-center justify-end p-24">
      <div>
        {
          <button className={`btn btn-lg btn-outline btn-${btnClassSuffix}`} onClick={toggleRecording}>
            {recording ? (
              <><span>Nauhoittaa</span><span className="loading loading-dots loading-sm"></span>
              </>
            ) : processing ?
              (
                <><span>Prosessoi</span><span className="loading loading-dots loading-sm"></span>
                </>
              ) :
              "Kirjaa havainto"
            }
          </button>

        }
        <Transcription
          transcription={transcription}
          transcriptionError={transcriptionError}
          isTranscribing={isTranscribing}
        />
        <Decipher
          result={decipherResult}
          error={decipherError}
          loading={deciphering}
          prompt={prompt}
        />
      </div>
    </main >
  );
}
