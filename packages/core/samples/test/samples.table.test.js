import { Samples }               from '../src/Samples'
import { decoTable, decoVector } from '@spare/logger'
import { says }                  from '@spare/xr'

const samples = Samples.of(
  { foo: 0, bar: 1, zen: 2 },
  { foo: 0, bar: 1, zen: 2 },
  { foo: 0, bar: 1, zen: 2 },
  { foo: 0, bar: 1, zen: 2 },
)

samples |> decoVector |> says['original']

samples.select(['foo', 'zen']) |> decoVector |> says['selected']

samples.table() |> decoTable |> says['table']

samples.table(['foo', 'zen']) |> decoTable |> says['table'].br('selected')
