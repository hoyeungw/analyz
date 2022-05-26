import { decoCrostab }         from '@spare/logger'
import { CrosCount, CrosList } from './Statistical'

const samples = [
  [ 'Beer', 'QD', 200 ],
  [ 'Beer', 'QD', 300 ],
  [ 'Beer', 'QD', 400 ],
  [ 'Whsk', 'QD', 50 ],
  [ 'Whsk', 'QD', 100 ],
  [ 'Whsk', 'QD', 150 ],
  [ 'Wine', 'GZ', 100 ],
  [ 'Wine', 'GZ', 150 ],
  [ 'Wine', 'GZ', 200 ],
  [ 'Beer', 'GZ', 50 ],
  [ 'Beer', 'GZ', 100 ],
  [ 'Beer', 'GZ', 150 ],
  [ 'Liqu', 'CS', 120 ],
]

CrosList.gather(samples).toCrostab(x => x?.average ?? 0, '') |> decoCrostab |> console.log
CrosCount.gather(samples).toCrostab(null, '') |> decoCrostab |> console.log