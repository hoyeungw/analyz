import { ACCUM, AVERAGE, COUNT } from '@analys/enum-pivot-mode'
import { decoCrostab } from '@spare/logger'
import { Stat }        from '../src/extension/Stat.js'

const samples = [
  ['Beer', 'QD', 200],
  ['Beer', 'QD', 300],
  ['Beer', 'QD', 400],
  ['Whsk', 'QD', 50],
  ['Whsk', 'QD', 100],
  ['Whsk', 'QD', 150],
  ['Wine', 'GZ', 100],
  ['Wine', 'GZ', 150],
  ['Wine', 'GZ', 200],
  ['Beer', 'GZ', 50],
  ['Beer', 'GZ', 100],
  ['Beer', 'GZ', 150],
  ['Liqu', 'CS', 120],
]

Stat.of(ACCUM).collect(samples).crostab(x => x?.average ?? 0, '') |> decoCrostab |> console.log
Stat.of(COUNT).collect(samples).crostab(null, '') |> decoCrostab |> console.log
Stat.of(AVERAGE).collect(samples).crostab(x => x?.average ?? 0, '') |> decoCrostab |> console.log