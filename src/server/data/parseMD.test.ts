import { FileEntry, mergeDefaults } from "./scanFiles";
import { analyzeMD } from "./parseMD";

const entry: FileEntry = {
  id: "",
  mtime: new Date(0),
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
          wordcount: 2,
        },
        tags: ["a"],
      })
    );
  });
  it("should parse links", async () => {
    const res = await analyzeMD(
      { mtime: new Date(1), id: "file.md" },
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
          "id": "file.md",
          "mtime": 1970-01-01T00:00:00.001Z,
          "title": null,
          "wordcount": 6,
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
