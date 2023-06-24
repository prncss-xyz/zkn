export type Bound = "lge" | "gte";
const toNumDate = (str: string) => new Date(str).getTime();

export const defaultSort = {
  scalar: "mtime",
  dir: true,
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
    dir: boolean;
  };
  scalars: {
    [scalar: string]: {
      lge: string;
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
        lge: "",
        gte: "",
      },
    },
  };
}

interface IToggleSort {
  type: "TOGGLE_SORT";
  scalar: string;
  dir: boolean;
}
function toggleSort({ scalar, dir }: IToggleSort, state: IState) {
  if (state.sort.scalar === scalar && state.sort.dir === dir)
    return { ...state, sort: defaultSort };
  const { always } = scalarOpts[scalar];
  const scalarState = state.scalars[scalar];
  if (always || scalarState.some) return { ...state, sort: { scalar, dir } };
  return {
    ...state,
    sort: { scalar, dir },
    scalars: { ...state.scalars, [scalar]: { ...scalarState, some: true } },
  };
}

interface IPushBound {
  type: "PUSH_BOUND";
  scalar: string;
  bound: Bound;
}
function pushBound({ scalar, bound }: IPushBound, state: IState) {
  const erease: Bound = bound === "lge" ? "gte" : "lge";
  const { toNum } = scalarOpts[scalar];
  const scalarState = state.scalars[scalar];
  if (toNum(scalarState.gte) > toNum(scalarState.lge))
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
  const { always } = scalarOpts[scalar];
  return {
    ...state,
    scalars: {
      ...state.scalars,
      [scalar]: { ...scalarState, some: !always, [bound]: value },
    },
  };
}

function never(_: never) {}

export function reducer(state: IState, action: IAction) {
  switch (action.type) {
    case "TOGGLE_SOME":
      return [toggleSome(action, state), true] as const;
    case "PUSH_BOUND":
      return [pushBound(action, state), true] as const;
    case "SET_BOUND":
      return [setBound(action, state), false] as const;
    case "TOGGLE_SORT":
      return [toggleSort(action, state), true] as const;
    default:
      never(action);
      throw action;
  }
}
