import {
  Anchor,
  Button,
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
      title: "Sign Up | Reactively",
    },
  ];
};

export default function SignupPage() {
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
          Sign up to get started with Reactively!
        </Title>

        <TextInput name="login" label="Login" placeholder="Johnny" size="md" />
        <TextInput
          name="email"
          label="Email address"
          placeholder="johnny@gmail.com"
          mt="md"
          size="md"
        />
        <PasswordInput
          name="password"
          label="Password"
          placeholder="Your password"
          mt="md"
          size="md"
        />
        <PasswordInput
          name="passwordConfirmation"
          label="Confirm password"
          placeholder="Confirm password"
          mt="md"
          size="md"
        />
        <Button type="submit" fullWidth mt="xl" size="md">
          Sign Up
        </Button>

        <Text ta="center" mt="md">
          Already have an account?{" "}
          <Anchor component={Link} to="/login" weight={600}>
            Login
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}
