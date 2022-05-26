'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var crostab = require('@analyz/crostab');

const shallow = mx => mx.map(r => r.slice());

class Table extends crostab.Headward {
  title;

  constructor(table) {
    super(table);
    this.title = table === null || table === void 0 ? void 0 : table.title;
  }

  static from(o = {}) {
    return new Table(o);
  }

  slice() {
    let {
      head,
      rows,
      title
    } = this;
    return new Table({
      head: head.slice(),
      rows: shallow(rows),
      title
    });
  }

}

exports.Table = Table;
