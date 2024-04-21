import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createUser({
  email,
  sub,
  name,
  picture,
  emailVerified = false,
}: {
  email: string;
  sub: string;
  name?: string;
  picture?: string;
  emailVerified?: boolean;
}) {
  console.log(`Start upserting user with email: ${email}`);
  const user = await prisma.user.upsert({
    where: {
      sub,
    },
    update: {
      email,
      name,
      sub,
      picture,
      emailVerified,
    },
    create: {
      email,
      name,
      sub,
      picture,
      emailVerified,
    },
  });
  console.log(`Upserted user with email: ${user.email} and ID: ${user.id}`);
}

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({ where: { email } });
}

export async function getUserBySub(sub: string) {
  return await prisma.user.findUnique({ where: { sub } });
}
