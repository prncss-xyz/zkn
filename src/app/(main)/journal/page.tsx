import { Box } from "@/app/components/box";
import { setup } from "@/lib/data/scanFiles";

export default async function Page() {
  await setup();
  return (
    <Box px={{ xs: 5, md: 0 }} fontWeight="bold">
      TODO
    </Box>
  );
}
