export default function Transcription({
  transcription,
  isTranscribing,
  transcriptionError,
}: {
  transcription: String | undefined;
  isTranscribing: boolean;
  transcriptionError: Error | null;
}) {
  return (
    <div className="toast toast-end toast-bottom">
      {isTranscribing && (
        <div className="alert alert-info">
          <p className="font-bold">Käännetään tekstiksi...</p>
        </div>)
      }
      {transcriptionError && (
        <div className="alert alert-error">
          <h3 className="font-bold">Virhe: tekstiksi kääntäminen epäonnistui</h3>
        </div>
      )}
      {transcription === "" && (
        <div className="alert alert-error">
          <h3 className="font-bold">Virhe: tekstiksi kääntäminen tuotti tyhjän syötteen</h3>
        </div>)
      }
      {transcription && (
        <div className="alert alert-success">
          <div>
            <h3 className="font-bold">Tekstiksi kääntäminen onnistui</h3>
            <div className="text-xs">{transcription}</div>
          </div>
        </div>)
      }
    </div >
  );
}
