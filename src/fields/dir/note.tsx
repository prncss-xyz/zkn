import { NoteEntry } from "@/app/(main)/note/[...path]/page";
import { Box } from "@/components/box";
import { basename } from "node:path";
import { setDir } from "./query";
import { NavLink } from "@/components/navLink";

const sep = "/";

export function NoteDir({ entry }: { entry: NoteEntry }) {
  const id = entry.id;
  const segments = id.split(sep).slice(0, -1);
  const params = new URLSearchParams();

  return (
    <Box display="flex" flexDirection="row" alignItems="center" gap={10}>
      {segments.map((segment, i) => {
        setDir(params, segments.slice(0, i + 1).join(sep));
        const query = params.toString();
        return (
          <>
            <NavLink
              key={i}
              fontFamily="monospace"
              href={{
                pathname: "/notes",
                query,
              }}
            >
              {segment}
            </NavLink>
            <Box>{sep}</Box>
          </>
        );
      })}
      <Box fontFamily="monospace">{basename(id)}</Box>
    </Box>
  );
}
