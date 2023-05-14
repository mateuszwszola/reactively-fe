import {
  Avatar,
  Badge,
  Card,
  createStyles,
  Group,
  Image,
  rem,
  Text,
} from "@mantine/core";
import { FavoriteButton } from "~/components/FavoriteButton";
import type { Post } from "~/routes/posts._index/route";

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
  post: Post & {
    isFavorite: boolean;
  };
}

export default function PostCard({ post }: PostCardProps) {
  const { classes } = useStyles();

  return (
    <Card withBorder padding="lg" radius="md" className={classes.card}>
      <Card.Section mb="sm">
        {/* TODO: Replace random image with image from API */}
        <Image
          src="https://source.unsplash.com/random/?sport"
          alt="Some random image"
          height={180}
        />
      </Card.Section>

      <div className={classes.tags}>
        {post.tags.map((tag) => (
          <Badge key={tag.id_post_tag}>{tag.id_post_tag}</Badge>
        ))}
      </div>

      <Text fw={700} className={classes.title} mt="xs">
        {post.title}
      </Text>

      <Group mt="lg">
        {/* TODO: Replace random avatar image with image from API */}
        <Avatar src="https://source.unsplash.com/random/?avatar" radius="sm" />
        <div>
          <Text fw={500}>{post.user.username}</Text>
        </div>
      </Group>

      <Card.Section className={classes.footer}>
        <Group position="apart">
          <Text fz="xs" c="dimmed">
            {post.likes.length} people liked this
          </Text>
          <FavoriteButton postId={post.id_post} isFavorite={post.isFavorite} />
        </Group>
      </Card.Section>
    </Card>
  );
}
