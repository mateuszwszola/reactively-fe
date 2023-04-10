import type { V2_MetaFunction } from "@remix-run/node";
import { createStyles } from "@mantine/core";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { Outlet } from "@remix-run/react";

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
}));

export default function Index() {
  const { classes } = useStyles();

  return (
    <div className={classes.layout}>
      <Header />
      <main className={classes.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
