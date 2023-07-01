import { sep } from "node:path";

import * as Dir from "../components/navigator/dir/where";
import * as Tag from "../components/navigator/tag/where";
import * as Scalar from "../components/navigator/scalar/where";

export function searchToWhere(params: URLSearchParams) {
  return {
    ...Scalar.where(params),
    ...Dir.where(params, sep),
    ...Tag.where(params),
  };
}
