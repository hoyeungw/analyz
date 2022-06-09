'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var xlsx = require('xlsx');
var objectMapper = require('@vect/object-mapper');
var csv = require('@analyz/csv');
var crostab = require('@analyz/crostab');
var table = require('@analyz/table');

class Worksheet {
  static fromCrostab(crostab$1) {
    const matrix = crostab.Flatward.from(crostab$1).matrix();
    return xlsx.utils.aoa_to_sheet(matrix);
  }

  static fromTable(table$1) {
    const matrix = table.Flatward.from(table$1).matrix();
    return xlsx.utils.aoa_to_sheet(matrix);
  }

}

class Workbook {
  static read(filename, options) {
    return xlsx.readFile(filename, options);
  }

  static write(filename, workbook, options) {
    xlsx.writeFile(workbook, filename, options);
  }

  static fromCrostab(crostab, sheetName) {
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, Worksheet.fromCrostab(crostab), sheetName ?? crostab.title ?? 'crostab');
    return workbook;
  }

  static fromTable(table, sheetName) {
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, Worksheet.fromTable(table), sheetName ?? table.title ?? 'table');
    return workbook;
  }

  static fromCrostabs(crostabs) {
    const workbook = xlsx.utils.book_new();

    for (let [name, crostab] of objectMapper.indexed(crostabs)) xlsx.utils.book_append_sheet(workbook, Worksheet.fromCrostab(crostab), name);

    return workbook;
  }

  static fromTables(tables) {
    const workbook = xlsx.utils.book_new();

    for (let [name, table] of objectMapper.indexed(tables)) xlsx.utils.book_append_sheet(workbook, Worksheet.fromTable(table), name);

    return workbook;
  }

}
class Crostabs {
  static fromXlsx(filename) {
    return Crostabs.fromWorkbook(Workbook.read(filename));
  }

  static fromWorkbook(workbook) {
    const worksheets = workbook.Sheets;
    return objectMapper.mapKeyVal(worksheets, (name, sheet) => {
      var _utils$sheet_to_csv;

      return _utils$sheet_to_csv = xlsx.utils.sheet_to_csv(sheet), csv.csvToCrostab(_utils$sheet_to_csv);
    });
  }

}
class Tables {
  static fromXlsx(filename) {
    return Tables.fromWorkbook(Workbook.read(filename));
  }

  static fromWorkbook(workbook) {
    const worksheets = workbook.Sheets;
    return objectMapper.mapKeyVal(worksheets, (name, sheet) => {
      var _utils$sheet_to_csv2;

      return _utils$sheet_to_csv2 = xlsx.utils.sheet_to_csv(sheet), csv.csvToTable(_utils$sheet_to_csv2);
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

exports.Crostabs = Crostabs;
exports.Tables = Tables;
exports.Workbook = Workbook;
exports.Worksheet = Worksheet;
exports.crostabCollectionToWorkbook = crostabCollectionToWorkbook;
exports.crostabToWorkbook = crostabToWorkbook;
exports.crostabToWorksheet = crostabToWorksheet;
exports.readCrostabCollection = readCrostabCollection;
exports.readTableCollection = readTableCollection;
exports.tableCollectionToWorkbook = tableCollectionToWorkbook;
exports.tableToWorkbook = tableToWorkbook;
exports.tableToWorksheet = tableToWorksheet;
