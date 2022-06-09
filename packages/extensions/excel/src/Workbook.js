import { readFile, utils, utils as XL, writeFile } from 'xlsx'
import { indexed, mapKeyVal }                      from '@vect/object-mapper'
import { csvToCrostab, csvToTable }                from '@analyz/csv'
import { Worksheet }                               from './Worksheet'

export class Workbook {
  static read(filename, options) { return readFile(filename, options) }
  static write(filename, workbook, options) { writeFile(workbook, filename, options) }

  static fromCrostab(crostab, sheetName) {
    const workbook = XL.book_new()
    XL.book_append_sheet(workbook, Worksheet.fromCrostab(crostab), sheetName ?? crostab.title ?? 'crostab')
    return workbook
  }
  static fromTable(table, sheetName) {
    const workbook = XL.book_new()
    XL.book_append_sheet(workbook, Worksheet.fromTable(table), sheetName ?? table.title ?? 'table')
    return workbook
  }
  static fromCrostabs(crostabs) {
    const workbook = XL.book_new()
    for (let [name, crostab] of indexed(crostabs)) XL.book_append_sheet(workbook, Worksheet.fromCrostab(crostab), name)
    return workbook
  }
  static fromTables(tables) {
    const workbook = XL.book_new()
    for (let [name, table] of indexed(tables)) XL.book_append_sheet(workbook, Worksheet.fromTable(table), name)
    return workbook
  }
}

export class Crostabs {
  static fromXlsx(filename) {
    return Crostabs.fromWorkbook(Workbook.read(filename))
  }
  static fromWorkbook(workbook) {
    const worksheets = workbook.Sheets
    return mapKeyVal(worksheets, (name, sheet) => utils.sheet_to_csv(sheet) |> csvToCrostab)
  }
}

export class Tables {
  static fromXlsx(filename) {
    return Tables.fromWorkbook(Workbook.read(filename))
  }
  static fromWorkbook(workbook) {
    const worksheets = workbook.Sheets
    return mapKeyVal(worksheets, (name, sheet) => utils.sheet_to_csv(sheet) |> csvToTable)
  }
}