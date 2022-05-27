import { TableCollection } from '@foba/table'
import { decoTable }       from '@spare/logger'

let table = TableCollection.BistroDutyRoster

table |> decoTable |> console.log

table = table.filter('served', parseInt)

table |> decoTable |> console.log