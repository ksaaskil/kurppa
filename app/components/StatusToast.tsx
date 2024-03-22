import { ApiErrorResponse, DecipherResult } from "../utils/shared";
import Decipher from "./decipher";
import Transcription from "./transcription";

export default function StatusToast({
  transcription,
  transcriptionError,
  isTranscribing,
  decipherResult,
  decipherError,
  isDeciphering,
  prompt,
  visible
}: {
  transcription?: string;
  transcriptionError?: Error;
  isTranscribing: boolean;
  decipherResult?: DecipherResult;
  decipherError?: ApiErrorResponse;
  isDeciphering: boolean;
  prompt?: string;
  visible: boolean;
}) {
  return (
    visible &&
    < div className="toast toast-end toast-middle flex flex-col" >
      <div className="flex flex-col items-end justify-between alert bg-neutral">
        <Transcription
          transcription={transcription}
          transcriptionError={transcriptionError}
          isTranscribing={isTranscribing}
        />
        <Decipher
          result={decipherResult}
          error={decipherError}
          loading={isDeciphering}
          prompt={prompt}
        />
      </div>
    </div > || null
  );
}
