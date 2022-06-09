import { decoCrostab, decoTable, says }               from '@spare/logger'
import { readCrostabCollection, readTableCollection } from '../index'

const SRC = './packages/extensions/excel/test/xlsx/dolce.xlsx'

const crostabCollection = readCrostabCollection(SRC)
for (let key in crostabCollection) {
  crostabCollection[key]  |> decoCrostab|> says[key]
}

const tableCollection = readTableCollection(SRC)
for (let key in tableCollection) {
  tableCollection[key]  |> decoTable |> says[key]
}
