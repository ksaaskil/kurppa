import { PrismaClient } from "@prisma/client";
import { getUserByEmail } from "./users";

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
