import { ProcessingStatus } from "../hooks/useProcessing";

function ProcessingIcon() {
  return (
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
  );
}

function ErrorIcon() {
  return (
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
  );
}

function SuccessIcon() {
  return (
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
  );
}

function ResolvedIcon({
  success,
  error,
  processing,
}: {
  success: boolean;
  error: boolean;
  processing: boolean;
}) {
  return processing ? (
    <span className="loading loading-spinner loading-xs"></span>
  ) : error ? (
    <ErrorIcon />
  ) : success ? (
    <SuccessIcon />
  ) : null;
}

export default function ProcessingStatusButton({
  status,
}: {
  status: ProcessingStatus;
}) {
  const visible =
    status.processing ||
    !!status.transcription.error ||
    !!status.decipher.error ||
    !!status.transcription.error ||
    !!status.transcription.result;

  if (!visible) {
    return <></>;
  }

  const processing = status.processing;
  const hasSuccess = !!status.decipher.result;
  const hasError = !!status.transcription.error || !!status.decipher.error;

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-circle btn-ghost text-info stroke-primary"
      >
        <ResolvedIcon
          success={hasSuccess}
          processing={processing}
          error={hasError}
        />
      </div>
      <div
        tabIndex={0}
        className="dropdown-content z-[1] card card-compact p-2 bg-base-100 shadow-xl"
      >
        <></>
      </div>
    </div>
  );
}
