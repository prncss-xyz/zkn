export interface IEntriesFromSearch {
  dir?: string;
  tags?: string;
}

export function whereFromSearch({ dir, tags }: IEntriesFromSearch) {
  const idQuery = dir ? { startsWith: dir + "/" } : undefined;
  const tagsQuery = tags
    ? tags.split(" ").map((tagId) => ({
        tags: {
          some: {
            tagId,
          },
        },
      }))
    : undefined;
  return {
    id: idQuery,
    AND: tagsQuery,
  };
}
