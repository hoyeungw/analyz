import { utils as XL }             from 'xlsx'
import { Flatward as CrostabFlat } from '@analyz/crostab'
import { Flatward as TableFlat }   from '@analyz/table'

export class Worksheet {
  static fromCrostab(crostab) {
    const matrix = CrostabFlat.from(crostab).matrix()
    return XL.aoa_to_sheet(matrix)
  }
  static fromTable(table) {
    const matrix = TableFlat.from(table).matrix()
    return XL.aoa_to_sheet(matrix)
  }
}