import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function resetDB() {
  await prisma.$transaction([
    prisma.event.deleteMany(),
    prisma.link.deleteMany(),
    prisma.tagsOnEntries.deleteMany(),
    prisma.entry.deleteMany(),
  ]);
}
