import { ProcessingStatus as IProcessingStatus } from "../hooks/useProcessing";
import Decipher from "./DecipherStatus";
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
  result,
  error,
  processing,
}: {
  result: any;
  error: any;
  processing: boolean;
}) {
  return processing ? (
    <ProcessingIcon />
  ) : error ? (
    <ErrorIcon />
  ) : result ? (
    <SuccessIcon />
  ) : null;
}

export default function ProcessingStatus({
  status,
  visible,
}: {
  status: IProcessingStatus;
  visible: boolean;
}) {
  return (
    (visible && (
      <div className="toast toast-end toast-middle flex flex-col">
        <ul className="timeline timeline-vertical">
          <li>
            <div className="timeline-middle">
              <ResolvedIcon
                processing={status.transcription.processing}
                error={status.transcription.error}
                result={status.transcription.result}
              />
            </div>
            <div className="timeline-end timeline-box">
              <RecordStepStatus
                result={status.record.result}
                error={status.record.error}
                processing={status.record.processing}
              />
            </div>
            {status.record.result && <hr className="bg-primary" />}
          </li>
          <li>
            <hr className="bg-primary" />
            <div className="timeline-middle">
              <ResolvedIcon
                processing={status.transcription.processing}
                error={status.transcription.error}
                result={status.transcription.result}
              />
            </div>
            <div className="timeline-end timeline-box">
              <Transcription
                transcription={status.transcription.result}
                transcriptionError={status.transcription.error}
                isTranscribing={status.transcription.processing}
              />
            </div>
            {status.transcription.result && <hr className="bg-primary" />}
          </li>
          {status.transcription.result && (
            <li>
              <hr className="bg-primary" />
              <div className="timeline-middle">
                <ResolvedIcon
                  processing={status.decipher.processing}
                  error={status.decipher.error}
                  result={status.decipher.result}
                />
              </div>
              <div className="timeline-end timeline-box">
                <Decipher
                  result={status.decipher.result}
                  error={status.decipher.error}
                  loading={status.decipher.processing}
                />
              </div>
              <hr />
            </li>
          )}
        </ul>
      </div>
    )) ||
    null
  );
}
