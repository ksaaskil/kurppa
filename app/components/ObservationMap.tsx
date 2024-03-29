import {
  MapContainer,
  CircleMarker,
  Popup,
  TileLayer,
  LayerGroup,
} from "react-leaflet";
import { Observation } from "../utils/shared";

export default function ObservationMap({
  observation,
}: {
  observation: Observation;
}) {
  const location = observation.location;
  if (!location) {
    return null;
  }

  const radiusOptions = { fillColor: "blue", fillOpacity: 0.2 };
  const centerOptions = { fillColor: "blue", fillOpacity: 0.5 };

  const shownAccuracy = Math.max(Math.min(location?.accuracy || 100, 100), 10);

  return (
    <MapContainer
      center={[location.latitude, location.longitude]}
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
            radius={shownAccuracy}
            pathOptions={radiusOptions}
            stroke={false}
          ></CircleMarker>
          <CircleMarker
            center={[location.latitude, location.longitude]}
            radius={10}
            pathOptions={centerOptions}
            stroke={false}
          >
            <Popup>
              <div className="text-bold">
                Havainnon sijainti
                <br />
                Leveysaste: {location.latitude.toFixed(5)}
                <br />
                Pituusaste: {location.longitude.toFixed(5)}
                <br />
                Tarkkuus: {location.accuracy} metriä
              </div>
            </Popup>
          </CircleMarker>
        </LayerGroup>
      )}
    </MapContainer>
  );
}
