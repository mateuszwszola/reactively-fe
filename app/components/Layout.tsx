import { createStyles } from "@mantine/core";

export const useLayoutStyles = createStyles((theme) => ({
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
