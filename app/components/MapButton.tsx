import { useContext, useEffect, useState } from "react";
import { LocationContext, LocationProps } from "./Providers";

const MAX_RECENT_INTERVAL_SECONDS = 5 * 60;
const MAX_ACCURACY_METERS = 50;
const CHECK_LOCATION_INTERVAL_SECONDS = 10;

function toEpochSeconds(date: Date): number {
  return Math.floor(date.getTime() / 1000);
}

function MapBadge({
  children,
  locationProps,
}: {
  children: React.ReactNode;
  locationProps: LocationProps;
}) {
  const [hasAccurateLocation, setHasAccurateLocation] = useState(false);
  const [locationError, setLocationError] = useState<
    GeolocationPositionError | undefined
  >(undefined);

  useEffect(() => {
    console.log(`Starting checking location quality at interval`);
    const interval = setInterval(() => {
      console.log(`Checking location quality...`);
      if (!locationProps.enabled) {
        setHasAccurateLocation(false);
        setLocationError(undefined);
        return;
      }

      const locationError = locationProps.locationErrorRef?.current;
      setLocationError(locationError);

      const location = locationProps.locationRef?.current;
      if (!location) {
        setHasAccurateLocation(false);
        return;
      }

      const elapsed = Date.now() / 1000 - toEpochSeconds(location.timestamp);
      const isRecent = elapsed < MAX_RECENT_INTERVAL_SECONDS;
      const isAccurate = location.accuracy < MAX_ACCURACY_METERS;

      setHasAccurateLocation(isRecent && isAccurate);
    }, CHECK_LOCATION_INTERVAL_SECONDS * 1000);
    return () => clearInterval(interval);
  }, [locationProps]);

  if (!locationProps.enabled) {
    return (
      <div className="indicator">
        <span className="indicator-item badge badge-neutral badge-xs"></span>
        {children}
      </div>
    );
  } else if (!!locationError) {
    return (
      <div className="indicator">
        <span className="indicator-item badge badge-error badge-xs"></span>
        {children}
      </div>
    );
  } else if (hasAccurateLocation) {
    return (
      <div className="indicator">
        <span className="indicator-item badge badge-success badge-xs"></span>
        {children}
      </div>
    );
  }

  return <>{children}</>;
}

export default function MapButton({ toggleMap }: { toggleMap: () => void }) {
  const locationProps = useContext(LocationContext);
  return (
    <button
      className="btn btn-square stroke-primary btn-ghost"
      onClick={toggleMap}
    >
      <MapBadge locationProps={locationProps}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke={locationProps.enabled ? `stroke-primary` : `currentColor`}
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
          />
        </svg>
      </MapBadge>
    </button>
  );
}
