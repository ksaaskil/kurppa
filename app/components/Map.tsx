import { memo } from "react";
import MapMarkers from "./MapMarkers";
import dynamic from "next/dynamic";

export default function Map() {
  // https://stackoverflow.com/questions/57704196/leaflet-with-next-js
  const MapWrapper = dynamic(() => import("./MapWrapper"), {
    loading: () => <p>Kartta latautuu...</p>,
    ssr: false,
  });
  const MapWrapperMemo = memo(MapWrapper);
  return (
    <MapWrapperMemo center={undefined}>
      <MapMarkers />
    </MapWrapperMemo>
  );
}
