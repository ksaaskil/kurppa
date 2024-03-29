import { useState } from "react";

export function useLocation() {
  const [enabled, setEnabled] = useState(false);

  async function start() {
    setEnabled(true);
  }

  async function stop() {
    setEnabled(false);
  }

  return { enabled, start, stop };
}
