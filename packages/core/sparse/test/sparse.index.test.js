import { deco, logger } from '@spare/logger'
import { says }         from '@spare/xr'
import { Sparse }       from '../src/Sparse'

const points = [
  ['A', 'b', 1],
  ['B', 'b', 1],
  ['C', 'b', 1],
  ['D', 'b', 1],
  ['E', 'b', 1],
  ['B', 'a', 1],
  ['B', 'b', 1],
  ['B', 'c', 1],
  ['B', 'd', 1],
  ['B', 'e', 1]
]

const sparse = Sparse.gather(points)

for (let k of sparse) { k|> logger}
sparse.side |> deco |> says['side']
sparse.head |> deco |> says['head']
Reflect.ownKeys(sparse) |> deco |> says['ownKeys']
Object.getOwnPropertyNames(sparse) |> deco|> says['getOwnPropertyNames']
sparse |> deco |> says['deco']