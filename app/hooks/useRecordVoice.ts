"use client";
import { useState, useRef } from "react";
import { createMediaStream } from "@/app/utils/createMediaStream";

function useRecordVoice() {
  const [audio, setAudio] = useState(undefined as Blob | undefined);
  const [recording, setRecording] = useState(false);
  const isRecording = useRef(false);

  const stream = useRef<MediaStream | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef([] as Blob[]);

  function close() {
    const tracks = stream.current?.getTracks() || [];
    console.log(`Stopping ${tracks.length} tracks`);
    for (const track of tracks) {
      track.stop();
    }
    stream.current = null;
    mediaRecorder.current = null;
  }

  async function initialize() {
    if (typeof window !== "undefined") {
      stream.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      initializeMediaRecorder(stream.current);
    }
  }

  const startRecording = async () => {
    console.log(`Starting recording`);
    await initialize();
    if (mediaRecorder.current) {
      isRecording.current = true;
      mediaRecorder.current?.start();
      setRecording(true);
    }
  };

  const stopRecording = () => {
    console.log(`Stop recording`);
    if (mediaRecorder.current) {
      isRecording.current = false;
      mediaRecorder.current?.stop();
      setRecording(false);
      close();
    }
  };

  const initializeMediaRecorder = (stream: MediaStream) => {
    console.log(`Initializing media recorder...`);
    mediaRecorder.current = new MediaRecorder(stream);

    mediaRecorder.current.onstart = () => {
      console.log(`Media recorder onstart`);
      createMediaStream(stream);
      chunks.current = [];
    };

    mediaRecorder.current.ondataavailable = (ev) => {
      chunks.current.push(ev.data);
    };

    mediaRecorder.current.onstop = async () => {
      console.log(`Media recorder onstop`);
      const type = mediaRecorder.current?.mimeType;
      console.log(`Creating audio blob of type ${type} from ${chunks.current.length} chunks`);
      const audioBlob = new Blob(chunks.current, { type });
      setAudio(audioBlob);
    };
  };

  return { recording, startRecording, stopRecording, audio };
}

export { useRecordVoice };
