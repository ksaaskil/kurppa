"use client";
import { useEffect, useState, useRef } from "react";
import { blobToBase64 } from "@/app/utils/blobToBase64";
import { createMediaStream } from "@/app/utils/createMediaStream";

function useRecordVoice() {
  const [state, setState] = useState("Waiting");
  const [recordingBase64, setRecordingBase64] = useState(null as string | null);
  const [mediaRecorder, setMediaRecorder] = useState(
    null as MediaRecorder | null,
  );
  const [recording, setRecording] = useState(false);
  const isRecording = useRef(false);
  const chunks = useRef([] as Blob[]);

  const startRecording = () => {
    console.log(`Starting recording`);
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
    }
    setState("Stopped recording");
  };

  const initializeMediaRecorder = (stream: any) => {
    console.log(`Initializing media recorder...`);
    const mediaRecorder = new MediaRecorder(stream);

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
      const type = mediaRecorder.mimeType;
      const audioBlob = new Blob(chunks.current, { type });
      // const audioUrl = URL.createObjectURL(audioBlob);
      const base64 = await blobToBase64(audioBlob);
      setRecordingBase64(base64);
    };

    setMediaRecorder(mediaRecorder);
  };

  useEffect(() => {
    async function initialize() {
      if (typeof window !== "undefined") {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        initializeMediaRecorder(stream);
        // window.dontGCThis = stream;
      }
    }
    initialize();
  }, []);

  return { recording, startRecording, stopRecording, recordingBase64, state };
}

export { useRecordVoice };
