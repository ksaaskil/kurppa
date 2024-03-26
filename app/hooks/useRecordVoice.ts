"use client";
import { useEffect, useState, useRef } from "react";
import { blobToBase64 } from "@/app/utils/blobToBase64";
import { createMediaStream } from "@/app/utils/createMediaStream";

let mediaRecorder: MediaRecorder | null = null;
let stream: MediaStream | null = null;

function useRecordVoice() {
  const [state, setState] = useState("Waiting");
  const [audio, setAudio] = useState(undefined as Blob | undefined);
  const [recording, setRecording] = useState(false);
  const isRecording = useRef(false);
  const chunks = useRef([] as Blob[]);

  function close() {
    const tracks = stream?.getTracks() || [];
    console.log(`Stopping ${tracks.length} tracks`);
    for (const track of tracks) {
      track.stop();
    }
    stream = null;
    mediaRecorder = null;
  }

  async function initialize() {
    if (typeof window !== "undefined") {
      const stream_ = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      initializeMediaRecorder(stream_);
      stream = stream_
    }
  }

  const startRecording = async () => {
    console.log(`Starting recording`);
    await initialize();
    if (mediaRecorder) {
      isRecording.current = true;
      mediaRecorder.start();
      setRecording(true);
    }
    setState("Recording...");
  };

  const stopRecording = () => {
    console.log(`Stop recording`);
    if (mediaRecorder) {
      isRecording.current = false;
      mediaRecorder.stop();
      setRecording(false);
      close();
    }
    setState("Stopped recording");
  };

  const initializeMediaRecorder = (stream: any) => {
    console.log(`Initializing media recorder...`);
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.onstart = () => {
      console.log(`Media recorder onstart`);
      createMediaStream(stream);
      chunks.current = [];
    };

    mediaRecorder.ondataavailable = (ev) => {
      chunks.current.push(ev.data);
    };

    mediaRecorder.onstop = async () => {
      console.log(`Media recorder onstop`);
      console.log(`Converting ${chunks.current.length} chunks`);
      const type = mediaRecorder?.mimeType;
      const audioBlob = new Blob(chunks.current, { type });
      setAudio(audioBlob);
    };

  };

  return { recording, startRecording, stopRecording, audio, state };
}

export { useRecordVoice };
