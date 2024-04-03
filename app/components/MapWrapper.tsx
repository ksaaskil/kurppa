import { MapContainer, TileLayer } from "react-leaflet";

export default function MapWrapper({
  center,
  height,
  children,
}: {
  center?: [number, number];
  height: number;
  children: React.ReactNode;
}) {
  const centerLocation = center || [60.1960327054566, 25.059909619299244];
  console.log(`Rendering map`);
  return (
    <MapContainer
      center={centerLocation}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height, width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
}
