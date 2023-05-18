import {API_URL} from "~/types/api";
import {redirect} from "@remix-run/node";
import {destroySession, getSession} from "~/sessions";

export async function fetchFromApi(request: Request) {
    const session = await getSession(request.headers.get('Cookie'));

    return async function(endpoint: `/${string}`, options: RequestInit = {}) {
        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options
        });


        if (response.status === 401) {
            throw redirect('/login', {
                headers: {
                    'Set-Cookie': await destroySession(session),
                }
            });
        }

        return response;
    }
}