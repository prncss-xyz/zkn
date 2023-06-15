"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Box } from "../box";
import { dest, searchToQuery } from "@/app/utils/search";

function useHrefObj() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const res: { [key: string]: string } = {};
  for (const [key, value] of searchParams.entries()) {
    res[key] = value;
  }
  return { pathname, query: searchToQuery(res) };
}

type INumberField = "wordcount";
const numberFieldToLabel = {
  wordcount: "Wordcount",
};

export function InputNumberField({ field }: { field: INumberField }) {
  return (
    <Box display="flex" flexDirection="row" gap={10}>
      <Box fontWeight="bold">{numberFieldToLabel[field]}</Box>
      <InputNumberBound bound="gte" field={field} />
      <InputNumberBound bound="lte" field={field} />
    </Box>
  );
}

function InputNumberBound({
  bound,
  field,
}: {
  bound: "lte" | "gte";
  field: INumberField;
}) {
  const router = useRouter();
  const hrefObj = useHrefObj();
  const push = (e: any) => {
    const value = Number(e.currentTarget.value);
    router.push(
      dest(hrefObj, {
        query: {
          [field]: { [bound]: isNaN(value) ? undefined : value },
        },
      })
    );
  };
  return (
    <Box display="flex" flexDirection="row" gap={5}>
      <Box fontWeight="bold">{bound === "gte" ? "from" : "to"}</Box>
      <Box
        as="input"
        width="navInputWidth"
        backgroundColor="foreground2"
        defaultValue={hrefObj.query[field][bound]}
        onKeyDown={(e: any) => {
          if (e.key !== "Enter") return;
          push(e);
        }}
        onBlur={push}
      />
    </Box>
  );
}
