import { Box } from "@/app/components/box";

export default function Page() {
  return (
    <Box width="screenMaxWidth">
      <Box mb={10} fontWeight="bold" as="h1">
        Access denied
      </Box>
      <Box>App can only be accessed from local host.</Box>
    </Box>
  );
}
