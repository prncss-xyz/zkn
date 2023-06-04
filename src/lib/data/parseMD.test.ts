import { FileEntry, mergeDefaults } from "./scanFiles";
import { analyzeMD } from "./parseMD";

const entry: FileEntry = {
  id: "",
  mtime: 0,
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
      { mtime: 1, id: "file.md" },
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
            "context": "pre<a class=\\"internal\\" href=\\"link.md\\"></a>post",
            "rank": 0,
            "targetId": "link.md",
          },
          {
            "context": "PRE<a class=\\"internal\\" href=\\"LINK.md\\"></a>POST",
            "rank": 1,
            "targetId": "LINK.md",
          },
        ],
        "tags": [],
      }
    `);
  });
});
