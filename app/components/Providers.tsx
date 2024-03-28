"use client";
import { createContext } from "react";
import useTheme from "../hooks/useTheme";

export interface ThemeProps {
  theme?: string;
  setTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeProps | null>(null);

export default function Providers({
  inter,
  children,
}: {
  inter: any;
  children: React.ReactNode;
}) {
  const { theme, setTheme } = useTheme();

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <html lang="en" data-theme={theme}>
        <body className={inter.className}>{children}</body>
      </html>
    </ThemeContext.Provider>
  );
}
