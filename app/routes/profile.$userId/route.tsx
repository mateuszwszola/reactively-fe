import { Box } from "@mantine/core";
import { useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { ResponseBody } from "~/types/api";
import { requireUserSession } from "~/http";
import { fetchFromApi } from "~/client";
import React from "react";
import { UserCard } from "~/components/ProfileCard";

// TODO: Update types
interface Profile {
  username: string;
  posts: [];
}

export async function loader({ request, params }: LoaderArgs) {
  const { accessToken, userId } = await requireUserSession(request);

  const fetcher = await fetchFromApi(request);

  const response = await fetcher(`/user/${userId}/profile`, {
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

  const responseData = (await response.json()) as ResponseBody<[Profile]>;

  const profile = responseData.data[0];

  return json({
    profile,
  });
}

export default function UserProfilePage() {
  const { profile } = useLoaderData<typeof loader>();

  return (
    <Box maw={512} mx="auto">
      {/*TODO: Update schema and types*/}
      <UserCard
        image="https://source.unsplash.com/random"
        avatar="https://source.unsplash.com/random/?avatar"
        name={profile.username}
        job="Test"
        stats={[{ label: "Posts", value: String(profile.posts.length) }]}
      />
    </Box>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return <div>Ups</div>;
}
