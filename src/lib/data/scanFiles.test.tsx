import { vi } from "vitest";
import mock from "mock-fs";
import prisma from "./__mocks__/prisma";
import { scanFiles } from "./scanFiles";

vi.mock("./prisma");

describe("scanFiles", () => {
  beforeEach(() => {
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
  it("description", async () => {
    prisma.entry.findMany.mockResolvedValue([
      sampleEntry(1, 1),
      sampleEntry(2, 1),
      sampleEntry(4, 1),
      sampleEntry(5, 1),
    ]);
    await scanFiles("./notes");
    expect(prisma.entry.create).toHaveBeenCalledWith(sampleUpdate(2));
    expect(prisma.entry.create).toHaveBeenCalledWith(sampleUpdate(3));
    expect(prisma.entry.create).toHaveBeenCalledTimes(3);
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
  return {
    data: {
      asset: null,
      id: i + ".md",
      links: {
        create: [],
      },
      mtime: i,
      tags: {
        create: [],
      },
      title: "title " + i,
      wordCount: 2,
    },
  };
}

function sampleDelete(i: number) {
  return { where: { id: i + ".md" } };
}
