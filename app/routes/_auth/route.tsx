import type {LoaderArgs} from "@remix-run/node";
import {redirect} from "@remix-run/node";
import {Outlet} from "@remix-run/react";
import {getSession} from "~/sessions";

export async function loader({request}: LoaderArgs) {
    const session = await getSession(request.headers.get("Cookie"));

    if (session.has("accessToken")) {
        return redirect("/");
    }

    return null;
}

export default function AuthLayout() {
    return (
        <Outlet/>
    )
}