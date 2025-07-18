import { TableCollection }                          from '@foba/table'
import { deco, decoEntries, decoTable, decoVector } from '@spare/logger'
import { Table }                                    from '../src/Table.js'

export const table = TableCollection.FrontierEconomies |> Table.from
table |> decoTable |> console.log

for (let kv of table.headward.entryIndexed([ 'country', 'cagr' ])) {
  kv |> deco |> console.log
}
