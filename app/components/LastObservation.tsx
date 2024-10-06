import { Observation } from "../utils/shared";
import ObservationsButton from "./ObservationsButton";

export default function LastObservation({
  observation,
}: {
  observation: Observation;
}) {
  console.log(`Rendering observation: ${JSON.stringify(observation)}`);

  function openObservations() {
    (document.getElementById("observations") as any)?.showModal();
  }

  return (
    <div className="card card-bordered card-compact w-full shadow-xl border-primary">
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
        <div className="flex flex-col justify-start">
          <button className="btn btn-circle btn-sm btn-info">
            {observation.amount}
          </button>
          <div className="mt-8">
            <ObservationsButton onClick={openObservations} />
          </div>
        </div>
      </div>
    </div>
  );
}
