"use client";
import Image from 'next/image';
import microphone from "../public/microphone.svg";
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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className="w-6 h-6">
                <path fillRule="evenodd" d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z" clipRule="evenodd" />
              </svg>


            ) : processing ?
              (
                <><span className="loading loading-dots loading-sm"></span>
                </>
              ) :
              (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="primary w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
                </svg>

              )
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
