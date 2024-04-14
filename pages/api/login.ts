import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

async function createUser({
  email,
  sub,
  name,
  picture,
  emailVerified,
}: {
  email: string;
  sub: string;
  name?: string;
  picture?: string;
  emailVerified?: string;
}) {
  console.log(`Would create new user with email: ${email}`);
}

export default withApiAuthRequired(async function LoginRoute(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getSession(req, res);

  if (!session) {
    return res.status(400).json({ message: "No session" });
  }

  const user = session.user;
  const email = user.email;
  const sub = user.sub;
  const name = user.name;
  const picture = user.picture;
  const emailVerified = user.email_verified;

  await createUser({
    email,
    sub,
    name,
    picture,
    emailVerified,
  });

  return res.redirect(301, "/");
});
