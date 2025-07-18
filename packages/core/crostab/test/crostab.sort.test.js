import { decoCrostab } from '@spare/logger'
import { says }        from '@spare/xr'
import { Crostab }     from '../src/Crostab.js'

const crostab = Crostab.build(
  ['@V1', '@X1', '@Z1', '@F1', '@L1', '@P1', '@T1'],
  ['@a2', '@o2', '@i2', '@u2', '@n2', '@v2', '@s2'],
  [
    [-112, -112, -36, -112, -73, -36, 0],
    [-36, -36, 0, -36, 0, -73, 0],
    [-36, -36, 0, -36, 0, -73, 0],
    [-36, -36, -36, -36, -36, 0, 0],
    [-36, -36, 0, -36, 0, -73, 0],
    [-112, -112, 0, 0, -36, 0, -36],
    [-243, -243, 0, -206, -206, -243, -243],
  ]
)


crostab |> decoCrostab |> says['original']

crostab.headward.sortKeys((a, b) => a.localeCompare(b))
crostab.sideward.sortKeys((a, b) => a.localeCompare(b))

crostab |> decoCrostab |> says['sorted']