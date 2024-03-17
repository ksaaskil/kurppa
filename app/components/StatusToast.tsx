import { Result } from "../hooks/useDecipher";
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
}: {
  transcription?: string;
  transcriptionError?: Error;
  isTranscribing: boolean;
  decipherResult?: Result;
  decipherError?: Error;
  isDeciphering: boolean;
  prompt?: string;
}) {
  return (
    <div className="toast toast-end toast-middle flex flex-col">
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
  );
}
