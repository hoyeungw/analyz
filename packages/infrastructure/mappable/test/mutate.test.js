import { TableCollection }   from '@foba/table'
import { decoTable, logger } from '@spare/logger'

const table = TableCollection.BistroDutyRoster
table |> decoTable |> logger

table.headward.mutate([ 'served', 'sold' ], x => x / 10)

table |> decoTable |> logger