import { MapContainer, TileLayer } from "react-leaflet";
import { WorldLocation } from "../hooks/useLocation";

export default function MapWrapper({
  center,
  children,
}: {
  center?: [number, number];
  children: React.ReactNode;
}) {
  const centerLocation = center || [60.1960327054566, 25.059909619299244];

  return (
    <MapContainer
      center={centerLocation}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: 400, width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
}
