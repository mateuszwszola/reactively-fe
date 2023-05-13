import { Button, Paper, Textarea, TextInput, Title } from "@mantine/core";
import { Form } from "@remix-run/react";
import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { getSession } from "~/sessions";
import { API_URL } from "~/api";

export async function action({ request }: ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  const accessToken = session.get("accessToken");
  const userId = session.get("userId");

  if (!accessToken || !userId) {
    return redirect("/posts");
  }

  const formData = await request.formData();

  const title = formData.get("title");
  const content = formData.get("content");

  // TODO: Handle errors
  const apiResponse = await fetch(API_URL + "/post", {
    method: "POST",
    body: JSON.stringify({
      id_user: userId,
      title,
      content,
      tags: [],
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return redirect("/posts");
}

export default function PostPage() {
  return (
    <div>
      <Title>New Post</Title>

      <Paper
        component={Form}
        method="post"
        radius={0}
        p={30}
        maw={720}
        mx="auto"
      >
        <TextInput
          name="title"
          label="Post title"
          placeholder="Enter post title"
          size="md"
        />

        <Textarea
          mt={16}
          name="content"
          label="Post content"
          placeholder="Enter post content"
        />

        <Button type="submit" fullWidth mt="xl" size="md">
          Create Post
        </Button>
      </Paper>
    </div>
  );
}
