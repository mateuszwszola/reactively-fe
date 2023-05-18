import { redirect } from "@remix-run/node";
import {getSession} from "~/sessions";

export async function requireUserSession(request: Request) {
    const session = await getSession(
        request.headers.get("Cookie")
    );

    const accessToken = session.get("accessToken");
    const userId = session.get("userId");

    if (!session || !accessToken || !userId) {
        throw redirect("/login", 302);
    }

    return {
        session,
        accessToken,
        userId,
    };
}
