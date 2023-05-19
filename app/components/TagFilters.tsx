import { Button, Chip, Group } from "@mantine/core";
import { Form, useNavigation } from "@remix-run/react";
import * as React from "react";
import isEqual from "lodash/isEqual";

interface TagFiltersProps {
  tags: Array<{ id_tag: number; name: string }>;
  userTags: Array<{ tag: { id_tag: number; name: string } }>;
}

export function TagFilters({ tags, userTags }: TagFiltersProps) {
  const submission = useNavigation();

  const [tagsValue, setTagsValue] = React.useState(
    userTags.map((t) => String(t.tag.id_tag))
  );

  const isBusy = Boolean(submission.formData);

  const changed = !isEqual(
    tagsValue,
    userTags.map((t) => String(t.tag.id_tag))
  );

  return (
    <Form method="POST">
      <Chip.Group multiple value={tagsValue} onChange={setTagsValue}>
        <Group position="center">
          {tags.map((tag) => (
            <Chip key={tag.id_tag} value={String(tag.id_tag)} name="tags">
              {tag.name}
            </Chip>
          ))}
        </Group>
      </Chip.Group>
      {changed && (
        <Button type="submit" variant="outline" loading={isBusy}>
          Save tags selection
        </Button>
      )}
    </Form>
  );
}
