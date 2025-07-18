import { Foba }            from '@foba/table'
import { decoTable, says } from '@spare/logger'
import { tableAcquire }    from '../src/merge.js'
import { Table }           from '@analyz/table'
import { IMMUTABLE }       from '@analyz/enum-mutabilities'

const ROSTER = 'BistroDutyRoster'

const alpha = Foba[ROSTER] |> Table.from

const beta = alpha.select(['adt'], IMMUTABLE)

alpha |> decoTable |> says[ROSTER].p('alpha')
beta |> decoTable |> says[ROSTER].p('beta')

const gamma = tableAcquire(alpha, beta)

gamma |> decoTable |> says[ROSTER].p('acquired')
