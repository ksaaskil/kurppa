export default function Transcription({
  transcription,
  isTranscribing,
  transcriptionError,
}: {
  transcription: String;
  isTranscribing: boolean;
  transcriptionError: Error | null;
}) {
  return (
    <div>
      {isTranscribing && <p>`Kääntää tekstiksi...`</p>}
      {transcription && !isTranscribing && <p>{isTranscribing && transcription ? `` : transcription}</p>}
      {transcriptionError && <p>Transcription error: {transcriptionError.message}</p>}
    </div>
  );
}
