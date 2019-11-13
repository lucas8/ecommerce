import { Context } from "../types/types";
import { verify } from "jsonwebtoken";

interface Token {
  userId: string;
}

export const getUserId = (context: Context) => {
  const Authorization: string = context.request.get("Authorization");

  if (Authorization) {
    const token: string = Authorization.replace("Bearer ", "");
    let verifiedToken: Token | undefined;

    try {
      verifiedToken = verify(token, process.env.ACCESS_TOKEN_SECRET!) as Token;
    } catch (e) {}

    return verifiedToken && verifiedToken.userId;
  } else {
    return;
  }
};
