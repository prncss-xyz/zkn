import { vi } from "vitest";
import mock from "mock-fs";
import prisma from "./__mocks__/prisma";
import { scanFiles } from "./scanFiles";

describe("scanFiles", () => {
  beforeEach(() => {
    vi.mock("./prisma");
    mock({
      notes: {
        "1.md": sampleFile(1),
        "2.md": sampleFile(2),
        "3.md": sampleFile(3),
        "5.md": mock.file({ content: "---\n!!\n---\n", mtime: new Date(2) }), // invalid file
        "6.md": mock.file({ content: "---\n!!\n---\n" }), // invalid file
      },
    });
  });
  afterEach(() => {
    mock.restore();
  });
  it("should sync files info", async () => {
    prisma.entry.findMany.mockResolvedValue([
      sampleEntry(1, 1),
      sampleEntry(2, 1),
      sampleEntry(4, 1),
      sampleEntry(5, 1),
    ]);
    await scanFiles("./notes");
    expect(prisma.entry.upsert).toHaveBeenCalledWith(sampleUpdate(2));
    expect(prisma.entry.upsert).toHaveBeenCalledWith(sampleUpdate(3));
    expect(prisma.entry.upsert).toHaveBeenCalledTimes(3);
    expect(prisma.entry.delete).toHaveBeenCalledWith(sampleDelete(5));
    expect(prisma.entry.delete).toHaveBeenCalledWith(sampleDelete(4));
    expect(prisma.entry.delete).toHaveBeenCalledTimes(2);
  });
});

function sampleFile(i: number) {
  return mock.file({
    content: "# title " + i,
    mtime: new Date(i),
  });
}

function sampleEntry(i: number, mtime: number) {
  return { id: i + ".md", mtime } as any;
}

function sampleUpdate(i: number) {
  const id = i + ".md";
  const op = {
    id,
    links: {
      create: [],
    },
    mtime: i,
    tags: {
      create: [],
    },
    title: "title " + i,
    wordcount: 2,
  };
  return {
    create: op,
    update: op,
    where: {
      id,
    },
  };
}

function sampleDelete(i: number) {
  return { where: { id: i + ".md" } };
}
