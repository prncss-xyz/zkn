import { Box } from "../box";
import { IProcessNotes } from "./processNotes";
import { InputScalars } from "@/fields/scalars/navigator";
import { InputTags } from "@/fields/tags/navigator";
import { InputVirtualTags } from "@/fields/virtualTags/navigator";
import { InputDirs } from "@/fields/dir/navigator";
import { InputKanban } from "@/fields/kanban/navigator";
import { Clear } from "./clear";
import { InputNotes } from "@/fields/notes/navigator";
import { InputAll } from "@/fields/all/navigator";
import { InputAssets, InputGallery } from "@/fields/asset/navigator";

export async function Navigator({ processed }: { processed: IProcessNotes }) {
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
          <InputKanban enabledKanbans={processed.kanbans} />
          <InputGallery enabledAssets={processed.asset} />
          <InputAll />
        </Box>
        <Box display="flex" flexDirection="column" gap={5}>
          <Clear />
          <InputVirtualTags enabledVirtualTags={processed.virtualTags} />
          <InputTags enabledTags={processed.tags} />
          <InputDirs enabledDirs={processed.dirs} />
          <InputAssets enabledAssets={processed.asset} />
          <InputScalars enabledScalars={processed.scalars} />
        </Box>
        <Box borderColor="foreground2" borderWidth={1} borderStyle="top" />
      </Box>
    </Box>
  );
}
