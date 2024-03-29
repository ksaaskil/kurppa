import { useContext } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { LocationContext } from "./Providers";

export default function Map() {
  const { location } = useContext(LocationContext);

  const centerLocation = location || {
    latitude: 60.1960327054566,
    longitude: 25.059909619299244,
  };

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
        <Marker position={[location.latitude, location.longitude]}>
          <Popup>Nykyinen sijaintisi</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
