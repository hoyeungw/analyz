import { CrostabCollection } from '@foba/crostab'
import { decoCrostab }       from '@spare/logger'

const crostab = CrostabCollection.CountryGDPByYear
console.log(decoCrostab(crostab))

crostab.sideward.select([2019, 2014, 2000])
crostab.headward.selectAs([
  ['CHN', 'China'],
  ['USA', 'United Stats'],
  ['PAK', 'Pakistan'],
  ['JPN', 'Japan'],
  ['RUS', 'Russia']
])

console.log(decoCrostab(crostab))