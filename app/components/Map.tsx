import { memo, useEffect, useRef, useState } from "react";
import MapMarkers from "./MapMarkers";
import MapWrapper from "./MapWrapper";

export default function Map() {
  // https://stackoverflow.com/questions/57704196/leaflet-with-next-js
  const MapWrapperMemo = memo(MapWrapper);

  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHeight(ref.current?.clientHeight || 0);
  }, []);

  return (
    <div className="z-40 w-full h-full bg-primary" ref={ref}>
      <MapWrapperMemo center={undefined} height={height}>
        <MapMarkers />
      </MapWrapperMemo>
    </div>
  );
}
