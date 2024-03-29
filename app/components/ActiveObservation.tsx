import dynamic from "next/dynamic";
import { Observation } from "../utils/shared";

export default function ActiveObservation({
  close,
  observation,
}: {
  close: () => void;
  observation: Observation;
}) {
  const ObservationMapDynamic = dynamic(() => import("./ObservationMap"), {
    loading: () => <p>Kartta latautuu...</p>,
    ssr: false,
  });
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="min-h-96 w-11/12 max-w-1xl">
        <ObservationMapDynamic observation={observation} />
      </div>
      <div className="card-body bg-transparent">
        <h2 className="card-title">{observation.species.finnishName}</h2>
        <p>
          <span className="font-bold">Lukumäärä: </span>
          <span>{observation.amount}</span>
        </p>
        <p>
          <span className="font-bold">Päivämäärä: </span>
          <span>{observation.date.toLocaleDateString("FI")}</span>
        </p>
        <p>
          <span className="font-bold">Kellonaika: </span>
          <span>{observation.date.toLocaleTimeString("FI")}</span>
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={close}>
            Sulje
          </button>
        </div>
      </div>
    </div>
  );
}
