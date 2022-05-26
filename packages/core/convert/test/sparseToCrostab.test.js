import { Sparse }              from '@analyz/sparse'
import { decoCrostab, logger } from '@spare/logger'
import { sparseToCrostab }     from '../src/sparse-vs-crostab'

const sparse = new Sparse()
const points = [
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

for (let [ x, y, v ] of points) sparse.update(x, y, v)

const crostab = sparseToCrostab(sparse, '')
crostab |> decoCrostab |> logger
