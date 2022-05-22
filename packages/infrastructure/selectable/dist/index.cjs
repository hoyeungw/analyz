'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var matrixAlgebra = require('@vect/matrix-algebra');
var vectorSelect = require('@vect/vector-select');
var vectorZipper = require('@vect/vector-zipper');
var mappable = require('@analyz/mappable');
var columnsSelect = require('@vect/columns-select');

class XSelectable {
  side;
  rows;

  constructor({
    side,
    rows
  }) {
    this.side = side, this.rows = rows;
  }

  select(keys) {
    const xs = mappable.Labels.prototype.indexesAt.call(this.side, keys);
    this.head = xs.map(({
      as
    }) => as), this.rows = vectorSelect.select(this.rows, xs.map(({
      at
    }) => at));
    return this; // return new XSelectable({head: xs.map(({as}) => as), rows: select(this.rows, xs.map(({at}) => at))})
  }

  filter(x, by) {
    const xi = this.side.indexOf(x);
    const columns = matrixAlgebra.transpose(this.rows).filter(col => by(col[xi]));
    this.rows = matrixAlgebra.transpose(columns);
    return this; // return new XSelectable({side: this.side.slice(), rows: transpose(columns)})
  }

  sortKeys(comp) {
    const list = vectorZipper.zipper(this.side, this.rows, (key, row) => ({
      key,
      row
    }));
    list.sort((a, b) => comp(a.key, b.key));
    this.side = list.map(({
      key
    }) => key), this.rows = list.map(({
      row
    }) => row);
    return this; // return new XSelectable({side: list.map(({key}) => key), rows: list.map(({row}) => row)})
  }

  sortKeysBy(yi, comp) {
    const list = vectorZipper.zipper(this.side, this.rows, (key, row) => ({
      y: row[yi],
      key,
      row
    }));
    list.sort((a, b) => comp(a.y, b.y));
    this.side = list.map(({
      key
    }) => key), this.rows = list.map(({
      row
    }) => row);
    return this; // return new XSelectable({side: list.map(({key}) => key), rows: list.map(({row}) => row)})
  }

}

class YSelectable {
  head;
  rows;

  constructor({
    head,
    rows
  }) {
    this.head = head, this.rows = rows;
  }

  select(keys) {
    const ys = mappable.Labels.prototype.indexesAt.call(this.head, keys);
    this.head = ys.map(({
      as
    }) => as), this.rows = columnsSelect.select(this.rows, ys.map(({
      at
    }) => at));
    return this; // return new YSelectable({head: ys.map(({as}) => as), rows: select(this.rows, ys.map(({at}) => at))})
  }

  filter(y, by) {
    const yi = this.head.indexOf(y);
    this.rows = this.rows.filter(row => by(row[yi]));
    return this; // return new YSelectable({side: this.head.slice(), rows: this.rows.filter(row => by(row[yi]))})
  }

  sortKeys(comp) {
    const list = vectorZipper.zipper(this.head, matrixAlgebra.transpose(this.rows), (key, col) => ({
      key,
      col
    }));
    list.sort((a, b) => comp(a.key, b.key));
    this.head = list.map(({
      key
    }) => key), this.rows = matrixAlgebra.transpose(list.map(({
      col
    }) => col));
    return this; // return new YSelectable({head: list.map(({key}) => key), rows: transpose(list.map(({col}) => col))})
  }

  sortKeysBy(xi, comp) {
    const list = vectorZipper.zipper(this.head, matrixAlgebra.transpose(this.rows), (key, col) => ({
      x: col[xi],
      key,
      col
    }));
    list.sort((a, b) => comp(a.x, b.x));
    this.head = list.map(({
      key
    }) => key), this.rows = matrixAlgebra.transpose(list.map(({
      col
    }) => col));
    return this; // return new YSelectable({head: list.map(({key}) => key), rows: transpose(list.map(({col}) => col))})
  }

}

exports.XSelectable = XSelectable;
exports.YSelectable = YSelectable;
