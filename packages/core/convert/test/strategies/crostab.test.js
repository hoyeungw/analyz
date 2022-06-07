import { strategies }         from '@valjoux/strategies'
import { decoCrostab }        from '@spare/logger'
import { says }               from '@spare/xr'
import { makeEmbedded }       from '@foba/util'
import { Stat as SparseStat } from '@analyz/sparse'
import { INCRE }              from '@analys/enum-pivot-mode'
import { Samples }            from '@analyz/samples'

const coords = [
  ['A', 'b', 1],
  ['B', 'b', 1],
  ['C', 'b', 1],
  ['D', 'b', 1],
  ['E', 'b', 1],
  ['B', 'a', 1],
  ['B', 'b', 1],
  ['B', 'c', 1],
  ['B', 'd', 1],
  ['B', 'e', 1]
]

const { lapse, result } = strategies({
  repeat: 1E+3,
  candidates: {
    foo: null,
    bar: null
  } |> makeEmbedded,
  methods: {
    bench: x => x,
    samples: Samples.from(coords).crostab([0, 1, 2], INCRE),
    sparse: SparseStat.of(INCRE).collect(coords),
  }
})
lapse |> decoCrostab |> says['lapse']
result |> decoCrostab |> says['result']