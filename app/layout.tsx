import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { createContext, useContext } from "react";
import useTheme from "./hooks/useTheme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kurppa",
  description: "Lintuhavaintokirja",
};

export interface ThemeProps {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeProps | null>(null);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme, setTheme } = useTheme();
  return (
    <>
      {(theme && (
        <html lang="en" data-theme={theme}>
          <body className={inter.className}>{children}</body>
        </html>
      )) ||
        null}
    </>
  );
}
