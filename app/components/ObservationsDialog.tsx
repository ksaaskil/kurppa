import { Observation } from "../utils/shared";
import ObservationList from "./ObservationList";

export default function ObservationsDialog({
  observations,
}: {
  observations: Observation[];
}) {
  return (
    <dialog id="observations" className="modal">
      <div className="modal-box min-h-96 w-11/12 max-w-1xl">
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-lg btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
        <h3 className="font-bold text-lg">Havainnot</h3>
        <ObservationList observations={observations} />
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
