import { useContext, useEffect } from "react";
import { CircleMarker, Popup, LayerGroup, useMap } from "react-leaflet";
import { LocationContext } from "./Providers";

export default function MapMarkers() {
  const map = useMap();
  const { locationRef } = useContext(LocationContext);

  const radiusOptions = { fillColor: "blue", fillOpacity: 0.2 };
  const centerOptions = { fillColor: "blue", fillOpacity: 0.5 };

  const location = locationRef?.current;
  const shownAccuracy = Math.max(Math.min(location?.accuracy || 100, 100), 10);

  useEffect(() => {
    const location = locationRef?.current;
    const centerLocation = location || {
      latitude: 60.1960327054566,
      longitude: 25.059909619299244,
    };
    map.setView([centerLocation.latitude, centerLocation.longitude]);
  }, [map, locationRef]);

  return (
    <LayerGroup>
      {location && (
        <CircleMarker
          center={[location.latitude, location.longitude]}
          radius={shownAccuracy}
          pathOptions={radiusOptions}
          stroke={false}
        ></CircleMarker>
      )}
      {location && (
        <CircleMarker
          center={[location.latitude, location.longitude]}
          radius={10}
          pathOptions={centerOptions}
          stroke={false}
        >
          <Popup>
            <div className="text-bold">
              Sijaintisi
              <br />
              Leveysaste: {location.latitude.toFixed(5)}
              <br />
              Pituusaste: {location.longitude.toFixed(5)}
              <br />
              Tarkkuus: {location.accuracy} metriä
            </div>
          </Popup>
        </CircleMarker>
      )}
    </LayerGroup>
  );
}
