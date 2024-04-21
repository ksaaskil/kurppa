import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { createObservation } from "@/app/db/observations";

export default withApiAuthRequired(async function ObservationsRoute(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getSession(req, res);

  if (!session) {
    return res.status(400).json({ message: "No session" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const user = session.user;
  const species = req.body.species;

  const observation = await createObservation({
    userEmail: user.email,
    species,
    date: new Date(),
  });

  return res.status(200).json(observation);
});
