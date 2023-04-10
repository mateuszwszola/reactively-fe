import { createStyles, Title } from "@mantine/core";
import { Link, useLoaderData } from "@remix-run/react";
import PostCard from "~/components/PostCard";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import posts from "~/data/posts.json";

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
}));

export async function loader(request: LoaderArgs) {
  // TODO: Temporarily mocked
  return json({
    posts,
  });
}

export default function PostsPageIndex() {
  const { classes } = useStyles();
  const { posts } = useLoaderData<typeof loader>();

  return (
    <div>
      <Title order={1}>Posts</Title>

      <ul className={classes.list}>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={post.id} className={classes.link}>
              <PostCard post={post} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
