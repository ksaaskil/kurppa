import { useEffect, useState } from "react";

export function useLocation() {
  const [enabled, setEnabled] = useState(false);

  async function start() {
    console.log(`Starting using location`);
    setEnabled(true);
    window.localStorage.setItem("use-location", "true");
  }

  async function stop() {
    console.log(`Stopping using location`);
    setEnabled(false);
    window.localStorage.setItem("use-location", "false");
  }

  useEffect(() => {
    const enabled = window.localStorage.getItem("use-location") === "true";
    if (enabled) {
      start();
    }
  }, []);

  return { enabled, start, stop };
}
