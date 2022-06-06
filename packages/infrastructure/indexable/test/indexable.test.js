import { decoCrostab, logger } from '@spare/logger'
import { ProxyFab }            from '../index'

const crostab = {
  side: ['A', 'B', 'C', 'D'],
  head: ['a', 'b', 'c'],
  rows: [
    [0, 1, 2],
    [0, 1, 2],
    [0, 1, 2],
    [0, 1, 2]
  ]
}

const xIndexable = ProxyFab.sidewardIndexer(crostab)
const yIndexable = ProxyFab.headwardIndexer(crostab)

xIndexable['B'] = [2, 2, 2]
yIndexable['b'] = [4, 4, 4, 4]

// xUpdatable.grow('B', x => ++x, 'B2', 'D')
// yUpdatable.grow('b', x => x * 5, 'b2', 'c')

crostab |> decoCrostab |> logger