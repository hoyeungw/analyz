import { Samples }                            from '../src/Samples'
import { decoCrostab, decoTable, decoVector } from '@spare/logger'
import { says }                               from '@spare/xr'
import { INCRE }                              from '@analys/enum-pivot-mode'

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

samples |> decoVector |> says['original']

samples.select(['foo', 'biz']) |> decoVector |> says['selected']

samples.table() |> decoTable |> says['table']

samples.table(['foo', 'biz']) |> decoTable |> says['table'].br('selected')

samples.crostab(['city', 'biz', 'vol'], INCRE) |> decoCrostab |> console.log