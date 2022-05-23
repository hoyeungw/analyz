'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var crostab = require('@analyz/crostab');

class Table extends crostab.Headward {
  title;

  constructor(table) {
    super(table);
    this.title = table === null || table === void 0 ? void 0 : table.title;
  }

}

exports.Table = Table;
