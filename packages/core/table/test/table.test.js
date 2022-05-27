import { decoTable, logger } from '@spare/logger'
import { Table }             from '../src/Table'


const table = Table.from({
  head: [ 'a', 'b', 'c', 'd' ],
  rows: [
    [ 0, 1, 2, 3 ],
    [ 0, 1, 2, 3 ],
    [ 0, 1, 2, 3 ],
    [ 0, 1, 2, 3 ],
    [ 0, 1, 2, 3 ],
  ]
})

table.headward
  .mutate([ 'b', 'c' ], v => v * 10)
  .mutateKeys(y => '@' + y + '2')

table |> decoTable |> logger