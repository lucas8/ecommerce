import { Response, Request } from "express";
import { User } from "../entity/User";
import { sendRefreshToken } from "../utils/sendRefreshToken";
import { createRefreshToken, createAccessToken } from "../utils/createToken";
import { verify } from "jsonwebtoken";

export const RefreshRoute = async (req: Request, res: Response) => {
  const token: string = req.cookies.qid;
  if (!token) {
    return res.send({ success: false, accessToken: "" });
  }

  let payload: any = null;
  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
  } catch (err) {
    return res.send({ success: false, accessToken: "" });
  }

  // User is valid and we can send back access token
  const user: User | undefined = await User.findOne({ id: payload.userId });

  if (!user) {
    return res.send({ success: false, accessToken: "" });
  }

  // Check if refresh token has been issued more recently
  if (user.tokenVersion !== payload.tokenVersion) {
    return res.send({ success: false, accessToken: "" });
  }

  sendRefreshToken(res, createRefreshToken(user));

  return res.send({ success: true, accessToken: createAccessToken(user) });
};
