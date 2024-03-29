import { useContext } from "react";
import {
  MapContainer,
  CircleMarker,
  Popup,
  TileLayer,
  LayerGroup,
} from "react-leaflet";
import { LocationContext } from "./Providers";

export default function Map() {
  const { location } = useContext(LocationContext);

  const centerLocation = location || {
    latitude: 60.1960327054566,
    longitude: 25.059909619299244,
  };

  const radiusOptions = { fillColor: "blue", fillOpacity: 0.2 };
  const centerOptions = { fillColor: "blue", fillOpacity: 0.5 };

  return (
    <MapContainer
      center={[centerLocation.latitude, centerLocation.longitude]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: 400, width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {location && (
        <LayerGroup>
          <CircleMarker
            center={[location.latitude, location.longitude]}
            radius={location.accuracy}
            pathOptions={radiusOptions}
            stroke={false}
          ></CircleMarker>
          <CircleMarker
            center={[location.latitude, location.longitude]}
            radius={3}
            pathOptions={centerOptions}
            stroke={false}
          >
            <Popup>Nykyinen sijaintisi</Popup>
          </CircleMarker>
        </LayerGroup>
      )}
    </MapContainer>
  );
}
