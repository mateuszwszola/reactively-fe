import {
  Anchor,
  Avatar,
  Box,
  Button,
  Text,
  Textarea,
  Title,
  Flex,
} from "@mantine/core";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, useLoaderData, useNavigation } from "@remix-run/react";
import { IconArrowLeft } from "@tabler/icons-react";
import { fetchFromApi } from "~/client";
import { requireUserSession } from "~/http";
import type { Post } from "~/routes/posts._index/route";
import { getSession } from "~/sessions";
import type { ResponseBody } from "~/types/api";
import { API_URL } from "~/types/api";
import { Comment } from "~/components/Comment";
import React from "react";

export async function action({ request, params }: ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  const accessToken = session.get("accessToken");

  if (!accessToken) {
    throw new Response(null, {
      status: 401,
    });
  }

  const formData = await request.formData();

  const postId = params.postId;

  const intent = formData.get("intent");

  if (intent === "favorite") {
    const response = await fetch(`${API_URL}/post/like`, {
      method: "POST",
      body: JSON.stringify({
        id_post: Number(postId),
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Response(data, {
        status: response.status || 400,
      });
    }

    return data;
  } else if (intent === "comment") {
    const response = await fetch(`${API_URL}/comment`, {
      method: "POST",
      body: JSON.stringify({
        id_post: Number(postId),
        content: formData.get("comment"),
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    console.log("response", response);

    if (!response.ok) {
      throw new Response(data, {
        status: response.status || 400,
      });
    }

    return data;
  }

  return null;
}

export async function loader({ request, params }: LoaderArgs) {
  const { accessToken } = await requireUserSession(request);
  const postId = params.postId;

  const fetcher = await fetchFromApi(request);

  const response = await fetcher(`/post/${postId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Response(null, {
      status: response.status || 500,
    });
  }

  const responseData = (await response.json()) as ResponseBody<[Post]>;

  const post = responseData.data[0];

  return json({
    post,
  });
}

export default function PostPage() {
  const { post } = useLoaderData<typeof loader>();
  const submission = useNavigation();
  const commentFormRef = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    if (submission.formData) {
      commentFormRef.current?.reset();
    }
  }, [submission.formData]);

  const isAddingComment = Boolean(submission.formData);

  return (
    <div>
      <Button component={Link} to="/posts" variant="subtle">
        <IconArrowLeft />
        All posts
      </Button>

      <Box mt={32}>
        <Anchor component={Link} to={`/profile/${post.id_user}`} color="blue">
          <Flex align="center" gap={16}>
            <Avatar size={64} color="cyan" radius="xl">
              {post.user.username.slice(0, 2).toUpperCase()}
            </Avatar>
            <Text fz="xl" weight="bold">
              {post.user.username}
            </Text>
          </Flex>
        </Anchor>
      </Box>

      <Box mt={64} mx="auto" maw={720}>
        <Title>{post.title}</Title>

        <Box mt={32}>{post.content}</Box>
      </Box>

      <Box mt={120} mx="auto" maw={720}>
        <Title mb={32} order={2}>
          Comments
        </Title>

        <Flex direction="column" gap={32}>
          {/* TODO: Improve types */}
          {post.comments.map((comment) => (
            <Comment
              key={comment.id_comment}
              body={comment.content}
              author={{ name: comment.user.username }}
              postedAt={comment.createdAt}
            />
          ))}
        </Flex>

        <Box mt={32}>
          <Form method="post" ref={commentFormRef}>
            <Textarea
              name="comment"
              placeholder="Your comment"
              label="Your comment"
            />
            <Button
              loading={isAddingComment}
              mt={16}
              type="submit"
              name="intent"
              value="comment"
            >
              Add comment
            </Button>
          </Form>
        </Box>
      </Box>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return <div>Ups</div>;
}
