import {
  Anchor,
  Button,
  List,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { Form, Link, useActionData, useNavigation } from "@remix-run/react";
import type { ActionArgs, V2_MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useStyles } from "~/components/Auth";
import { IconArrowLeft } from "@tabler/icons-react";
import type { ResponseBody } from "~/types/api";
import { API_URL } from "~/types/api";

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "Sign Up | Reactively",
    },
  ];
};

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  const passwordConfirmation = formData.get("passwordConfirmation");

  const validationErrors: Record<string, string> = {};

  if (!username || typeof username !== "string") {
    validationErrors.username = "Username is required";
  }

  if (!email || typeof email !== "string") {
    validationErrors.email = "Email is required";
  }

  if (!password || typeof password !== "string") {
    validationErrors.password = "Password is required";
  }

  if (!passwordConfirmation || typeof passwordConfirmation !== "string") {
    validationErrors.passwordConfirmation = "Password confirmation is required";
  }

  if (password !== passwordConfirmation) {
    validationErrors.passwordConfirmation = "Passwords must match";
  }

  if (Object.keys(validationErrors).length > 0) {
    return json({ validationErrors, errors: null }, { status: 422 });
  }

  const apiResponse = await fetch(API_URL + "/user", {
    method: "POST",
    body: JSON.stringify({
      email,
      username,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!apiResponse.ok) {
    const { errors, status } = (await apiResponse.json()) as ResponseBody;

    const errorMessages = errors?.flatMap((error) => error.message) || [
      "Something went wrong",
    ];

    return json(
      {
        validationErrors: null,
        errors: errorMessages,
      },
      { status: status || 422 }
    );
  }

  return redirect("/login");
}

export default function SignupPage() {
  const { classes } = useStyles();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();

  const errors = actionData?.errors;

  const isSubmitting = navigation.state === "submitting";

  return (
    <div className={classes.wrapper}>
      <Paper
        component={Form}
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

        {errors && (
          <List mb={16}>
            {errors.map((error, index) => (
              <List.Item className={classes.errorMessage} key={index}>
                {error}
              </List.Item>
            ))}
          </List>
        )}

        <TextInput
          name="username"
          label="Username"
          placeholder="Johnny"
          size="md"
          error={actionData?.validationErrors?.username}
        />
        <TextInput
          name="email"
          label="Email address"
          placeholder="johnny@gmail.com"
          mt="md"
          size="md"
          error={actionData?.validationErrors?.email}
        />
        <PasswordInput
          name="password"
          label="Password"
          placeholder="Your password"
          mt="md"
          size="md"
          error={actionData?.validationErrors?.password}
        />
        <PasswordInput
          name="passwordConfirmation"
          label="Confirm password"
          placeholder="Confirm password"
          mt="md"
          size="md"
          error={actionData?.validationErrors?.passwordConfirmation}
        />
        <Button
          type="submit"
          fullWidth
          mt="xl"
          size="md"
          loading={isSubmitting}
        >
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
