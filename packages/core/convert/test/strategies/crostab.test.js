import { strategies }         from '@valjoux/strategies'
import { deco, decoCrostab }  from '@spare/logger'
import { says }               from '@spare/xr'
import { makeEmbedded }       from '@foba/util'
import { Stat as SparseStat } from '@analyz/sparse'
import { INCRE }              from '@analys/enum-pivot-mode'
import { Samples }            from '@analyz/samples'
import { samplesToTable }     from '../../src/tables-vs-samples'
import { tripletIndexed }     from '@vect/matrix-mapper'

const samples = Samples.of(
  { city: 'BJ', biz: 'beer', vol: 300 },
  { city: 'BJ', biz: 'chsp', vol: 400 },
  { city: 'BJ', biz: 'chsp', vol: 200 },
  { city: 'SH', biz: 'beer', vol: 100 },
  { city: 'SH', biz: 'wine', vol: 200 },
  { city: 'SZ', biz: 'beer', vol: 200 },
  { city: 'SZ', biz: 'wine', vol: 100 },
  { city: 'SZ', biz: 'wine', vol: 200 },
)

const table = samplesToTable(samples)

const { lapse, result } = strategies({
  repeat: 1E+5,
  candidates: {
    foo: null,
  } |> makeEmbedded,
  methods: {
    bench: x => x,
    samples: () => samples.crostab(['city', 'biz', 'vol'], INCRE),
    sparse: () => SparseStat.of(INCRE).collect(tripletIndexed(samples, ['city', 'biz', 'vol'])),
  }
})
lapse |> decoCrostab |> says['lapse']
result |> decoCrostab |> says['result']

result.cell('foo', 'samples') |> deco |> console.log
result.cell('foo', 'sparse') |> decoCrostab |> console.log