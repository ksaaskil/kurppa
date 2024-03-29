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
            <th>Sijainti</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((observation, index) => (
            <tr key={index}>
              <th>{sorted.length - index}</th>
              <td>{observation.species.finnishName}</td>
              <td>{observation.amount}</td>
              <td>{observation.date.toLocaleDateString("FI")}</td>
              <td>
                {observation.location && (
                  <button className="btn btn-square stroke-primary btn-ghost">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke={`stroke-primary`}
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                      />
                    </svg>
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
