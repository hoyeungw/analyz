import { deco, logger } from '@spare/logger'
import { says }         from '@spare/xr'
import { Sparse }       from '../src/Sparse'

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

for (let k in sparse) { k|> logger}
sparse.side |> deco |> says['side']
sparse.head |> deco |> says['head']
Reflect.ownKeys(sparse) |> deco |> says['ownKeys']
Object.getOwnPropertyNames(sparse) |> deco|> says['getOwnPropertyNames']
sparse |> deco |> says['deco']