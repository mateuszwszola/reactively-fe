import jwt from "jsonwebtoken";

export function decodeToken(accessToken: string) {
  return jwt.decode(accessToken);
}
