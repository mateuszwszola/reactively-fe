import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { createStyles, Title } from "@mantine/core";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import posts from "~/data/posts.json";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import PostCard from "~/components/PostCard";

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "Posts | Reactively",
    },
  ];
};

const useStyles = createStyles((theme) => ({
  layout: {
    display: "grid",
    gridTemplateRows: "auto 1fr auto",
    gridTemplateColumns: "1fr",
    minHeight: "100vh",
  },

  main: {
    width: "100%",
    maxWidth: theme.breakpoints.xl,
    margin: "0 auto",
    padding: "2rem 1rem",
  },

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

export default function Index() {
  const { classes } = useStyles();
  const { posts } = useLoaderData<typeof loader>();

  return (
    <div className={classes.layout}>
      <Header />
      <main className={classes.main}>
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
      </main>
      <Footer />
    </div>
  );
}
