import { Anchor, Avatar, Box, Button, Flex, Text, Title } from "@mantine/core";
import { Link, useLoaderData } from "@remix-run/react";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getSession } from "~/sessions";
import type { ResponseBody } from "~/types/api";
import { API_URL } from "~/types/api";
import { requireUserSession } from "~/http";
import { fetchFromApi } from "~/client";
import type { Post } from "~/routes/posts._index/route";
import { postSchema } from "~/schemas";
import React from "react";
import { IconArrowLeft } from "@tabler/icons-react";

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

export async function loader({ request, params }: LoaderArgs) {
  const { accessToken } = await requireUserSession(request);
  const postId = params.postId;

  const fetcher = await fetchFromApi(request);

  const response = await fetcher(`/post/${postId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Response(null, {
      status: response.status || 500,
    });
  }

  const responseData = (await response.json()) as ResponseBody<[Post]>;

  const post = responseData.data[0];

  const parsedPost = postSchema.parse(post);

  return json({
    post: parsedPost,
  });
}

export default function PostPage() {
  const { post } = useLoaderData<typeof loader>();

  return (
    <div>
      <Button component={Link} to="/posts" variant="subtle">
        <IconArrowLeft />
        All posts
      </Button>

      <Box mt={32}>
        <Anchor component={Link} to={`/account/${post.id_user}`} color="blue">
          <Flex align="center" gap={16}>
            <Avatar size={64} color="cyan" radius="xl">
              {post.user.username.slice(0, 2).toUpperCase()}
            </Avatar>
            <Text fz="xl" weight="bold">
              {post.user.username}
            </Text>
          </Flex>
        </Anchor>
      </Box>

      <Box mt={64} mx="auto" maw={720}>
        <Title>{post.title}</Title>

        <Box mt={32}>{post.content}</Box>
      </Box>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return <div>Ups</div>;
}
