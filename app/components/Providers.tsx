"use client";
import { createContext } from "react";
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
  location?: WorldLocation;
  locationError?: GeolocationPositionError;
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
  location: undefined,
  locationError: undefined,
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
    location,
    locationError,
  } = useLocation();
  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      <LocationContext.Provider
        value={{
          enabled: locationEnabled,
          start,
          stop,
          location,
          locationError,
        }}
      >
        {children}
      </LocationContext.Provider>
    </ThemeContext.Provider>
  );
}
