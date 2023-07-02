import { Box } from "@/components/box";
import { setup } from "@/server/data/scanFiles";

export default async function Page() {
  await setup();
  return (
    <Box px={{ xs: 5, md: 0 }} fontWeight="bold">
      TODO
    </Box>
  );
}
