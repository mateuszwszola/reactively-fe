import {
  Anchor,
  Button,
  Checkbox,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { Link } from "@remix-run/react";
import type { V2_MetaFunction } from "@remix-run/node";
import { useStyles } from "~/components/Auth";
import { IconArrowLeft } from "@tabler/icons-react";

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "Log In | Reactively",
    },
  ];
};

export default function LoginPage() {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <Paper
        component="form"
        method="post"
        className={classes.form}
        radius={0}
        p={30}
      >
        <Anchor component={Link} to="/" className={classes.backLink}>
          <IconArrowLeft />
          <Text>Homepage</Text>
        </Anchor>
        <Title order={2} className={classes.title} ta="center" mt="xl" mb={50}>
          Welcome back to Reactively!
        </Title>

        <TextInput
          name="email"
          label="Email address"
          placeholder="hello@gmail.com"
          size="md"
        />
        <PasswordInput
          name="password"
          label="Password"
          placeholder="Your password"
          mt="md"
          size="md"
        />
        <Checkbox name="loggedIn" label="Keep me logged in" mt="xl" size="md" />
        <Button type="submit" fullWidth mt="xl" size="md">
          Login
        </Button>

        <Text ta="center" mt="md">
          Don&apos;t have an account?{" "}
          <Anchor component={Link} to="/signup" weight={600}>
            Register
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}
