import { decoCrostab, logger } from '@spare/logger'
import { Crostab }             from '../src/Crostab.js'


const crostab = Crostab.from({
  side: ['A', 'B', 'C', 'D', 'E'],
  head: ['a', 'b', 'c', 'd'],
  rows: [
    [0, 1, 2, 3],
    [0, 1, 2, 3],
    [0, 1, 2, 3],
    [0, 1, 2, 3],
    [0, 1, 2, 3],
  ]
})

crostab.sideward
  .mutate(['B', 'C'], v => v + 1)
  .mutate(['B', 'C'], v => v * 10)
  .mutateKeys(x => '@' + x + '1')

crostab.headward
  .mutate(['b', 'c'], v => v * 10)
  .mutateKeys(y => '@' + y + '2')

crostab.sideward.at['@A1'] = [0, 0, 0, 0]

crostab |> decoCrostab |> logger

crostab.sideward.at['@A1'] |> logger

crostab.cell('@A1', '@a2') |> console.log
