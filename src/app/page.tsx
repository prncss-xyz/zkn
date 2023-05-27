import { getEntries } from "@/lib/data/actions";
import { Box } from "./components/box";
import Link from "next/link";
import path from "path";

function stem(pathname: string) {
  const ext = path.extname(pathname);
  return path.basename(pathname, ext);
}

export default async function Page() {
  const entries = (await getEntries()) as any[];
  return (
    <Box>
      {entries.map((entry) => (
        <Box key={entry.id}>
          <Link href={`note/${stem(entry.id)}`}>
            {entry.title ? entry.title : <i>{entry.id}</i>}
          </Link>
        </Box>
      ))}
    </Box>
  );
}
