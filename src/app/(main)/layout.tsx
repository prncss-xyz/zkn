import { Box } from "../components/box";
import { Nav } from "./nav";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box display="flex" flexDirection="column" gap={{ s: 10, md: 20 }}>
      <Nav />
      <Box as="main">{children}</Box>
    </Box>
  );
}
