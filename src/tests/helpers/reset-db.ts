import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function resetDB() {
  await prisma.$transaction([
    prisma.entry.deleteMany(),
    prisma.tag.deleteMany(),
    prisma.tagsOnEntries.deleteMany(),
    prisma.event.deleteMany(),
    prisma.link.deleteMany(),
  ]);
}
