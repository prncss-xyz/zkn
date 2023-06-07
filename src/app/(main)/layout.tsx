import { Box } from "../components/box";
import { Nav } from "./nav";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box display="flex" flexDirection="column" gap={10}>
      <Nav />
      {/* hr element do not align perfectly with other components */}
      <Box borderColor="foreground2" borderWidth={1} borderStyle="top" />
      <Box as="main">{children}</Box>
    </Box>
  );
}
