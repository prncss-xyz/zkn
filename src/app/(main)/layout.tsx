import { Box } from "@/components/box";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={20}
      as="main"
      width="100%"
    >
      {children}
    </Box>
  );
}
