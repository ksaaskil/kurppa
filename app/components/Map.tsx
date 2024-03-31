import MapWrapper from "./MapWrapper";
import MapMarkers from "./MapMarkers";

export default function Map() {
  return (
    <MapWrapper center={undefined}>
      <MapMarkers />
    </MapWrapper>
  );
}
