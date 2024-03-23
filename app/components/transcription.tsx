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
        <div className="alert alert-info p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <p className="font-bold">
            Käännetään tekstiksi
            <span className="loading loading-dots loading-sm"></span>
          </p>
        </div>
      )}
      {transcriptionError && !isTranscribing && (
        <div className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h3 className="font-bold">
              Virhe: tekstiksi kääntäminen epäonnistui
            </h3>
            <p className="text-xs">{transcriptionError.message}</p>
          </div>
        </div>
      )}
      {transcription === "" && (
        <div className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="font-bold">
            Virhe: tekstiksi kääntäminen tuotti tyhjän syötteen
          </h3>
        </div>
      )}
      {transcription && !isTranscribing && (
        <div className="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h3 className="font-bold">Tekstiksi kääntäminen onnistui</h3>
            <div className="text-xs">{transcription}</div>
          </div>
        </div>
      )}
    </div>
  );
}
