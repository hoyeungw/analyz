import { TableCollection } from '@foba/table'
import { decoTable }       from '@spare/logger'

const table = TableCollection.BistroDutyRoster

table |> decoTable |> console.log

table.headward |> console.log

table.headward.grow('served', x => x * 10, 'served_10', 'sold')

table |> decoTable |> console.log