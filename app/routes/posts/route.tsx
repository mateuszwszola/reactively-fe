import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { Outlet, useLoaderData } from "@remix-run/react";
import { getSession } from "~/sessions";
import { useLayoutStyles } from "~/components/Layout";

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

export default function Index() {
  const { classes } = useLayoutStyles();
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
