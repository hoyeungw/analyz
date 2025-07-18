import { decoCrostab, decoTable, says }               from '@spare/logger'
import { readCrostabCollection, readTableCollection } from '../index.js'

const SRC = './xlsx/dolce.xlsx'

says['reading']('read crostab collection')
const crostabCollection = readCrostabCollection(SRC)
for (let key in crostabCollection) {
  if (crostabCollection[key]) {
    says[key](decoCrostab(crostabCollection[key]))
  } else {
    says[key]('blank sheet')
  }
}

says['reading']('read table collection')
const tableCollection = readTableCollection(SRC)
for (let key in tableCollection) {
  if (tableCollection[key]) {
    says[key](decoTable(tableCollection[key]))
  } else {
    says[key]('blank sheet')
  }

}
