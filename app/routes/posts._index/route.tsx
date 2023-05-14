import { Box, Button, createStyles, Title } from "@mantine/core";
import { Link, useLoaderData } from "@remix-run/react";
import PostCard from "~/components/PostCard";
import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { ResponseBody } from "~/types/api";
import { API_URL } from "~/types/api";
import { getSession } from "~/sessions";
import { postSchema } from "./schemas";
import type { z } from "zod";

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
  const session = await getSession(request.headers.get("Cookie"));

  const accessToken = session.get("accessToken");
  const userId = session.get("userId");

  if (!accessToken) {
    return redirect("/login");
  }

  const response = await fetch(API_URL + "/post", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const { data: posts } = (await response.json()) as ResponseBody<Posts>;

  if (!response.ok) {
    throw new Response(null, {
      status: response.status || 500,
    });
  }

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
