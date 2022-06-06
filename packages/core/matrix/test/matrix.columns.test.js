import { deco, decoMatrix, logger } from '@spare/logger'
import { Matrix }                   from '../src/Matrix'

const rows = [
  [1, 2, 3],
  [1, 2, 3],
  [1, 2, 3],
]

const matrix = Matrix.from(rows)

matrix.columns[2] |> deco |> logger
matrix.columns[1] = [0, 0, 0]
matrix |> decoMatrix |> logger
