import { IState } from "./navigator/reducer";
import { scalars, scalarOpts, defaultSort } from "./opts";

export function setScalars(params: URLSearchParams, state: IState) {
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
    state.sort.asc === defaultSort.asc
  )
    params.delete("sort");
  else params.set("sort", unparseSort(state.sort));
}

const dirs = ["asc", "desc"];
function parseSort(raw: string | null) {
  if (!raw) return defaultSort;
  const [scalar, dir] = raw.split("_");
  if (scalars.includes(scalar) && dirs.includes(dir))
    return { scalar, asc: dir === "asc" };
  return defaultSort;
}

function unparseSort({ scalar, asc }: { scalar: string; asc: boolean }) {
  if (scalar === defaultSort.scalar && asc === defaultSort.asc) return "";
  return `${scalar}_${asc ? "asc" : "desc"}`;
}

export function getScalars(params: URLSearchParams) {
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
