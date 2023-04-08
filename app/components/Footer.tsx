import { createStyles, rem } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: rem(120),
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    paddingTop: rem(4),
    paddingBottom: rem(4),
    textAlign: "center",
  },
}));

export default function Footer() {
  const { classes } = useStyles();

  return (
    <footer className={classes.footer}>
      <p>Reactively</p>
    </footer>
  );
}
