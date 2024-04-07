export default function Transcription({
  transcription,
  isTranscribing,
  transcriptionError,
}: {
  transcription: string | undefined;
  isTranscribing: boolean;
  transcriptionError: Error | undefined;
}) {
  return (
    <div className="w-full text-xs">
      {isTranscribing && (
        <div className="p-4">
          <p className="font-bold">
            Käännetään tekstiksi
            <span className="loading loading-dots loading-sm"></span>
          </p>
        </div>
      )}
      {transcriptionError && !isTranscribing && (
        <div className="">
          <div>
            <h3 className="font-bold">
              Virhe: tekstiksi kääntäminen epäonnistui
            </h3>
            <p className="text-xs">{transcriptionError.message}</p>
          </div>
        </div>
      )}
      {transcription === "" && (
        <div className="">
          <h3 className="font-bold">
            Virhe: tekstiksi kääntäminen tuotti tyhjän syötteen
          </h3>
        </div>
      )}
      {transcription && !isTranscribing && (
        <div className="">
          <div>
            <h3 className="font-bold">Tekstiksi kääntäminen onnistui</h3>
            <div className="text-xs">{transcription}</div>
          </div>
        </div>
      )}
    </div>
  );
}
