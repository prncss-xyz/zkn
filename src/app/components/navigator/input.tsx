"use client";

import { TbChevronDown, TbChevronUp } from "react-icons/tb";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Box } from "../box";
import { ReactNode, useCallback, useState } from "react";
import { checkbox, hideScrollbar } from "./input.css";

interface IState {
  lge: string;
  gte: string;
  some: boolean;
  sort: string;
}

export function InputDateField({
  label,
  field,
  date,
}: {
  label: string;
  field: string;
  date?: boolean;
}) {
  const key = useSearchParams().toString();
  return <InputDateField_ key={key} label={label} field={field} date={date} />;
}

type IStateAction = {
  type: "TOGGLE_SOME";
};

function never(p: never) {}

function routeStateReducer(state: IState, action: IStateAction) {
  switch (action.type) {
    case "TOGGLE_SOME":
      break;
    default:
      // this statically ensures all possible cases are covered
      never(action.type);
  }
}

function useRouteState(field: string) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const sort = searchParams.get("sort") || "";
  const [state, setState] = useState<IState>({
    lge: searchParams.get(field + "_lge") || "",
    gte: searchParams.get(field + "_gte") || "",
    some: !!(
      searchParams.get(field + "_lge") ||
      searchParams.get(field + "_gte") ||
      searchParams.get(field) ||
      sort === field + "_asc" ||
      sort === field + "_desc"
    ),
    sort,
  });
  const pushState = (state: IState) => {
    setState(state);
    const params = new URLSearchParams(searchParams as any);
    if (state.lge || state.gte) params.delete(field);
    else if (state.some) params.set(field, "some");
    if (state.some) {
      if (state.lge || state.gte) params.delete(field);
      if (state.lge) params.set(field + "_lge", state.lge);
      if (state.gte) params.set(field + "_gte", state.gte);
    } else {
      params.delete(field + "_lge");
      params.delete(field + "_gte");
      params.delete(field);
    }
    if (state.sort === "") params.delete("sort");
    else params.set("sort", state.sort);
    const queryString = params.toString();
    const url = pathname + queryString ? "?" + queryString : "";
    router.push(url);
  };
  return [state, setState, pushState] as const;
}

function InputDateField_({
  label,
  field,
  date,
}: {
  label: string;
  field: string;
  date?: boolean;
}) {
  const toNum = (str: string) => {
    if (date) return new Date(str).getTime();
    return Number(str);
  };
  const [state, setState, pushState] = useRouteState(field);

  const pushToggleSome = () => {
    const sort =
      state.some &&
      (state.sort === field + "_asc" || state.sort === field + "_desc")
        ? ""
        : state.sort;
    const state_ = { ...state, some: !state.some, lge: "", gte: "", sort };
    pushState(state_);
  };
  const pushLge = () => {
    const state_ =
      toNum(state.gte) > toNum(state.lge) ? { ...state, gte: "" } : state;
    pushState(state_);
  };
  const pushGte = () => {
    const state_ =
      toNum(state.gte) > toNum(state.lge) ? { ...state, lge: "" } : state;
    pushState(state_);
  };
  return (
    <Box
      display="flex"
      flexDirection="row"
      gap={20}
      overflowX="scroll"
      className={hideScrollbar}
    >
      <Box fontWeight="bold" width="navLabelWidth" flexShrink={0}>
        {label}
      </Box>

      <Box display="flex" flexDirection="row" gap={10}>
        <SelectSort name={`${field}_asc`}>
          <TbChevronUp />
        </SelectSort>
        <SelectSort name={`${field}_desc`}>
          <TbChevronDown />
        </SelectSort>
      </Box>
      <Box
        width="navCheckboxWidth"
        backgroundColor="foreground1"
        color="text"
        as="input"
        type="checkbox"
        checked={state.some}
        onChange={pushToggleSome}
        className={checkbox}
      />
      <Box display="flex" flexDirection="row" gap={10}>
        <Box as="label">From</Box>
        <Box
          as="input"
          width="navInputWidth"
          color={state.gte && isNaN(toNum(state.gte)) ? "error" : "text"}
          backgroundColor="foreground2"
          textAlign="center"
          value={state.gte}
          onChange={(e: any) =>
            setState({ ...state, some: true, gte: e.currentTarget.value })
          }
          onKeyDown={(e: any) => {
            if (e.key !== "Enter") return;
            pushGte();
          }}
          onBlur={pushGte}
        />
      </Box>
      <Box display="flex" flexDirection="row" gap={10}>
        <Box as="label">To</Box>
        <Box
          as="input"
          width="navInputWidth"
          color={state.lge && isNaN(toNum(state.lge)) ? "error" : "text"}
          backgroundColor="foreground2"
          textAlign="center"
          value={state.lge}
          onChange={(e: any) =>
            setState({ ...state, some: true, lge: e.currentTarget.value })
          }
          onKeyDown={(e: any) => {
            if (e.key !== "Enter") return;
            pushLge();
          }}
          onBlur={pushLge}
        />
      </Box>
    </Box>
  );
}

function usePushParams(ajust: (p: URLSearchParams) => void) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pushParams = useCallback(() => {
    const params = new URLSearchParams(searchParams as any);
    ajust(params);
    const queryString = params.toString();
    const url = pathname + queryString ? "?" + queryString : "";
    router.push(url);
  }, [ajust, pathname, router, searchParams]);
  return pushParams;
}

function SelectSort({ name, children }: { name: string; children: ReactNode }) {
  const searchParams = useSearchParams();
  const ajust = useCallback(
    (params: URLSearchParams) => params.set("sort", name),
    [name]
  );
  const onClick = usePushParams(ajust);
  const color = searchParams.get("sort") === name ? "active" : "link";
  return (
    <Box as="button" color={color} onClick={onClick}>
      {children}
    </Box>
  );
}
