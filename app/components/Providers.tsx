"use client";
import { createContext } from "react";
import { useLocation } from "../hooks/useLocation";

export interface ThemeProps {
  theme?: string;
  setTheme: (theme: string) => void;
  themes: string[];
}

export interface LocationProps {
  enabled: boolean;
  start: () => void;
  stop: () => void;
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
  const { enabled: locationEnabled, start, stop } = useLocation();
  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      <LocationContext.Provider
        value={{ enabled: locationEnabled, start, stop }}
      >
        {children}
      </LocationContext.Provider>
    </ThemeContext.Provider>
  );
}
