import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { createUser } from "@/app/db/users";

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

  return res.redirect(307, "/");
});
