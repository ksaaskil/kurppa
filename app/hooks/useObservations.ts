import { useUser } from "@auth0/nextjs-auth0/client";
import { LocationContext } from "../components/Providers";
import { DecipherResult, Observation } from "../utils/shared";
import { useCallback, useContext, useEffect, useState } from "react";

export function useObservations() {
  const { user } = useUser();

  const { enabled, locationRef } = useContext(LocationContext);
  const [observations, setObservations] = useState([] as Observation[]);

  const fetchObservations = useCallback(
    async function fetchObservations() {
      if (!user) {
        console.log(`User not logged in, skipping fetching observations`);
        return;
      }
      const response = await fetch("/api/observations");
      const { observations: rawObservations } = await response.json();

      const observations = rawObservations.map((rawObservation: any) => {
        const observation: Observation = {
          species: rawObservation.species,
          amount: rawObservation.amount,
          date: new Date(rawObservation.date),
          location: rawObservation.location,
        };
        return observation;
      });
      console.log(`Fetched ${observations.length} observations from database`);
      setObservations(observations);
    },
    [user],
  );

  useEffect(() => {
    fetchObservations();
  }, [fetchObservations]);

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

      if (!user) {
        // Local in-memory for non-logged-in users
        setObservations((o) => [...o, observation]);
        return;
      }

      // Remote storage for logged-in users
      await fetch("/api/observations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          species: observation.species.finnishName,
          amount: observation.amount,
          date: observation.date,
          location: observation.location,
        }),
      });
      // Trigger refetch of observations
      await fetchObservations();
    },
    [enabled, locationRef, user, fetchObservations],
  );

  return { createObservation, observations };
}
