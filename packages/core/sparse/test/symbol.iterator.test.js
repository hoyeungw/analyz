import { sparseToCrostab } from '@analyz/convert'
import { decoCrostab }     from '@spare/logger'
import { says }            from '@spare/xr'
import { Sparse }          from '../src/Sparse.js'

export const nested = {
  H: { i: 12, o: 12 },
  I: { n: -6, o: -30 },
  O: { o: -12 },
  T: { i: -33, n: -14, o: -72 }
}

const sparse = Sparse.from(nested)
for (let [x, y, v] of sparse) {
  `[x] (${x}) [y] (${y}) [v] (${v})` |> says['enumerator']
}
sparseToCrostab(sparse) |> decoCrostab |> console.log

