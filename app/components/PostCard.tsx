import {
  createStyles,
  Card,
  Image,
  ActionIcon,
  Group,
  Text,
  Avatar,
  Badge,
  rem,
} from "@mantine/core";
import { IconHeart, IconShare } from "@tabler/icons-react";
import type { Post } from "~/api";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  title: {},

  tags: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: theme.spacing.xs,
  },

  footer: {
    padding: `${theme.spacing.xs} ${theme.spacing.lg}`,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
}));

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const { classes, theme } = useStyles();

  return (
    <Card withBorder padding="lg" radius="md" className={classes.card}>
      <Card.Section mb="sm">
        <Image src={post.image} alt="" height={180} />
      </Card.Section>

      <div className={classes.tags}>
        {post.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>

      <Text fw={700} className={classes.title} mt="xs">
        {post.title}
      </Text>

      <Group mt="lg">
        <Avatar src={post.author.image} radius="sm" />
        <div>
          <Text fw={500}>{post.author.login}</Text>
        </div>
      </Group>

      <Card.Section className={classes.footer}>
        <Group position="apart">
          <Text fz="xs" c="dimmed">
            {post.likes.length} people liked this
          </Text>
          <Group spacing={0}>
            <ActionIcon>
              <IconHeart
                size="1.2rem"
                color={theme.colors.red[6]}
                stroke={1.5}
              />
            </ActionIcon>
            <ActionIcon>
              <IconShare
                size="1.2rem"
                color={theme.colors.blue[6]}
                stroke={1.5}
              />
            </ActionIcon>
          </Group>
        </Group>
      </Card.Section>
    </Card>
  );
}
