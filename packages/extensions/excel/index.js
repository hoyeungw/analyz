import { Crostabs, Tables, Workbook } from './src/Workbook'
import { Worksheet }                  from './src/Worksheet'

export { Crostabs, Tables, Workbook, Worksheet }

export const readCrostabCollection = Crostabs.fromXlsx
export const crostabToWorksheet = Worksheet.fromCrostab
export const crostabToWorkbook = Workbook.fromCrostab
export const crostabCollectionToWorkbook = Workbook.fromCrostabs

export const readTableCollection = Tables.fromXlsx
export const tableToWorksheet = Worksheet.fromTable
export const tableToWorkbook = Workbook.fromTable
export const tableCollectionToWorkbook = Workbook.fromTables