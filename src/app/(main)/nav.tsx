import { Box } from "../components/box";
import { MenuBar, MenuLink } from "./menuBar";

export function Nav() {
  return (
    <Box
      width="screenMaxWidth"
      display="flex"
      flexDirection="column"
      gap={10}
    >
      <MenuBar>
        <MenuLink href="/notes">Notes</MenuLink>
        <MenuLink href="/kanban">Kanban</MenuLink>
        {/* <MenuLink href="/journal">Journal</MenuLink> */}
      </MenuBar>
      {/* hr element do not align perfectly with other components */}
      <Box borderColor="foreground2" borderWidth={1} borderStyle="top" />
    </Box>
  );
}
