import { Box, Button, createStyles, Title } from "@mantine/core";
import { Link, useLoaderData } from "@remix-run/react";
import PostCard from "~/components/PostCard";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { ResponseBody } from "~/types/api";
import type { z } from "zod";
import { fetchFromApi } from "~/client";
import { requireUserSession } from "~/http";
import { postSchema } from "~/schemas";

const postsSchema = postSchema.array();

export type Post = z.infer<typeof postSchema>;

export type Posts = z.infer<typeof postsSchema>;

const useStyles = createStyles(() => ({
  list: {
    margin: "3rem 0 0",
    padding: 0,
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 512px))",
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
  const { accessToken, userId } = await requireUserSession(request);

  const fetcher = await fetchFromApi(request);

  const response = await fetcher("/post", {
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

  const { data: posts } = (await response.json()) as ResponseBody<Posts>;

  const parsedPosts = postsSchema.parse(posts);

  const mappedPosts = parsedPosts.map((post) => ({
    ...post,
    isFavorite: post.likes.some((like) => like.user.id_user === userId),
  }));

  return json({
    posts: mappedPosts,
  });
}

export default function PostsPageIndex() {
  const { classes } = useStyles();
  const { posts } = useLoaderData<typeof loader>();

  return (
    <div>
      <Box className={classes.header}>
        <Title order={1}>Posts</Title>

        <Button component={Link} to="new">
          Create post
        </Button>
      </Box>

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
