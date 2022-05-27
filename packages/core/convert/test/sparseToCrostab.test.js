import { Sparse }                           from '@analyz/sparse'
import { deco, decoCrostab, logger }        from '@spare/logger'
import { crostabToSparse, sparseToCrostab } from '../src/sparse-vs-crostab'

const coords = [
  [ 'A', 'b', 1 ],
  [ 'B', 'b', 1 ],
  [ 'C', 'b', 1 ],
  [ 'D', 'b', 1 ],
  [ 'E', 'b', 1 ],
  [ 'B', 'a', 1 ],
  [ 'B', 'b', 1 ],
  [ 'B', 'c', 1 ],
  [ 'B', 'd', 1 ],
  [ 'B', 'e', 1 ]
]

const sparse = Sparse.gather(coords)

const crostab = sparseToCrostab(sparse, '')

crostab |> deco |> console.log
crostab |> decoCrostab |> logger

const sparse2 = crostabToSparse(crostab, (x, y, v) => v)

sparse2 |> deco |> console.log
