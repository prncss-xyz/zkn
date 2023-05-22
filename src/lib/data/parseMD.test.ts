import { FileEntry, mergeDefaults } from "./scanFiles";
import { analyzeMD } from "./parseMD";

const entry: FileEntry = {
  id: "",
  mtime: BigInt(0),
};

describe("analyzeMD", () => {
  it("should parse basic values", async () => {
    const res = await analyzeMD(
      entry,
      `---
tags: a
---

# titre

test`
    );
    expect(res).toEqual(
      mergeDefaults({
        entry: {
          ...entry,
          title: "titre",
          wordCount: 2,
        },
        tags: ["a"],
      })
    );
  });
  it("should parse links", async () => {
    const res = await analyzeMD(
      { mtime: BigInt(1), id: "file.md" },
      `---
---
test

pre[[link]]post

PRE[[LINK]]POST

test`
    );
    expect(res).toMatchInlineSnapshot(`
      {
        "entry": {
          "asset": null,
          "id": "file.md",
          "mtime": 1,
          "title": null,
          "wordCount": 6,
        },
        "event": null,
        "links": [
          {
            "context": "<div class=\\"backlink\\">pre<a class=\\"internal\\" href=\\"link.md\\"></a>post</div>",
            "rank": 0,
            "sourceId": "file.md",
            "targetId": "link.md",
          },
          {
            "context": "<div class=\\"backlink\\">PRE<a class=\\"internal\\" href=\\"LINK.md\\"></a>POST</div>",
            "rank": 1,
            "sourceId": "file.md",
            "targetId": "LINK.md",
          },
        ],
        "tags": [],
      }
    `);
  });
});
