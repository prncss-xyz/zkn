"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Box } from "@/components/box";
import { NavLink } from "@/components/navLink";
import { setAsset } from "../asset/query";

function InputAsset({ asset }: { asset: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams as any);
  setAsset(params, asset);
  const query = params.toString();
  return <NavLink href={{ pathname, query }}>{asset || "all"}</NavLink>;
}

export function InputAssets({ enabledAssets }: { enabledAssets: string[] }) {
  return (
    <Box
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      alignItems="center"
      gap={10}
    >
      <Box fontWeight="bold">Assets</Box>
      {enabledAssets.map((asset) => (
        <InputAsset key={asset} asset={asset} />
      ))}
    </Box>
  );
}

export function InputGallery({ enabledAssets }: { enabledAssets: string[] }) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams as any);
  setAsset(params, "image");
  const query = params.toString();
  if (!enabledAssets.includes("image")) return null;
  return <NavLink href={{ pathname: "/gallery", query }}>Gallery</NavLink>;
}
