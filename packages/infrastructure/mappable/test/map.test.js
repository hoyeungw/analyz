import { decoCrostab, logger } from '@spare/logger'
import { XMappable }           from '../src/XMappable.js'
import { YMappable }           from '../src/YMappable.js'


const crostab = {
  side: ['A', 'B', 'C', 'D', 'E'],
  head: ['a', 'b', 'c', 'd'],
  rows: [
    [0, 1, 2, 3],
    [0, 1, 2, 3],
    [0, 1, 2, 3],
    [0, 1, 2, 3],
    [0, 1, 2, 3],
  ]
}

const xMappable = new XMappable(crostab)
const yMappable = new YMappable(crostab)

xMappable
  .mutate(['B', 'C'], x => x + 1)
  .mutate(['B', 'C'], x => x * 10)
yMappable.mutate(['b', 'c'], x => x * 10)

crostab |> decoCrostab |> logger