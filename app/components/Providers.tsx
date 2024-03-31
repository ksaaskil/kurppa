"use client";
import { MutableRefObject, createContext } from "react";
import { WorldLocation, useLocation } from "../hooks/useLocation";

export interface ThemeProps {
  theme?: string;
  setTheme: (theme: string) => void;
  themes: string[];
}

export interface LocationProps {
  enabled: boolean;
  start: () => void;
  stop: () => void;
  locationRef?: MutableRefObject<WorldLocation | undefined>;
  locationErrorRef?: MutableRefObject<GeolocationPositionError | undefined>;
  subscribe: (fn: (loc: WorldLocation) => void) => number;
  cancel: (s: number) => void;
}

export const ThemeContext = createContext<ThemeProps>({
  theme: "light",
  setTheme: () => {},
  themes: [],
});

export const LocationContext = createContext<LocationProps>({
  enabled: false,
  start: () => {},
  stop: () => {},
  locationRef: undefined,
  locationErrorRef: undefined,
  subscribe: () => 0,
  cancel: () => {},
});

export default function Providers({
  theme,
  setTheme,
  themes,
  children,
}: {
  theme?: string;
  setTheme: (theme: string) => void;
  themes: string[];
  children: React.ReactNode;
}) {
  const {
    enabled: locationEnabled,
    start,
    stop,
    locationRef,
    locationErrorRef,
    subscribe,
    cancel,
  } = useLocation();
  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      <LocationContext.Provider
        value={{
          enabled: locationEnabled,
          start,
          stop,
          locationRef,
          locationErrorRef,
          subscribe,
          cancel,
        }}
      >
        {children}
      </LocationContext.Provider>
    </ThemeContext.Provider>
  );
}
