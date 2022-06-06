import { TableCollection } from '@foba/table'
import { deco, decoTable } from '@spare/logger'
import { Table }           from '../src/Table'

export const table = TableCollection.FrontierEconomies |> Table.from
table |> decoTable |> console.log

for (let kv of table.headward.entryIndexed(['country', 'cagr'])) {
  kv |> deco |> console.log
}
