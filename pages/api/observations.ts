import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { createObservation, listObservations } from "@/app/db/observations";
import { Observation } from "@/app/utils/shared";

export default withApiAuthRequired(async function ObservationsRoute(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getSession(req, res);

  if (!session) {
    return res.status(400).json({ message: "No session" });
  }

  const user = session.user;

  if (req.method === "POST") {
    const { species, amount, date, location } = req.body;
    const observation = await createObservation({
      userEmail: user.email,
      species,
      date: new Date(date),
      amount,
      location,
    });

    return res.status(200).json(observation);
  } else if (req.method === "GET") {
    const observations: Observation[] = await listObservations({
      userEmail: user.email,
    });
    return res.status(200).json({ observations });
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
});
