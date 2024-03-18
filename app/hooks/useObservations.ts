import { DecipherResult, Observation } from "../utils/shared";
import { useCallback, useState } from "react";

export function useObservations() {
  const [observations, setObservations] = useState([] as Observation[]);
  const createObservation = useCallback(async function createObservation(
    result: DecipherResult,
  ) {
    const observation: Observation = {
      species: result.species,
      amount: result.amount,
      date: new Date(),
    };
    setObservations((o) => [...o, observation]);
  }, []);

  return { createObservation, observations };
}
