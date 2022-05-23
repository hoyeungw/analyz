import { decoTable, logger } from '@spare/logger'
import { Table }             from '../src/Table'


const table = new Table({
  head: [ 'a', 'b', 'c', 'd' ],
  rows: [
    [ 0, 1, 2, 3 ],
    [ 0, 1, 2, 3 ],
    [ 0, 1, 2, 3 ],
    [ 0, 1, 2, 3 ],
    [ 0, 1, 2, 3 ],
  ]
})

table
  .mutate([ 'b', 'c' ], v => v * 10)
  .mutateKeys(y => '@' + y + '2')

table |> decoTable |> logger