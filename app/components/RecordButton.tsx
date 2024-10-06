export default function RecordButton({
  processing,
  toggleRecording,
  recording,
}: {
  processing: boolean;
  toggleRecording: () => void;
  recording: boolean;
}) {
  const canRecord = !(processing || recording);
  return (
    <button
      className={`btn btn-block btn-lg ${canRecord ? `bg-success` : ``}`}
      disabled={processing}
      onClick={toggleRecording}
    >
      {recording ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="red"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z"
            clipRule="evenodd"
          />
        </svg>
      ) : processing ? (
        <>
          <span className="loading loading-dots loading-sm"></span>
        </>
      ) : (
        <div className="prose full-w text-white">Nauhoita</div>
      )}
    </button>
  );
}
