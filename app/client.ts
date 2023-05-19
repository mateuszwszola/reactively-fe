import { API_URL } from "~/types/api";
import { redirect } from "@remix-run/node";
import { destroySession, getSession } from "~/sessions";

export async function fetchFromApi(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));

  const accessToken = session.get("accessToken");

  console.log("accessToken", accessToken);

  const defaultHeaders: RequestInit["headers"] = accessToken
    ? {
        Authorization: `Bearer ${accessToken}`,
      }
    : {};

  return async function (endpoint: `/${string}`, options: RequestInit = {}) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: options.method || "GET",
      ...options,
      headers: {
        ...defaultHeaders,
        ...(options.headers || {}),
      },
    });

    if (response.status === 401) {
      throw redirect("/login", {
        headers: {
          "Set-Cookie": await destroySession(session),
        },
      });
    }

    return response;
  };
}
