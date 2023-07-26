import { setup } from "@/server/data/scanFiles";
import { notebookDir } from "@/server/notebookDir";
import { readFile, stat } from "node:fs/promises";
import { extname, resolve } from "node:path";
import mime from "mime";

export async function GET(
  _: Request,
  { params: { asset } }: { params: { asset: string[] } }
) {
  await setup();
  // next will take care of `API/asset/../unauthorized.png`, no need to manually block
  const filePath = resolve(notebookDir, ...asset);
  const ext = extname(filePath).slice(1);
  const contentType = mime.getType(ext);
  try {
    const { size } = await stat(filePath);
    const body = await readFile(filePath);
    const response = new Response(body);
    if (contentType) response.headers.set("content-type", contentType);
    response.headers.set("content-length", String(size));
    return response;
  } catch (e) {
    return new Response("File not found", { status: 404 });
  }
}
