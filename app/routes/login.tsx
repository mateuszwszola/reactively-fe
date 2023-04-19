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
import type { V2_MetaFunction, ActionArgs, LoaderArgs } from "@remix-run/node";
import { useStyles } from "~/components/Auth";
import { IconArrowLeft } from "@tabler/icons-react";
import { json, redirect } from "@remix-run/node";
import type { ResponseBody } from "~/api";
import { API_URL } from "~/api";
import { commitSession, getSession } from "~/sessions";

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "Log In | Reactively",
    },
  ];
};

export async function loader({ request }: LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("accessToken")) {
    return redirect("/");
  }

  return null;
}

export async function action({ request }: ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  const formData = await request.formData();

  const username = formData.get("username");
  const password = formData.get("password");

  const validationErrors: Record<string, string> = {};

  if (!username || typeof username !== "string") {
    validationErrors.username = "Username is required";
  }

  if (!password || typeof password !== "string") {
    validationErrors.password = "Password is required";
  }

  if (Object.keys(validationErrors).length > 0) {
    return json({ validationErrors, errors: null }, { status: 422 });
  }

  const apiResponse = await fetch(API_URL + "/auth/login", {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const body = (await apiResponse.json()) as ResponseBody<
    [{ access_token: string }]
  >;

  if (!apiResponse.ok) {
    const { errors, status } = body;

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

  const accessToken = body.data?.[0]?.access_token;

  session.set("accessToken", accessToken);

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function LoginPage() {
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
          Welcome back to Reactively!
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
        <PasswordInput
          name="password"
          label="Password"
          placeholder="Your password"
          mt="md"
          size="md"
          error={actionData?.validationErrors?.password}
        />

        <Button
          type="submit"
          fullWidth
          mt="xl"
          size="md"
          loading={isSubmitting}
        >
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
