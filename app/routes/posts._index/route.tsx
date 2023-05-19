import { Box, Button, createStyles, Flex, Title, Text } from "@mantine/core";
import { Link, useLoaderData } from "@remix-run/react";
import PostCard from "~/components/PostCard";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { ResponseBody } from "~/types/api";
import { API_URL } from "~/types/api";
import type { z } from "zod";
import { fetchFromApi } from "~/client";
import { requireUserSession } from "~/http";
import { postSchema } from "~/schemas";
import { TagFilters } from "~/components/TagFilters";

const postsSchema = postSchema.array();

export type Post = z.infer<typeof postSchema>;

export type Posts = z.infer<typeof postsSchema>;

const useStyles = createStyles(() => ({
  list: {
    margin: "3rem 0 0",
    padding: 0,
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1rem",
    listStyle: "none",
  },

  link: {
    display: "block",
    textDecoration: "none",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

export async function loader({ request }: LoaderArgs) {
  const { userId } = await requireUserSession(request);

  const fetcher = await fetchFromApi(request);

  const [postResponse, tagsResponse, profileResponse] = await Promise.all([
    fetcher("/post/feed"),
    fetcher("/tag"),
    fetcher(`/user/${userId}/profile`),
  ]);

  const { data: posts } = (await postResponse.json()) as ResponseBody<Posts>;

  const mappedPosts = posts.map((post) => ({
    ...post,
    isFavorite: post.likes.some((like) => like.user.id_user === userId),
  }));

  const { data: tags } = (await tagsResponse.json()) as ResponseBody<
    { id_tag: number; name: string }[]
  >;

  const profileData = await profileResponse.json();

  const userTags = profileData.data[0].userTags as Array<{
    tag: { id_tag: number; name: string };
  }>;

  return json({
    posts: mappedPosts,
    tags,
    userTags,
  });
}

export async function action({ request }: ActionArgs) {
  const { accessToken, userId } = await requireUserSession(request);

  const formData = await request.formData();

  const selectedTags = formData.getAll("tags");

  if (!selectedTags || !selectedTags.every((tag) => typeof tag === "string")) {
    return json({ error: "Please provide valid tags" }, { status: 422 });
  }

  const apiResponse = await fetch(API_URL + "/user/tags", {
    method: "PUT",
    body: JSON.stringify({
      id_user: userId,
      tags: selectedTags.map((tag) => Number(tag)),
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!apiResponse.ok) {
    throw new Error("Failed to update tags");
  }

  const data = (await apiResponse.json()) as ResponseBody<{
    userTags: Array<{ id_tag: number; name: string }>;
  }>;

  return data;
}

export default function PostsPageIndex() {
  const { classes } = useStyles();
  const { posts, tags, userTags } = useLoaderData<typeof loader>();

  return (
    <div>
      <Box className={classes.header}>
        <Title order={1}>Posts</Title>

        <Button component={Link} to="new">
          Create post
        </Button>
      </Box>

      <Flex direction="column" mt={48} gap={8}>
        <Title order={2}>Select tags</Title>
        <Box mt="md">
          <TagFilters tags={tags} userTags={userTags} />
        </Box>
      </Flex>

      {posts.length === 0 ? (
        <Text mt={64} align="center">
          No posts found
        </Text>
      ) : null}

      <ul className={classes.list}>
        {posts.map((post) => (
          <li key={post.id_post}>
            <Link to={String(post.id_post)} className={classes.link}>
              <PostCard post={post} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
