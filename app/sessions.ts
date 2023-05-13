import { createCookieSessionStorage } from "@remix-run/node";

type SessionData = {
  accessToken: string;
  userId: number;
};

if (!process.env.SESSION_SECRET) {
  throw new Error(
    "Please define the SESSION_SECRET environment variable inside .env"
  );
}

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData>({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: "__session",

      httpOnly: true,
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
      sameSite: "lax",
      secrets: [process.env.SESSION_SECRET],
      secure: process.env.NODE_ENV === "production",
    },
  });

export { getSession, commitSession, destroySession };
