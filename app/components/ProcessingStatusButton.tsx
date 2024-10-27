import { ProcessingStatus } from "../hooks/useProcessing";
import DecipherStatus from "./DecipherStatus";
import RecordStepStatus from "./RecordStepStatus";
import Transcription from "./TranscriptionStatus";

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
      className="stroke-error shrink-0 h-6 w-6"
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
      className="stroke-success shrink-0 h-6 w-6"
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
        className={`btn btn-circle btn-ghost text-info stroke-primary ${hasError ? `btn-error` : ``}`}
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
        <ul className="steps steps-vertical w-56">
          <li
            data-content={`${status.record.result ? `✓` : status.record.error ? `x` : `x`}`}
            className={`step ${status.record.result ? `step-success` : status.record.error ? `step-error` : `step-neutral`}`}
          >
            <RecordStepStatus
              result={status.record.result}
              error={status.record.error}
              processing={status.record.processing}
            />
          </li>
          <li
            data-content={`${status.transcription.result ? `✓` : status.transcription.error ? `x` : `x`}`}
            className={`step ${status.transcription.result ? `step-success` : status.transcription.error ? `step-error` : `step-neutral`}`}
          >
            <Transcription
              transcription={status.transcription.result}
              transcriptionError={status.transcription.error}
              isTranscribing={status.transcription.processing}
            />
          </li>
          <li
            data-content={`${status.decipher.result ? `✓` : status.decipher.error ? `x` : `x`}`}
            className={`step ${status.decipher.result ? `step-success` : status.decipher.error ? `step-error` : `step-neutral`}`}
          >
            <DecipherStatus
              result={status.decipher.result}
              error={status.decipher.error}
              loading={status.decipher.processing}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}
