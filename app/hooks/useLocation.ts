import { useCallback, useEffect, useRef, useState } from "react";

export interface WorldLocation {
  latitude: number;
  longitude: number;
  accuracy: number;
}

const geoLocationOptions: PositionOptions = {
  enableHighAccuracy: true,
  maximumAge: 30000,
  timeout: 27000,
};

export function useLocation() {
  const [enabled, setEnabled] = useState(false);
  const [location, setLocation] = useState<WorldLocation | undefined>(
    undefined,
  );
  const [locationError, setLocationError] = useState<
    GeolocationPositionError | undefined
  >(undefined);
  const watchID = useRef<number | undefined>(undefined);

  function onLocationUpdate({
    latitude,
    longitude,
    accuracy,
  }: {
    latitude: number;
    longitude: number;
    accuracy: number;
  }) {
    console.log(`Received new location`, latitude, longitude);
    setLocation({ latitude, longitude, accuracy });
  }

  async function startz() {
    console.log(`Starting using location`);
    setLocationError(undefined);

    if (watchID.current) {
      setLocation(undefined);
      navigator.geolocation.clearWatch(watchID.current);
    }

    watchID.current = navigator.geolocation.watchPosition(
      (position) => {
        const accuracy = position.coords.accuracy;
        onLocationUpdate({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy,
        });
      },
      (error) => {
        console.log(`Location error`, error);
        setLocationError(error);
      },
      geoLocationOptions,
    );

    setEnabled(true);
    window.localStorage.setItem("use-location", "true");
  }

  const start = useCallback(startz, []);

  async function stop() {
    console.log(`Stopping using location`);
    if (watchID.current) {
      navigator.geolocation.clearWatch(watchID.current);
      watchID.current = undefined;
    }
    setLocationError(undefined);
    setLocation(undefined);
    setEnabled(false);
    window.localStorage.setItem("use-location", "false");
  }

  useEffect(() => {
    const enabled = window.localStorage.getItem("use-location") === "true";
    if (enabled) {
      start();
    }
  }, [start]);

  return { enabled, start, stop, location, locationError };
}
