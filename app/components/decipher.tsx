import { Result } from "../hooks/useDecipher";

export default function Decipher({
  prompt,
  result,
  error,
  loading,
}: {
  prompt?: string;
  result?: Result;
  error?: Error;
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
          <h3 className="font-bold">Virhe: lajihavainnon luonti epäonnistui</h3>
        </div>
      )}
      {result && (
        <div className="alert alert-success">
          <div>
            <h3 className="font-bold">Lajihavainnon luonti onnistui</h3>
            <div className="text-xs">Laji: {result.species}</div>
            <div className="text-xs">Määrä: {result.amount}</div>
          </div>
        </div>
      )}
    </div>
  );
}
