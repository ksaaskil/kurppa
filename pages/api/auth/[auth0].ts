import { handleAuth, handleLogin, handleProfile } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

export default handleAuth({
  async login(req: NextApiRequest, res: NextApiResponse<any>) {
    await handleLogin(req, res, {
      returnTo: "/api/login",
    });
  },
});
