'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vectorSelect = require('@vect/vector-select');
var vectorZipper = require('@vect/vector-zipper');
var columnsSelect = require('@vect/columns-select');
var matrixAlgebra = require('@vect/matrix-algebra');

class Labels extends Array {
  constructor(size) {
    super(size);
  }

  indexAt(key) {
    return Array.isArray(key) ? {
      at: this.indexOf(key[0]),
      as: key[1]
    } : {
      at: this.indexOf(key),
      as: key
    };
  }

  indexesAt(keys) {
    return keys.map(Labels.prototype.indexAt.bind(this));
  }

}

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
    const xs = Labels.prototype.indexesAt.call(this.side, keys);
    return new XSelectable({
      head: xs.map(({
        as
      }) => as),
      rows: vectorSelect.select(this.rows, xs.map(({
        at
      }) => at))
    });
  }

  filter(options) {}

  distinct(labels) {}

  sort(comp) {
    const li = vectorZipper.zipper(this.side, this.rows, (key, row) => ({
      key,
      row
    }));
    li.sort((a, b) => comp(a.key, b.key));
    return new XSelectable({
      side: li.map(({
        key
      }) => key),
      rows: li.map(({
        row
      }) => row)
    });
  }

  sortOn(yi, comp) {
    const li = vectorZipper.zipper(this.side, this.rows, (key, row) => ({
      y: row[yi],
      key,
      row
    }));
    li.sort((a, b) => comp(a.y, b.y));
    return new XSelectable({
      side: li.map(({
        key
      }) => key),
      rows: li.map(({
        row
      }) => row)
    });
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
    const ys = Labels.prototype.indexesAt.call(this.head, keys);
    return new YSelectable({
      head: ys.map(({
        as
      }) => as),
      rows: columnsSelect.select(this.rows, ys.map(({
        at
      }) => at))
    });
  }

  filter(options) {}

  distinct(labels) {}

  sort(comp) {
    const li = vectorZipper.zipper(this.head, matrixAlgebra.transpose(this.rows), (key, col) => ({
      key,
      col
    }));
    li.sort((a, b) => comp(a.key, b.key));
    return new YSelectable({
      head: li.map(({
        key
      }) => key),
      rows: matrixAlgebra.transpose(li.map(({
        col
      }) => col))
    });
  }

  sortOn(xi, comp) {
    const li = vectorZipper.zipper(this.head, matrixAlgebra.transpose(this.rows), (key, col) => ({
      x: col[xi],
      key,
      col
    }));
    li.sort((a, b) => comp(a.x, b.x));
    return new YSelectable({
      head: li.map(({
        key
      }) => key),
      rows: matrixAlgebra.transpose(li.map(({
        col
      }) => col))
    });
  }

}

exports.XSelectable = XSelectable;
exports.YSelectable = YSelectable;
