import { Button, Paper, Textarea, TextInput, Title } from "@mantine/core";
import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { requireUserSession } from "~/http";
import { API_URL } from "~/types/api";

export async function action({ request }: ActionArgs) {
  const { accessToken, userId } = await requireUserSession(request);

  const formData = await request.formData();

  const title = formData.get("title");
  const content = formData.get("content");

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

  if (!apiResponse.ok) {
    throw new Response(null, {
      status: apiResponse.status || 500,
    });
  }

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
