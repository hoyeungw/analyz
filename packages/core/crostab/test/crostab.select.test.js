import { CrostabCollection } from '@foba/crostab'
import { decoCrostab }       from '@spare/logger'

const crostab = CrostabCollection.CountryGDPByYear
crostab |> decoCrostab |> console.log

crostab.sideward.select([ 2019, 2014, 2000 ])
crostab.headward.selectAs([
  [ 'CHN', 'China' ],
  [ 'USA', 'United Stats' ],
  [ 'PAK', 'Pakistan' ],
  [ 'JPN', 'Japan' ],
  [ 'RUS', 'Russia' ]
])

crostab |> decoCrostab |> console.log