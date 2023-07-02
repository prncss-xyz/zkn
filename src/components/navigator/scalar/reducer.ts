export type Bound = "lte" | "gte";
const toNumDate = (str: string) => new Date(str).getTime();

export const defaultSort = {
  scalar: "mtime",
  asc: true,
};

export const scalars = ["wordcount", "mtime", "event"];

export const scalarOpts: {
  [key: string]: {
    label: string;
    toNum: (str: string) => number;
    always: boolean;
  };
} = {
  wordcount: {
    always: true,
    label: "Wordcount",
    toNum: Number,
  },
  mtime: {
    always: true,
    label: "Modified",
    toNum: toNumDate,
  },
  event: {
    always: false,
    label: "Event",
    toNum: toNumDate,
  },
};

export interface IState {
  sort: {
    scalar: string;
    asc: boolean;
  };
  scalars: {
    [scalar: string]: {
      lte: string;
      gte: string;
      some: boolean;
    };
  };
}

export type IEffect = boolean;

export type IAction = IToggleSome | IPushBound | ISetBound | IToggleSort;

interface IToggleSome {
  type: "TOGGLE_SOME";
  scalar: string;
}
function toggleSome({ scalar }: IToggleSome, state: IState) {
  const scalarState = state.scalars[scalar];
  const { always } = scalarOpts[scalar];
  const some = scalarState.some;
  if (!some && always) return state;
  const sort = some && state.sort.scalar === scalar ? defaultSort : state.sort;
  return {
    ...state,
    sort,
    scalars: {
      ...state.scalars,
      [scalar]: {
        some: !some,
        lte: "",
        gte: "",
      },
    },
  };
}

interface IToggleSort {
  type: "TOGGLE_SORT";
  scalar: string;
  asc: boolean;
}
function toggleSort({ scalar, asc }: IToggleSort, state: IState) {
  if (state.sort.scalar === scalar && state.sort.asc === asc)
    return { ...state, sort: defaultSort };
  const { always } = scalarOpts[scalar];
  const scalarState = state.scalars[scalar];
  if (always || scalarState.some) return { ...state, sort: { scalar, asc } };
  return {
    ...state,
    sort: { scalar, asc },
    scalars: { ...state.scalars, [scalar]: { ...scalarState, some: true } },
  };
}

interface IPushBound {
  type: "PUSH_BOUND";
  scalar: string;
  bound: Bound;
}

function pushBound({ scalar, bound }: IPushBound, state: IState) {
  const erease: Bound = bound === "lte" ? "gte" : "lte";
  const { toNum } = scalarOpts[scalar];
  const scalarState = state.scalars[scalar];
  if (toNum(scalarState.gte) > toNum(scalarState.lte))
    return {
      ...state,
      scalars: {
        ...state.scalars,
        [scalar]: { ...scalarState, [erease]: "" },
      },
    };
  return state;
}

interface ISetBound {
  type: "SET_BOUND";
  scalar: string;
  bound: Bound;
  value: string;
}
function setBound({ scalar, bound, value }: ISetBound, state: IState) {
  const scalarState = state.scalars[scalar];
  return {
    ...state,
    scalars: {
      ...state.scalars,
      [scalar]: { ...scalarState, some: true, [bound]: value },
    },
  };
}

function never(_: never) {}

export function reducer(
  state: IState,
  action: IAction
): readonly [IState, boolean] {
  switch (action.type) {
    case "TOGGLE_SOME":
      return [toggleSome(action, state), true];
    case "PUSH_BOUND":
      return [pushBound(action, state), true];
    case "SET_BOUND":
      return [setBound(action, state), false];
    case "TOGGLE_SORT":
      return [toggleSort(action, state), true];
    default:
      never(action);
      throw null;
  }
}
