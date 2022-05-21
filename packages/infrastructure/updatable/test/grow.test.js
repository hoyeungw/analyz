import { decoCrostab, logger } from '@spare/logger'
import { XUpdatable }          from '../src/XUpdatable'
import { YUpdatable }          from '../src/YUpdatable'

const crostab = {
  side: [ 'A', 'B', 'C', 'D' ],
  head: [ 'a', 'b', 'c' ],
  rows: [
    [ 0, 1, 2 ],
    [ 0, 1, 2 ],
    [ 0, 1, 2 ],
    [ 0, 1, 2 ]
  ]
}

const xUpdatable = new XUpdatable(crostab)
const yUpdatable = new YUpdatable(crostab)

xUpdatable.grow('B', x => ++x, 'B2', 'D')
yUpdatable.grow('b', x => x * 5, 'b2', 'c')

crostab |> decoCrostab |> logger