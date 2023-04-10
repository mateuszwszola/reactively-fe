import { Title } from "@mantine/core";
import { useParams } from "@remix-run/react";

export default function PostPage() {
  const { postId } = useParams();

  return (
    <div>
      <Title>Post {postId}</Title>
    </div>
  );
}
