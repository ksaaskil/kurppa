"use client";
import dynamic from "next/dynamic";
import { memo } from "react";

export default function MapDialog() {
  // https://stackoverflow.com/questions/57704196/leaflet-with-next-js
  const MapDynamic = dynamic(() => import("./Map"), {
    loading: () => <p>Kartta latautuu...</p>,
    ssr: false,
  });

  return (
    <dialog id="map" className="modal">
      <div className="modal-box min-h-96 w-11/12 max-w-1xl">
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-lg btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
        <div className="w-full h-full mt-2">
          <MapDynamic />
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>Sulje</button>
      </form>
    </dialog>
  );
}
