import { Observation } from "../utils/shared";

export default function ObservationList({
  observations,
}: {
  observations: Observation[];
}) {
  const sorted = observations.toSorted(
    (a, b) => b.date.valueOf() - a.date.valueOf(),
  );
  return (
    <div className="overflow-x-auto prose mt-2">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Laji</th>
            <th>Määrä</th>
            <th>Päivämäärä</th>
            <th>Tarkkuus</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((observation, index) => (
            <tr key={index}>
              <th>{sorted.length - index}</th>
              <td>{observation.species.finnishName}</td>
              <td>{observation.amount}</td>
              <td>{observation.date.toLocaleDateString("FI")}</td>
              {observation.location && (
                <td>{observation.location.accuracy} m</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
