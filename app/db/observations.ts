import { PrismaClient } from "@prisma/client";
import { getUserByEmail } from "./users";
import { Observation, findListedSpecies } from "../utils/shared";
import { WorldLocation } from "../hooks/useLocation";

const prisma = new PrismaClient();

export async function createObservation({
  userEmail,
  species,
  date,
  amount,
  location,
}: {
  userEmail: string;
  species: string;
  date: Date;
  amount: number;
  location?: WorldLocation;
}) {
  const user = await getUserByEmail(userEmail);
  if (!user) {
    throw new Error(`User does not exist: ${userEmail}`);
  }
  if (!findListedSpecies(species)) {
    throw new Error(`Unknown species: ${species}`);
  }
  console.log(
    `Creating observation for species: '${species}' with amount: ${amount} and date: ${date}`,
  );
  const observation = await prisma.observation.create({
    data: {
      species,
      date,
      amount,
      observerLatitude: location?.latitude,
      observerLongitude: location?.longitude,
      observationLocationAccuracy: location?.accuracy,
      observationLocationTimestamp: location?.timestamp,
      user: {
        connect: {
          email: userEmail,
        },
      },
    },
  });
  return observation;
}

export async function listObservations({
  userEmail,
}: {
  userEmail: string;
}): Promise<Observation[]> {
  const user = await getUserByEmail(userEmail);
  if (!user) {
    throw new Error(`User does not exist: ${userEmail}`);
  }
  const rawObservations = await prisma.observation.findMany({
    where: {
      userId: user.id,
    },
  });
  const obsFutures = rawObservations.map(async (observation) => {
    const listedSpecies = await findListedSpecies(observation.species);
    if (!listedSpecies) {
      console.warn(`Unknown species: ${observation.species}`);
      return undefined;
    }
    const location =
      observation.observerLatitude &&
      observation.observerLongitude &&
      observation.observationLocationAccuracy &&
      observation.observationLocationTimestamp
        ? {
            location: {
              latitude: observation.observerLatitude,
              longitude: observation.observerLongitude,
              accuracy: observation.observationLocationAccuracy,
              timestamp: observation.observationLocationTimestamp,
            },
          }
        : {};

    const obs: Observation = {
      id: observation.id,
      species: listedSpecies,
      date: observation.date,
      amount: observation.amount,
      ...location,
    };
    return obs;
  });
  return (await Promise.all(obsFutures))
    .filter((obs) => !!obs)
    .map((obs) => obs!);
}

export async function deleteObservation({
  userEmail,
  observationId,
}: {
  userEmail: string;
  observationId: string;
}): Promise<void> {
  const user = await getUserByEmail(userEmail);
  if (!user) {
    throw new Error(`User does not exist: ${userEmail}`);
  }
  const observation = await prisma.observation.findFirst({
    where: {
      id: observationId,
      userId: user.id,
    },
  });
  if (!observation) {
    throw new Error(
      `Observation does not exist: ${observationId} for user: ${userEmail}`,
    );
  }
  await prisma.observation.delete({
    where: {
      id: observationId,
    },
  });
}
