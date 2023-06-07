import { MenuBar, MenuLink } from "./menuBar";

export function Nav() {
  return (
    <MenuBar>
      <MenuLink href="/notes">Notes</MenuLink>
      <MenuLink href="/kanban">Kanban</MenuLink>
      <MenuLink href="/journal">Journal</MenuLink>
    </MenuBar>
  );
}
