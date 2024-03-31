import { LocationContext } from "../components/Providers";
import { DecipherResult, Observation } from "../utils/shared";
import { useCallback, useContext, useState } from "react";

export function useObservations() {
  const { enabled, locationRef } = useContext(LocationContext);
  const [observations, setObservations] = useState([] as Observation[]);
  const createObservation = useCallback(
    async function createObservation(result: DecipherResult) {
      console.log(
        `Creating new observation for: ${result.species.finnishName}`,
      );

      const observationLocation =
        (enabled && locationRef?.current) || undefined;
      const observation: Observation = {
        species: result.species,
        amount: result.amount,
        date: new Date(),
        location: observationLocation,
      };
      setObservations((o) => [...o, observation]);
    },
    [enabled, locationRef],
  );

  return { createObservation, observations };
}
