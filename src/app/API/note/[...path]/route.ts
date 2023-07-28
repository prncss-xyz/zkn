import { setup } from "@/server/data/scanFiles";
import { getProcessor } from "@/server/data/processMD";
import { getContent } from "@/app/(main)/note/[...path]/contents";
import rehypeStringify from "rehype-stringify";
import rehypeFormat from "rehype-format";
import rehypeDocument from "rehype-document";
import prisma from "@/server/data/prisma";
import { visit } from "unist-util-visit";
import { Root } from "hast";
import { normalizePath } from "@/utils/path";
import { getIdToTitle } from "@/server/actions";

export async function GET(
  _: Request,
  { params: { path } }: { params: { path: string[] } },
) {
  await setup();
  try {
    // next will take care of `API/asset/../unauthorized.png`, no need to manually block
    const id = path.join("/");
    const content = await getContent(id);
    if (!content) throw new Error("File not found");
    const res = await prisma.entry.findUnique({
      where: { id },
      select: { title: true, links: { select: { targetId: true } } },
    });
    if (!res) throw new Error("no data");
    const title = res.title || undefined;
    const idToTitle = await getIdToTitle(
      res.links.map(({ targetId }) => targetId),
    );
    const processor = getProcessor({ idToTitle, live: false })
      .use(rehypeDocument, { title })
      .use(rehypeStringify)
      .use(rehypeFormat);
    const processed = await processor.process(content);
    const body = String(processed);
    const response = new Response(body);
    response.headers.set("content-type", "text/html");
    return response;
  } catch (e) {
    return new Response("File not found", { status: 404 });
  }
}
