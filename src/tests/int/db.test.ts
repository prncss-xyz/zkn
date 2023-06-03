import prisma from "@/lib/data/prisma";
import { scanFiles } from "@/lib/data/scanFiles";
import { writeFile } from "fs/promises";
import mock from "mock-fs";

const file1 = `---
tags:
  - a
  - b
event: 2022-10-10
---

# title 1

- [[file2]]
- [[file3]]

`;

const file2 = `---
tags:
  - b
  - c
event: 2022-10-11
---

# title 2

- [[file3]]
- [[file4]]

`;

const file3 = `---
tags:
  - b
  - c
---

- [[file3]]
- [[file4]]

`;

describe("db", () => {
  beforeEach(() => {
    mock({
      notes: { "1.md": mock.file({ content: file1, mtime: new Date(1) }) },
    });
  });
  afterEach(() => {
    mock.restore();
  });
  it("should build an index", async () => {
    await scanFiles("./notes");
    const result = await prisma.entry.findUnique({
      where: { id: "1.md" },
      select: {
        asset: true,
        mtime: true,
        title: true,
        wordCount: true,
        event: {
          select: {
            day: true,
            start: true,
            end: true,
          },
        },
        links: {
          select: {
            rank: true,
            sourceId: true,
            targetId: true,
            context: true,
          },
        },
        tags: true,
      },
    });
    const eventDate = new Date("2022-10-10");
    expect(result).toMatchObject({
      mtime: 1,
      title: "title 1",
      asset: null,
      wordCount: 4,
      event: {
        day: false,
        start: eventDate,
        end: eventDate,
      },
      links: [
        {
          rank: 0,
          sourceId: "1.md",
          targetId: "file2.md",
          context: '<a class="internal" href="file2.md"></a>',
        },
        {
          rank: 1,
          sourceId: "1.md",
          targetId: "file3.md",
          context: '<a class="internal" href="file3.md"></a>',
        },
      ],
    });
    const tags = result?.tags.map((tag) => tag.tagId).sort();
    expect(tags).toEqual(["a", "b"]);

    await writeFile("./notes/1.md", file2);
    await scanFiles("./notes");
    const result2 = await prisma.entry.findUnique({
      where: { id: "1.md" },
      select: { title: true, tags: true, event: true },
    });
    const eventDate2 = new Date("2022-10-11");
    expect(result2).toMatchObject({
      title: "title 2",
      event: {
        day: false,
        start: eventDate2,
        end: eventDate2,
      },
    });
    const tags2 = result2?.tags.map((tag) => tag.tagId).sort();
    expect(tags2).toEqual(["b", "c"]);

    await writeFile("./notes/1.md", file3);
    await scanFiles("./notes");
    const result3 = await prisma.entry.findUnique({
      where: { id: "1.md" },
      select: { title: true, event: true },
    });
    expect(result3).toBeTruthy();
    expect(result3?.event).toBeFalsy();
    expect(result3?.title).toBeFalsy();
  });
});
