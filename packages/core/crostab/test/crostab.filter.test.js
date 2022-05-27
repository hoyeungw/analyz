import { CrostabCollection } from '@foba/crostab'
import { decoCrostab }       from '@spare/logger'

const crostab = CrostabCollection.TeachersCountByYear
crostab |> decoCrostab |> console.log

crostab.sideward.filterKeys(x => x[0].startsWith('Tertiary'))

crostab.headward.filterKeys(x => [ 'CHN', 'RUS', 'FRA', 'GBR' ].includes(x))

crostab |> decoCrostab |> console.log

crostab.headward.filterKeysBy(1, v => v > 120)

crostab |> decoCrostab |> console.log