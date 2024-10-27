import { useContext } from "react";
import { LocationContext, LocationProps } from "./Providers";
import LoginButton from "./LoginButton";
import Logo from "../resources/kurppa.png";
import Image from "next/image";

function MapBadge({
  children,
  locationProps,
}: {
  children: React.ReactNode;
  locationProps: LocationProps;
}) {
  if (!locationProps.enabled) {
    return (
      <div className="indicator">
        <span className="indicator-item badge badge-neutral badge-xs"></span>
        {children}
      </div>
    );
  }

  return <>{children}</>;
}

export default function NavBar({ toggleMap }: { toggleMap: () => void }) {
  const locationProps = useContext(LocationContext);

  function openInfo() {
    (document.getElementById("info") as any)?.showModal();
  }

  return (
    <div className="navbar bg-transparent">
      <div className="flex-1">
        <button className="btn btn-square btn-ghost" onClick={openInfo}>
          <Image src={Logo} width={50} height={50} alt="Kurppa logo" />
        </button>
      </div>
      <div className="flex-none">
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
      </div>
      <div className="ml-2 flex-none">
        <LoginButton />
      </div>
    </div>
  );
}
