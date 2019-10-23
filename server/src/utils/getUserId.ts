import { Context } from "./types";
import { verify } from "jsonwebtoken";

interface Token {
  userId: string;
}

export const getUserId = (context: Context) => {
  const Authorization = context.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const verifiedToken = verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!
    ) as Token;
    return verifiedToken && verifiedToken.userId;
  } else {
    return;
  }
};
