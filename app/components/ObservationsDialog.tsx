import { Observation } from "../utils/shared";
import ObservationList from "./ObservationList";

export default function ObservationsDialog({
  observations,
}: {
  observations: Observation[];
}) {
  return (
    <dialog id="observations" className="modal">
      <div className="modal-box h-[calc(100vh-74px)] w-11/12 max-w-1xl">
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-lg btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
        <div className="prose">
          <h2 className="font-bold text-lg">Havainnot</h2>
        </div>
        <ObservationList observations={observations} />
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
