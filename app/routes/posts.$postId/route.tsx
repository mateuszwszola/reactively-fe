import { Title } from "@mantine/core";
import { useParams } from "@remix-run/react";
import type { ActionArgs } from "@remix-run/node";
import { getSession } from "~/sessions";
import { API_URL } from "~/types/api";

export async function action({ request, params }: ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  const accessToken = session.get("accessToken");

  if (!accessToken) {
    throw new Response(null, {
      status: 401,
    });
  }

  const formData = await request.formData();

  const postId = params.postId;

  const intent = formData.get("intent");

  if (intent === "favorite") {
    const response = await fetch(`${API_URL}/post/like`, {
      method: "POST",
      body: JSON.stringify({
        id_post: Number(postId),
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Response(data, {
        status: response.status || 400,
      });
    }

    return data;
  }

  return null;
}

export default function PostPage() {
  const { postId } = useParams();

  return (
    <div>
      <Title>Post {postId}</Title>
    </div>
  );
}
