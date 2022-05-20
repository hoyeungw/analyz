import { logger } from '@spare/logger'
import { Matrix } from '../src/Matrix'

const rows = [
  [ 1, 2, 3 ],
  [ 1, 2, 3 ],
  [ 1, 2, 3 ],
]

const matrix = Matrix.from(rows)

matrix.col[2] |> logger