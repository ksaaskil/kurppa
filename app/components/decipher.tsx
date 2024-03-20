import { ApiErrorResponse, DecipherResult } from "../utils/shared";

export default function Decipher({
  prompt,
  result,
  error,
  loading,
}: {
  prompt?: string;
  result?: DecipherResult;
  error?: ApiErrorResponse;
  loading: boolean;
}) {
  return (
    <div>
      {loading && (
        <div className="alert alert-info">
          <p className="font-bold">Prosessoidaan syötettä...</p>
        </div>
      )}
      {error && (
        <div className="alert alert-error">
          <div>
            <h3 className="font-bold">Virhe: lajihavainnon luonti epäonnistui</h3>
            <div className="text-xs">{error.title}</div>
            <div className="text-xs">{error.detail}</div>
          </div>
        </div>
      )}
      {result && (
        <div className="alert alert-success">
          <div>
            <h3 className="font-bold">Lajihavainnon luonti onnistui</h3>
            <div className="text-xs">Laji: {result.species.finnishName}</div>
            <div className="text-xs">Määrä: {result.amount}</div>
          </div>
        </div>
      )}
    </div>
  );
}
