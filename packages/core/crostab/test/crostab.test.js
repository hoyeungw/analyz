import { decoCrostab, logger } from '@spare/logger'
import { Crostab }             from '../src/Crostab'


const crostab = new Crostab({
  side: [ 'A', 'B', 'C', 'D', 'E' ],
  head: [ 'a', 'b', 'c', 'd' ],
  rows: [
    [ 0, 1, 2, 3 ],
    [ 0, 1, 2, 3 ],
    [ 0, 1, 2, 3 ],
    [ 0, 1, 2, 3 ],
    [ 0, 1, 2, 3 ],
  ]
})

crostab.sideward
  .mutateKeys(x => '@' + x + '1')
  .mutate([ 'B', 'C' ], v => v + 1)
  .mutate([ 'B', 'C' ], v => v * 10)
crostab.headward
  .mutateKeys(y => '@' + y + '2')
  .mutate([ 'b', 'c' ], v => v * 10)

crostab |> decoCrostab |> logger