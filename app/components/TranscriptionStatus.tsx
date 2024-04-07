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
        <div className="">
          <p className="font-bold">
            Puheesta tekstiksi
            <span className="ml-2 loading loading-dots loading-sm"></span>
          </p>
        </div>
      )}
      {!isTranscribing && transcriptionError && (
        <div className="">
          <div>
            <h3 className="font-bold">Puheesta tekstiksi epäonnistui</h3>
            <p className="text-xs">{transcriptionError.message}</p>
          </div>
        </div>
      )}
      {!isTranscribing && !transcriptionError && transcription === "" && (
        <div className="">
          <h3 className="font-bold">
            Puheesta tekstiksi tuotti tyhjän syötteen
          </h3>
        </div>
      )}
      {!isTranscribing && !transcriptionError && transcription && (
        <div className="">
          <div>
            <h3 className="font-bold">Puheesta tekstiksi onnistui</h3>
            <div className="text-xs">{transcription}</div>
          </div>
        </div>
      )}
    </div>
  );
}
