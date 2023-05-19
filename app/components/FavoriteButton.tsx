import { useFetcher } from "@remix-run/react";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { ActionIcon, useMantineTheme } from "@mantine/core";

interface FavoriteButtonProps {
  postId: number;
  isFavorite: boolean;
}

export function FavoriteButton({ postId, isFavorite }: FavoriteButtonProps) {
  const theme = useMantineTheme();

  const fetcher = useFetcher();

  let optimisticIsFavorite = isFavorite;

  if (fetcher.formData) {
    optimisticIsFavorite = fetcher.formData.get("isFavorite") === "yes";
  }

  return (
    <fetcher.Form method="post" action={`/posts/${postId}`}>
      <ActionIcon
        type="submit"
        variant="subtle"
        onClick={(event) => {
          event.stopPropagation();
        }}
        name="intent"
        value="favorite"
      >
        {optimisticIsFavorite ? (
          <IconHeartFilled
            size="1.2rem"
            color={theme.colors.red[6]}
            stroke={1.5}
          />
        ) : (
          <IconHeart size="1.2rem" color={theme.colors.red[6]} stroke={1.5} />
        )}
      </ActionIcon>
    </fetcher.Form>
  );
}
