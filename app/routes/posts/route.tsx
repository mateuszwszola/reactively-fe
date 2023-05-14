import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { createStyles } from "@mantine/core";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { Outlet, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { getSession } from "~/sessions";

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "Posts | Reactively",
    },
  ];
};

export async function loader({ request }: LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  const accessToken = session.get("accessToken");

  return json({
    isAuthenticated: Boolean(accessToken),
  });
}

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
}));

export default function Index() {
  const { classes } = useStyles();
  const { isAuthenticated } = useLoaderData<typeof loader>();

  return (
    <div className={classes.layout}>
      <Header isAuthenticated={isAuthenticated} />
      <main className={classes.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
