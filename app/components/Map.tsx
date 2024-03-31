import { memo } from "react";
import MapMarkers from "./MapMarkers";
import MapWrapper from "./MapWrapper";

export default function Map() {
  // https://stackoverflow.com/questions/57704196/leaflet-with-next-js
  const MapWrapperMemo = memo(MapWrapper);
  return (
    <MapWrapperMemo center={undefined}>
      <MapMarkers />
    </MapWrapperMemo>
  );
}
