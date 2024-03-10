export default function Transcription({
  transcription,
  isTranscribing,
}: {
  transcription: String;
  isTranscribing: boolean;
}) {
  return (
    <div>
      <p>{isTranscribing ? `Kääntää tekstiksi...` : ``}</p>
      <p>{isTranscribing && transcription ? `` : transcription}</p>
    </div>
  );
}
