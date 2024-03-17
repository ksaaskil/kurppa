import { DecipherResult, Observation } from "../utils/shared";
import { useState } from "react";

export function useObservations() {
  const [observations, setObservations] = useState([] as Observation[]);
  async function createObservation(result: DecipherResult) {
    const observation: Observation = {
      species: result.species,
      amount: result.amount,
      date: new Date(),
    };
    setObservations([...observations, observation]);
  }

  return { createObservation, observations };
}
