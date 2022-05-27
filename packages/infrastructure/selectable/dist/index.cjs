'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mappable = require('@analyz/mappable');
var vectorIndex = require('@vect/vector-index');
var vectorMapper = require('@vect/vector-mapper');
var vectorUpdate = require('@vect/vector-update');
var matrixAlgebra = require('@vect/matrix-algebra');

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
    const {
      side,
      rows
    } = this,
          inds = mappable.indexesOf.call(side, keys);
    vectorUpdate.keep(side, vectorIndex.fitRoll(inds)), vectorUpdate.keep(rows, inds);
    return this;
  }

  selectAs(keys) {
    const {
      side,
      rows
    } = this,
          inds = mappable.indexesAt.call(this.side, keys);
    side.splice(inds.length);
    vectorMapper.mutate(side, (_, i) => inds[i].as), vectorUpdate.keep(rows, vectorIndex.fitRoll(inds.map(({
      at
    }) => at)));
    return this;
  }

  filterKeys(by) {
    const {
      side,
      rows
    } = this,
          h = rows.length,
          inds = [];

    for (let i = 0; i < h; i++) {
      if (by(side[i], i)) inds.push(i);
    }

    vectorUpdate.keep(side, inds), vectorUpdate.keep(rows, inds);
    return this;
  }

  filterKeysBy(yi, by) {
    const {
      side,
      rows
    } = this,
          h = rows.length,
          inds = [];

    for (let i = 0; i < h; i++) {
      if (by(rows[i][yi], i)) inds.push(i);
    }

    vectorUpdate.keep(side, inds), vectorUpdate.keep(rows, inds);
    return this;
  }

  sortKeys(comp) {
    const {
      side,
      rows
    } = this,
          h = rows.length;

    for (let i = 0; i < h; i++) {
      rows[i].key = side[i];
    }

    rows.sort((a, b) => comp(a.key, b.key));

    for (let i = 0; i < h; i++) {
      side[i] = rows[i].key, delete rows[i].key;
    }

    return this;
  }

  sortKeysBy(yi, comp) {
    const {
      side,
      rows
    } = this,
          h = rows.length;

    for (let i = 0; i < h; i++) {
      rows[i].key = side[i];
    }

    rows.sort((a, b) => comp(a[yi], b[yi]));

    for (let i = 0; i < h; i++) {
      side[i] = rows[i].key, delete rows[i].key;
    }

    return this;
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
    const {
      head,
      rows
    } = this,
          inds = mappable.indexesOf.call(head, keys);
    vectorUpdate.keep(head, vectorIndex.fitRoll(inds)), vectorMapper.iterate(rows, row => vectorUpdate.keep(row, inds));
    return this;
  }

  selectAs(keys) {
    const {
      head,
      rows
    } = this,
          inds = mappable.indexesAt.call(this.head, keys),
          fitInds = vectorIndex.fitRoll(inds.map(({
      at
    }) => at));
    head.splice(inds.length);
    vectorMapper.mutate(head, (_, i) => inds[i].as), vectorMapper.iterate(rows, row => vectorUpdate.keep(row, fitInds));
    return this;
  }

  filterKeys(by) {
    const {
      head,
      rows
    } = this,
          w = head.length,
          inds = [];

    for (let j = 0; j < w; j++) {
      if (by(head[j], j)) inds.push(j);
    }

    vectorUpdate.keep(head, inds), vectorMapper.iterate(rows, row => vectorUpdate.keep(row, inds));
    return this;
  }

  filterKeysBy(xi, by) {
    const {
      head,
      rows
    } = this,
          columns = matrixAlgebra.transpose(rows),
          w = head.length,
          inds = [];

    for (let j = 0; j < w; j++) {
      if (by(columns[j][xi], j)) inds.push(j);
    }

    vectorUpdate.keep(head, inds), vectorMapper.iterate(rows, row => vectorUpdate.keep(row, inds));
    return this;
  }

  sortKeys(comp) {
    const {
      head,
      rows
    } = this,
          columns = matrixAlgebra.transpose(rows);

    for (let j = 0; j < head.length; j++) columns[j].key = head[j];

    const newRows = matrixAlgebra.transpose(columns.sort((a, b) => comp(a.key, b.key)));
    vectorMapper.mutate(head, (_, j) => columns[j].key);
    vectorMapper.mutate(rows, (_, i) => newRows[i]);
    return this;
  }

  sortKeysBy(xi, comp) {
    const {
      head,
      rows
    } = this,
          columns = matrixAlgebra.transpose(rows);

    for (let j = 0; j < head.length; j++) columns[j].key = head[j];

    const newRows = matrixAlgebra.transpose(columns.sort((a, b) => comp(a[xi], b[xi])));
    vectorMapper.mutate(head, (_, j) => columns[j].key);
    vectorMapper.mutate(rows, (_, i) => newRows[i]);
    return this;
  }

}

exports.XSelectable = XSelectable;
exports.YSelectable = YSelectable;
