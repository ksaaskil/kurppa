import { useCallback, useEffect, useRef, useState } from "react";

export interface WorldLocation {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: Date;
}

const geoLocationOptions: PositionOptions = {
  enableHighAccuracy: false,
  maximumAge: 600000,
  timeout: 300000,
};

export function useLocation() {
  const [enabled, setEnabled] = useState(false);
  const locationRef = useRef<WorldLocation | undefined>(undefined);
  const locationErrorRef = useRef<GeolocationPositionError | undefined>(
    undefined,
  );
  const watchID = useRef<number | undefined>(undefined);

  function onLocationUpdate({
    latitude,
    longitude,
    accuracy,
    timestamp,
  }: {
    latitude: number;
    longitude: number;
    accuracy: number;
    timestamp: number;
  }) {
    console.log(`Received new location`, latitude, longitude);
    locationRef.current = {
      latitude,
      longitude,
      accuracy,
      timestamp: new Date(timestamp),
    };
  }

  function subscribeFn(fn: (l: WorldLocation) => void): number | undefined {
    if (!enabled) {
      return undefined;
    }
    console.log(`Subscribing to location updates`);
    return navigator.geolocation.watchPosition((position) => {
      fn({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: new Date(position.timestamp),
      });
    });
  }

  const subscribe = useCallback(subscribeFn, [enabled]);

  function cancelFn(id: number): void {
    navigator.geolocation.clearWatch(id);
  }

  const cancel = useCallback(cancelFn, []);

  async function startz() {
    console.log(`Starting using location`);
    locationErrorRef.current = undefined;

    clearWatch();

    watchID.current = navigator.geolocation.watchPosition(
      (position) => {
        onLocationUpdate({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
        });
        locationErrorRef.current = undefined;
      },
      (error) => {
        console.log(`Location error`, error);
        locationRef.current = undefined;
        locationErrorRef.current = error;
      },
      geoLocationOptions,
    );

    setEnabled(true);
    window.localStorage.setItem("use-location", "true");
  }

  const start = useCallback(startz, []);

  async function stopFn() {
    console.log(`Stopping using location`);
    clearWatch();
    locationErrorRef.current = undefined;
    locationRef.current = undefined;
    setEnabled(false);
    window.localStorage.setItem("use-location", "false");
  }

  const stop = useCallback(stopFn, []);

  function clearWatch() {
    if (watchID.current) {
      navigator.geolocation.clearWatch(watchID.current);
      watchID.current = undefined;
    }
  }

  useEffect(() => {
    const enabled = window.localStorage.getItem("use-location") === "true";
    if (enabled && !watchID.current) {
      start();
    }
  }, [start]);

  return {
    enabled,
    start,
    stop,
    locationRef,
    locationErrorRef,
    subscribe,
    cancel,
  };
}
