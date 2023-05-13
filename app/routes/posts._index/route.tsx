import { Box, Button, createStyles, Title } from "@mantine/core";
import { Link, useLoaderData } from "@remix-run/react";
import PostCard from "~/components/PostCard";
import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { API_URL } from "~/api";
import { getSession } from "~/sessions";

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

  if (!accessToken) {
    return redirect("/login");
  }

  const postsResponse = await fetch(API_URL + "/post", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const { data } = await postsResponse.json();

  // TODO: Some fields are hardcoded
  const posts = data.map((post: any) => ({
    id: post.id_post,
    title: post.title,
    content: post.content,
    image:
      "https://source.unsplash.com/random/?rest,recovery,training,performance",
    tags: [],
    comments: [],
    likes: [],
    author: {
      id: post.user.id_user,
      login: post.user.username,
      image: "https://source.unsplash.com/random/?avatar",
    },
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  }));

  return json({
    posts,
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
        {posts.map((post: any) => (
          <li key={post.id}>
            <Link to={String(post.id)} className={classes.link}>
              <PostCard post={post} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
