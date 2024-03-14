import { MOCK_TRANSCRIPTION_RESPONSE } from "@/app/utils/config";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { mock } from "node:test";
import OpenAI from "openai";

const MOCK_TRANSCRIPTIONS = [
  "Kolme varista",
  "Kaksitoista kiurua",
  "Viisisataa kottaraista",
]

const openai = new OpenAI();

interface ResponseData {
  text?: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const body = req.body;
  const base64Audio = body.audio;
  const audio = Buffer.from(base64Audio, "base64");
  console.log(`Transcribing audio of ${audio.byteLength} bytes`);
  const filePath = "tmp/input.webm";

  if (MOCK_TRANSCRIPTION_RESPONSE) {
    const randomIndex = Math.floor(Math.random() * MOCK_TRANSCRIPTIONS.length);
    const mockTranscription = MOCK_TRANSCRIPTIONS[randomIndex];
    res.status(200).json({ text: mockTranscription });
    return;
  }

  try {
    console.log(`Writing file: ${filePath}`);
    fs.writeFileSync(filePath, audio);
    const readStream = fs.createReadStream(filePath);

    console.log(`Sending audio to OpenAI...`);
    const data = await openai.audio.transcriptions.create({
      file: readStream,
      model: "whisper-1",
      language: "fi",
    });
    console.log(`Got OpenAI speech-to-text transcription: ${data.text}`);
    res.status(200).json({ text: data.text });
  } catch (error) {
    console.error("Error transcribing audio", error);
    return res.status(500).json({ error: "Error transcribing" });
  }
}
