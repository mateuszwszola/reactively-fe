import {
  Box,
  Burger,
  Button,
  createStyles,
  Divider,
  Drawer,
  Group,
  Header as MantineHeader,
  rem,
  ScrollArea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLemon } from "@tabler/icons-react";
import { Form, Link } from "@remix-run/react";

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: rem(42),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

interface HeaderProps {
  isAuthenticated?: boolean;
}

export default function Header({ isAuthenticated = false }: HeaderProps) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { classes, theme } = useStyles();

  return (
    <Box>
      <MantineHeader height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          <Box
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              gap: rem(4),
              color: theme.colors.orange[5],
            })}
          >
            <IconLemon size={30} />
            <Box
              component="span"
              sx={{
                fontWeight: 600,
                letterSpacing: rem(1),
              }}
            >
              Reactively
            </Box>
          </Box>

          {!isAuthenticated ? (
            <Group className={classes.hiddenMobile}>
              <Button variant="default" component={Link} to="/login">
                Log in
              </Button>
              <Button component={Link} to="/signup">
                Sign up
              </Button>
            </Group>
          ) : (
            <Form method="post" action="/logout">
              <Button type="submit" variant="default">
                Log out
              </Button>
            </Form>
          )}

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </MantineHeader>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Reactively"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <Link to="/" className={classes.link}>
            Home
          </Link>
          <Link to="/posts" className={classes.link}>
            Explore
          </Link>

          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <Group position="center" grow pb="xl" px="md">
            <Button variant="default" component={Link} to="/login">
              Log in
            </Button>
            <Button component={Link} to="/signup">
              Sign up
            </Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
