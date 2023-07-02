"use client";

import { TbChevronDown, TbChevronUp } from "react-icons/tb";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Box } from "../../box";
import {
  ReactNode,
  useCallback,
  useContext,
  useState,
  createContext,
} from "react";
import { checkbox, hideScrollbar } from "./index.css";
import { Bound, IState, IAction, reducer, scalarOpts } from "./reducer";
import { paramsToQuery, queryToParams } from "./query";

export function InputScalars({ enabledScalars }: { enabledScalars: string[] }) {
  return (
    <Provider>
      <Box
        overflowX="scroll"
        display="flex"
        flexDirection="column"
        gap={5}
        className={hideScrollbar}
      >
        {enabledScalars.map((scalar) => (
          <InputScalar key={scalar} scalar={scalar} />
        ))}
      </Box>
    </Provider>
  );
}

function usePushQueryString() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams as any);
  const query = paramsToQuery(params);
  const push = useCallback(
    (state: IState) => {
      const params = new URLSearchParams(searchParams as any);
      const url = pathname + queryToParams(params, state);
      router.push(url);
    },
    [pathname, router, searchParams]
  );
  return [query, push] as const;
}

const Context = createContext<ReturnType<typeof useScalarState> | null>(null);

function useScalarState() {
  const [init, push] = usePushQueryString();
  const [state, setState] = useState(init);
  const dispatch = useCallback(
    (action: IAction) => {
      const [stateOut, willPush] = reducer(state, action);
      setState(stateOut);
      if (willPush) push(stateOut);
    },
    [push, state]
  );
  return [state, dispatch] as const;
}

function Provider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useScalarState();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams as any);
  const key = queryToParams(params, paramsToQuery(params));
  return (
    <Context.Provider key={key} value={[state, dispatch] as const}>
      {children}
    </Context.Provider>
  );
}

function useRouteState() {
  const value = useContext(Context);
  if (!value) throw new Error("useRouteState should be used with Context");
  return value;
}

function InputScalar({ scalar }: { scalar: string }) {
  const [state, dispatch] = useRouteState();
  const { label } = scalarOpts[scalar];
  return (
    <Box display="flex" flexDirection="row" gap={20}>
      <Box fontWeight="bold" width="navLabelWidth" flexShrink={0}>
        {label}
      </Box>
      <Box display="flex" flexDirection="row" gap={10}>
        <SelectSort scalar={scalar} asc={true} />
        <SelectSort scalar={scalar} asc={false} />
      </Box>
      <Box
        width="navCheckboxWidth"
        backgroundColor="foreground1"
        color="text"
        as="input"
        type="checkbox"
        checked={state.scalars[scalar].some}
        onChange={() => dispatch({ type: "TOGGLE_SOME", scalar })}
        className={checkbox}
      />
      <InputBound scalar={scalar} bound="gte" />
      <InputBound scalar={scalar} bound="lte" />
    </Box>
  );
}

function InputBound({ scalar, bound }: { scalar: string; bound: Bound }) {
  const [state, dispatch] = useRouteState();
  const scalarState = state.scalars[scalar];
  const { toNum } = scalarOpts[scalar];
  return (
    <Box display="flex" flexDirection="row" gap={10}>
      <Box as="label">{bound === "gte" ? "From" : "To"}</Box>
      <Box
        as="input"
        width="navInputWidth"
        color={
          scalarState[bound] && isNaN(toNum(scalarState[bound]))
            ? "error"
            : "text"
        }
        backgroundColor="foreground2"
        textAlign="center"
        value={scalarState[bound]}
        onChange={(e: any) =>
          dispatch({
            type: "SET_BOUND",
            scalar,
            bound,
            value: e.currentTarget.value,
          })
        }
        onKeyDown={(e: any) => {
          if (e.key !== "Enter") return;
          dispatch({ type: "PUSH_BOUND", scalar, bound });
        }}
        onBlur={() => {
          dispatch({ type: "PUSH_BOUND", scalar, bound });
        }}
      />
    </Box>
  );
}

function SelectSort({ scalar, asc }: { scalar: string; asc: boolean }) {
  const [state, dispatch] = useRouteState();
  const active = scalar === state.sort.scalar && asc === state.sort.asc;
  return (
    <Box
      as="button"
      color={active ? "active" : "link"}
      onClick={() =>
        dispatch({
          type: "TOGGLE_SORT",
          scalar,
          asc,
        })
      }
    >
      {asc ? <TbChevronUp /> : <TbChevronDown />}
    </Box>
  );
}
