import { useEffect, useState } from "react";

export const THEMES = ["forest", "cupcake"];

export default function useTheme() {
  const [theme, setTheme] = useState("forest");

  useEffect(() => {
    document.querySelector("html")?.setAttribute("data-theme", theme);
  }, [theme]);

  return { theme, themes: THEMES, setTheme };
}
