import { utils, readFile, writeFile } from 'xlsx';
import { indexed, mapKeyVal } from '@vect/object-mapper';
import { csvToCrostab, csvToTable } from '@analyz/csv';
import { Flatward } from '@analyz/crostab';
import { Flatward as Flatward$1 } from '@analyz/table';

class Worksheet {
  static fromCrostab(crostab) {
    const matrix = Flatward.from(crostab).matrix();
    return utils.aoa_to_sheet(matrix);
  }

  static fromTable(table) {
    const matrix = Flatward$1.from(table).matrix();
    return utils.aoa_to_sheet(matrix);
  }

}

class Workbook {
  static read(filename, options) {
    return readFile(filename, options);
  }

  static write(filename, workbook, options) {
    writeFile(workbook, filename, options);
  }

  static fromCrostab(crostab, sheetName) {
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, Worksheet.fromCrostab(crostab), sheetName ?? crostab.title ?? 'crostab');
    return workbook;
  }

  static fromTable(table, sheetName) {
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, Worksheet.fromTable(table), sheetName ?? table.title ?? 'table');
    return workbook;
  }

  static fromCrostabs(crostabs) {
    const workbook = utils.book_new();

    for (let [name, crostab] of indexed(crostabs)) utils.book_append_sheet(workbook, Worksheet.fromCrostab(crostab), name);

    return workbook;
  }

  static fromTables(tables) {
    const workbook = utils.book_new();

    for (let [name, table] of indexed(tables)) utils.book_append_sheet(workbook, Worksheet.fromTable(table), name);

    return workbook;
  }

}
class Crostabs {
  static fromXlsx(filename) {
    return Crostabs.fromWorkbook(Workbook.read(filename));
  }

  static fromWorkbook(workbook) {
    const worksheets = workbook.Sheets;
    return mapKeyVal(worksheets, (name, sheet) => {
      var _utils$sheet_to_csv;

      return _utils$sheet_to_csv = utils.sheet_to_csv(sheet), csvToCrostab(_utils$sheet_to_csv);
    });
  }

}
class Tables {
  static fromXlsx(filename) {
    return Tables.fromWorkbook(Workbook.read(filename));
  }

  static fromWorkbook(workbook) {
    const worksheets = workbook.Sheets;
    return mapKeyVal(worksheets, (name, sheet) => {
      var _utils$sheet_to_csv2;

      return _utils$sheet_to_csv2 = utils.sheet_to_csv(sheet), csvToTable(_utils$sheet_to_csv2);
    });
  }

}

const readCrostabCollection = Crostabs.fromXlsx;
const crostabToWorksheet = Worksheet.fromCrostab;
const crostabToWorkbook = Workbook.fromCrostab;
const crostabCollectionToWorkbook = Workbook.fromCrostabs;
const readTableCollection = Tables.fromXlsx;
const tableToWorksheet = Worksheet.fromTable;
const tableToWorkbook = Workbook.fromTable;
const tableCollectionToWorkbook = Workbook.fromTables;

export { Crostabs, Tables, Workbook, Worksheet, crostabCollectionToWorkbook, crostabToWorkbook, crostabToWorksheet, readCrostabCollection, readTableCollection, tableCollectionToWorkbook, tableToWorkbook, tableToWorksheet };
