import { useContext, useEffect, useRef, useState } from "react";
import { CircleMarker, Popup, LayerGroup, useMap } from "react-leaflet";
import { LocationContext } from "./Providers";
import { WorldLocation } from "../hooks/useLocation";

export default function MapMarkers() {
  const map = useMap();
  const { locationRef, subscribe, cancel, enabled } =
    useContext(LocationContext);

  const [location, setLocation] = useState<WorldLocation | undefined>(
    undefined,
  );

  const radiusOptions = { fillColor: "blue", fillOpacity: 0.2 };
  const centerOptions = { fillColor: "blue", fillOpacity: 0.5 };

  const shownAccuracy = Math.max(Math.min(location?.accuracy || 100, 100), 10);

  useEffect(() => {
    const location = locationRef?.current;
    const centerLocation = location || {
      latitude: 60.1960327054566,
      longitude: 25.059909619299244,
    };
    map.setView([centerLocation.latitude, centerLocation.longitude]);
  }, [map, locationRef]);

  const id = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!enabled) {
      return;
    }
    function updateLocation(location: WorldLocation) {
      setLocation(location);
      console.log(`Received new marker location`, location);
    }
    if (id.current) {
      cancel(id.current);
    }
    const subscribeID = subscribe(updateLocation);
    if (subscribeID == undefined) {
      console.log(`Could not subscribe to position updates`);
      return;
    }
    id.current = subscribeID;
    return () => {
      if (id.current) {
        cancel(id.current);
      }
    };
  }, [subscribe, cancel, enabled]);

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
