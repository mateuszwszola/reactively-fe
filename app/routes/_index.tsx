import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { createStyles } from "@mantine/core";
import Header from "~/components/Header";
import Hero from "~/components/Hero";
import Footer from "~/components/Footer";
import { getSession } from "~/sessions";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "Reactively",
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

const useStyles = createStyles(() => ({
  layout: {
    display: "grid",
    gridTemplateRows: "auto 1fr auto",
    minHeight: "100vh",
  },
}));

export default function Index() {
  const { isAuthenticated } = useLoaderData<typeof loader>();

  const { classes } = useStyles();
  return (
    <div className={classes.layout}>
      <Header isAuthenticated={isAuthenticated} />
      <main>
        <Hero />
      </main>
      <Footer />
    </div>
  );
}
