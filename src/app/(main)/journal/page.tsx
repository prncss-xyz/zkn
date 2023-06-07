import { Box } from "@/app/components/box";
import { setup } from "@/lib/data/scanFiles";

export default async function Page() {
  await setup();
  return <Box fontWeight="bold">TODO</Box>;
}
