import { Observation } from "../utils/shared";

export default function LastObservation({
  observation,
}: {
  observation: Observation;
}) {
  console.log(`Rendering observation: ${JSON.stringify(observation)}`);
  return (
    <div className="card card-bordered w-96 shadow-xl border-primary">
      <div className="card-body flex flex-row">
        <div className="grow">
          <h2 className="card-title">{observation.species.finnishName}</h2>
          <p className="text-s italic">{observation.species.scientificName}</p>
          <p className="text-s">
            {observation.date.toLocaleDateString("FI")}{" "}
            {observation.date.toLocaleTimeString("FI")}
          </p>
          <p></p>
        </div>
        <div>
          <button className="btn btn-circle btn-sm btn-info">
            {observation.amount}
          </button>
        </div>
      </div>
    </div>
  );
}
