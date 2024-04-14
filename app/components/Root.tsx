"use client";
import useTheme from "../hooks/useTheme";
import Providers from "./Providers";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export interface ThemeProps {
  theme?: string;
  setTheme: (theme: string) => void;
}

export default function Root({
  inter,
  children,
}: {
  inter: any;
  children: React.ReactNode;
}) {
  const { theme, setTheme, themes } = useTheme();

  return (
    <html lang="en" data-theme={theme}>
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <UserProvider>
        <body className={inter.className}>
          <Providers theme={theme} setTheme={setTheme} themes={themes}>
            {children}
          </Providers>
        </body>
      </UserProvider>
    </html>
  );
}
