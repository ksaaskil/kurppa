import { ApiErrorResponse, DecipherResult } from "../utils/shared";

export default function Decipher({
  result,
  error,
  loading,
}: {
  result?: DecipherResult;
  error?: ApiErrorResponse;
  loading: boolean;
}) {
  return (
    <div className="w-full text-xs">
      {loading && (
        <div className="">
          <p className="font-bold">
            Tekstin ymmärtäminen
            <span className="ml-2 loading loading-dots loading-sm"></span>
          </p>
        </div>
      )}
      {!loading && error && (
        <div className="">
          <div>
            <h3 className="font-bold">Tekstin ymmärtäminen epäonnistui</h3>
            <div className="text-xs">{error.title}</div>
            <div className="text-xs">{error.detail}</div>
          </div>
        </div>
      )}
      {!loading && !error && result && (
        <div className="">
          <div>
            <h3 className="font-bold">Tekstin ymmärtäminen</h3>
            <div className="text-xs">Laji: {result.species.finnishName}</div>
            <div className="text-xs">Määrä: {result.amount}</div>
          </div>
        </div>
      )}
    </div>
  );
}
