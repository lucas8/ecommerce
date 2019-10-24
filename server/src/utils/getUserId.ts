import { Context } from "./types";
import { verify } from "jsonwebtoken";

interface Token {
  userId: string;
}

export const getUserId = (context: Context) => {
  const Authorization: string = context.request.get("Authorization");

  if (Authorization) {
    const token: string = Authorization.replace("Bearer ", "");
    const verifiedToken: Token = verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!
    ) as Token;

    return verifiedToken && verifiedToken.userId;
  } else {
    return;
  }
};
