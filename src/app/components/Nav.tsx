import { MenuBar, MenuLink } from "./MenuBar";

export function Nav() {
  return (
    <MenuBar>
      <MenuLink href="/notes">Notes</MenuLink>
      <MenuLink href="/kanban">Kanban</MenuLink>
    </MenuBar>
  );
}
