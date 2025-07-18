import { decoCrostab }                               from '@spare/logger'
import { ACCUM, AVERAGE, COUNT, FIRST, INCRE, LAST } from '@analys/enum-pivot-mode'
import { Stat }                                      from '../src/extension/Stat.js'
import { says }                                      from '@spare/xr'

const coords = [
  ['B', 'b', null],
  ['A', 'b', 1],
  ['B', 'b', 1],
  ['C', 'b', 1],
  ['D', 'b', 1],
  ['E', 'b', 1],
  ['B', 'a', 1],
  ['B', 'b', 2],
  ['B', 'c', 1],
  ['B', 'd', 1],
  ['B', 'e', 1]
]

Stat.of(ACCUM).collect(coords) |> decoCrostab |> says[ACCUM]
Stat.of(AVERAGE).collect(coords) |> decoCrostab |> says[AVERAGE]
Stat.of(INCRE).collect(coords) |> decoCrostab |> says[INCRE]
Stat.of(COUNT).collect(coords) |> decoCrostab |> says[COUNT]
Stat.of(FIRST).collect(coords) |> decoCrostab |> says[FIRST]
Stat.of(LAST).collect(coords) |> decoCrostab |> says[LAST]
