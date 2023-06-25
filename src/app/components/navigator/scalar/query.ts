import { IState, defaultSort, scalarOpts, scalars } from "./reducer";

export function queryToParams(params: URLSearchParams, state: IState) {
  for (const scalar of scalars) {
    const scalarState = state.scalars[scalar];
    if (scalarState.lte || scalarState.gte) params.delete(scalar);
    else if (scalarState.some) params.set(scalar, "some");
    else params.delete(scalar);
    if (scalarState.lte) params.set(scalar + "_lte", scalarState.lte);
    else params.delete(scalar + "_lte");
    if (scalarState.gte) params.set(scalar + "_gte", scalarState.gte);
    else params.delete(scalar + "_gte");
  }
  if (
    state.sort.scalar === defaultSort.scalar &&
    state.sort.dir === defaultSort.dir
  )
    params.delete("sort");
  else params.set("sort", unparseSort(state.sort));
  const queryString = params.toString();
  const sep = queryString.length ? "?" : "";
  return sep + queryString;
}

const dirs = ["asc", "desc"];
function parseSort(raw: string | null) {
  if (!raw) return defaultSort;
  const [scalar, dir] = raw.split("_");
  if (scalars.includes(scalar) && dirs.includes(dir))
    return { scalar, dir: dir === "asc" };
  return defaultSort;
}

function unparseSort({ scalar, dir }: { scalar: string; dir: boolean }) {
  if (scalar === defaultSort.scalar && dir === defaultSort.dir) return "";
  return `${scalar}_${dir ? "asc" : "desc"}`;
}

export function paramsToQuery(params: URLSearchParams) {
  const sort = parseSort(params.get("sort"));
  return {
    scalars: Object.fromEntries(
      scalars.map((scalar) => [
        scalar,
        {
          lte: params.get(scalar + "_lte") || "",
          gte: params.get(scalar + "_gte") || "",
          some:
            (!scalarOpts[scalar].always && sort.scalar === scalar) ||
            !!(
              params.get(scalar + "_lte") ||
              params.get(scalar + "_gte") ||
              params.get(scalar)
            ),
        },
      ])
    ),
    sort,
  };
}
