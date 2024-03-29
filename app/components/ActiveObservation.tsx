import { Observation } from "../utils/shared";

export default function ActiveObservation({
  close,
  observation,
}: {
  close: () => void;
  observation: Observation;
}) {
  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <figure></figure>
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
