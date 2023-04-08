import type { V2_MetaFunction } from "@remix-run/node";
import { createStyles } from "@mantine/core";
import Header from "~/components/Header";
import Hero from "~/components/Hero";
import Footer from "~/components/Footer";

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "Reactively",
    },
  ];
};

const useStyles = createStyles(() => ({
  layout: {
    display: "grid",
    gridTemplateRows: "auto 1fr auto",
    minHeight: "100vh",
  },
}));

export default function Index() {
  const { classes } = useStyles();
  return (
    <div className={classes.layout}>
      <Header />
      <main>
        <Hero />
      </main>
      <Footer />
    </div>
  );
}
