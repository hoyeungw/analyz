import { AVERAGE, COUNT, INCRE } from '@analys/enum-pivot-mode'
import { Stat }                  from '../src/Stat'
import { deco, logger }          from '@spare/logger'

const kvs = [
  ['a', 1],
  ['a', 2],
  ['a', 3],
  ['a', 4],
  ['b', 1],
  ['b', 2],
  ['c', 1],
]


const sum = Stat.of(INCRE).collect(kvs)
sum.object() |> deco |> logger
const count = Stat.of(COUNT).collect(kvs)
count.object() |> deco |> logger
const average = Stat.of(AVERAGE).collect(kvs)
average.object(x => x.average) |> deco |> logger