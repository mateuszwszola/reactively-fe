import { useLayoutStyles } from "~/components/Layout";
import { Outlet } from "@remix-run/react";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import type { LoaderArgs } from "@remix-run/node";
import { requireUserSession } from "~/http";

export async function loader({ request }: LoaderArgs) {
  await requireUserSession(request);

  return null;
}

export default function Index() {
  const { classes } = useLayoutStyles();

  return (
    <div className={classes.layout}>
      <Header isAuthenticated />
      <main className={classes.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
