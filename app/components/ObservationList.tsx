import { Observation } from "../utils/shared";

export default function ObservationList({
  observations,
}: {
  observations: Observation[];
}) {
  return (
    <div className="prose">
      {observations.map((observation, index) => (
        <div key={index}>{observation.species.finnishName}</div>
      ))}
    </div>
  );
}
