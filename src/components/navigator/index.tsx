import { Box } from "../box";
import { NotesEntry } from "@/app/(main)/(views)/search";
import { processNotes } from "./processNotes";
import { InputScalars } from "@/fields/scalars/navigator";
import { InputTags } from "@/fields/tags/navigator";
import { InputVirtualTags } from "@/fields/virtualTags/navigator";
import { InputDirs } from "@/fields/dir/navigator";
import { getNotebookConfig } from "@/server/data/notebookConfig";
import { InputKanban } from "@/fields/kanban/navigator";
import { Clear } from "./clear";
import { InputNotes } from "@/fields/notes/navigator";

export async function Navigator({ entries }: { entries: NotesEntry[] }) {
  const config = await getNotebookConfig();
  const enabled = processNotes(config, entries);
  return (
    <Box
      px={{ s: 5, md: 0 }}
      width="screenMaxWidth"
      display="flex"
      flexDirection="column"
    >
      <Box display="flex" flexDirection="column" gap={10}>
        <Box display="flex" flexDirection="row" gap={10}>
          <InputNotes />
          <InputKanban enabledKanbans={enabled.kanbans} />
        </Box>
        <Box display="flex" flexDirection="column" gap={5}>
          <Clear />
          <InputVirtualTags enabledVirtualTags={enabled.virtualTags} />
          <InputTags enabledTags={enabled.tags} />
          <InputDirs enabledDirs={enabled.dirs} />
          <InputScalars enabledScalars={enabled.scalars} />
        </Box>
        <Box borderColor="foreground2" borderWidth={1} borderStyle="top" />
      </Box>
    </Box>
  );
}
