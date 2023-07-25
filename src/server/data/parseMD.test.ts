import { FileEntry } from "./scanFiles";
import { parseMD } from "./parseMD";

const entry: FileEntry = {
  id: "",
  mtime: new Date(0),
};

describe("analyzeMD", () => {
  it("should parse basic values", async () => {
    const res = await parseMD(
      entry,
      `---
tags: a
---

# titre

test`
    );
    expect(res).toMatchObject({
      data: {
        ...entry,
        title: "titre",
        wordcount: 2,
      },
      relations: {
        tags: ["a"],
      },
    });
  });
  it("should parse links", async () => {
    const res = await parseMD(
      { mtime: new Date(1), id: "file.md" },
      `---
---
test

pre[[link]]post

PRE[[LINK]]POST

test`
    );
    expect(res).toMatchObject({
      data: {
        id: "file.md",
        wordcount: 6,
      },
      relations: {
        links: [
          {
            context: `pre<a class="internal" href="link.md"></a>post`,
            rank: 0,
            targetId: "link.md",
          },
          {
            context: `PRE<a class="internal" href="LINK.md"></a>POST`,
            rank: 1,
            targetId: "LINK.md",
          },
        ],
      },
    });
  });
});
