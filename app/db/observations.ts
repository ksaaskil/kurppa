import { PrismaClient } from "@prisma/client";
import { getUserByEmail } from "./users";
import { ListedSpecies, Observation, findListedSpecies } from "../utils/shared";

const prisma = new PrismaClient();

export async function createObservation({
  userEmail,
  species,
  date,
}: {
  userEmail: string;
  species: string;
  date: Date;
}) {
  const user = await getUserByEmail(userEmail);
  if (!user) {
    throw new Error(`User does not exist: ${userEmail}`);
  }
  const observation = await prisma.observation.create({
    data: {
      species,
      date,
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
    const obs: Observation = {
      id: observation.id,
      species: listedSpecies,
      date: observation.date,
      amount: 1, // TODO
    };
    return obs;
  });
  return (await Promise.all(obsFutures)).map((obs) => obs!);
}
