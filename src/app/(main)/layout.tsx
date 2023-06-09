import { Box } from "../components/box";
import { Nav } from "./nav";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Box
        width="screenMaxWidth"
        display="flex"
        flexDirection="column"
        gap={20}
      >
        <Nav />
        <Box as="main">{children}</Box>
      </Box>
    </>
  );
}
