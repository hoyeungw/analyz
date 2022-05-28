'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var columnsMapper = require('@vect/columns-mapper');
var matrixAlgebra = require('@vect/matrix-algebra');
var matrixMapper = require('@vect/matrix-mapper');
var vectorMapper = require('@vect/vector-mapper');

class Labels extends Array {
  constructor(size) {
    super(size);
  }

  indexesOf(keys) {
    let inds = [],
        i;

    for (let key of keys) if (~(i = this.indexOf(key))) inds.push(i);

    return inds;
  }

  indexAt(key) {
    let at, from, as;
    return Array.isArray(key) ? ([from, as] = key) && ~(at = this.indexOf(from)) ? {
      at,
      as
    } : null : (from = key, as = key) && ~(at = this.indexOf(from)) ? {
      at,
      as
    } : null;
  }

  indexesAt(keys) {
    let inds = [],
        info,
        {
      indexAt
    } = Labels.prototype;

    for (let key of keys) if (info = indexAt.call(this, key)) inds.push(info);

    return inds;
  }

}
const {
  indexesOf,
  indexesAt
} = Labels.prototype;

class XMappable {
  side;
  rows;

  constructor({
    side,
    rows
  }) {
    this.side = side, this.rows = rows;
  }

  mutateKeys(fn) {
    return vectorMapper.mutate(this.side, fn), this;
  }

  mutateAt(x, fn) {
    x = this.side.indexOf(x);
    if (!~x) return this;

    for (let row of this.rows) row[x] = fn(row[x]);

    return this;
  }

  mutate(xs, fn) {
    if (!Array.isArray(xs)) return this.mutateAt(xs, fn);
    if (xs.length === 1) return this.mutateAt(xs[0], fn);
    xs = indexesOf.call(this.side, xs);

    for (let row of this.rows) for (let x of xs) row[x] = fn(row[x]);

    return this;
  }

  *indexed(by, to) {
    yield* columnsMapper.indexed(this.rows, by, to);
  }

  *entryIndexed(kv, by, to) {
    yield* matrixMapper.entryIndexed(matrixAlgebra.transpose(this.rows), indexesOf.call(this.side, kv), by, to);
  }

  *tripletIndexed(xyz, by, to) {
    yield* matrixMapper.tripletIndexed(matrixAlgebra.transpose(this.rows), indexesOf.call(this.side, xyz), by, to);
  }

  *indexedTo(to) {
    yield* columnsMapper.indexedTo(this.rows, to);
  }

  *entryIndexedTo(kv, to) {
    yield* matrixMapper.entryIndexedTo(matrixAlgebra.transpose(this.rows), indexesOf.call(this.side, kv), to);
  }

  *tripletIndexedTo(xyz, to) {
    yield* matrixMapper.tripletIndexedTo(matrixAlgebra.transpose(this.rows), indexesOf.call(this.side, xyz), to);
  }

}

class YMappable {
  head;
  rows;

  constructor({
    head,
    rows
  }) {
    this.head = head, this.rows = rows;
  }

  mutateKeys(fn) {
    return vectorMapper.mutate(this.head, fn), this;
  }

  mutateValues(fn) {
    return matrixMapper.mutate(this.rows, fn), this;
  }

  mutateAt(y, fn) {
    y = this.head.indexOf(y);
    if (!~y) return this;

    for (let row of this.rows) row[y] = fn(row[y]);

    return this;
  }

  mutate(ys, fn) {
    if (!Array.isArray(ys)) return this.mutateAt(ys, fn);
    if (ys.length === 1) return this.mutateAt(ys[0], fn);
    ys = indexesOf.call(this.head, ys);

    for (let row of this.rows) for (let y of ys) row[y] = fn(row[y]);

    return this;
  }

  *indexed(by, to) {
    yield* matrixMapper.indexed(this.rows, by, to);
  }

  *entryIndexed(kv, by, to) {
    yield* matrixMapper.entryIndexed(this.rows, indexesOf.call(this.head, kv), by, to);
  }

  *tripletIndexed(xyz, by, to) {
    yield* matrixMapper.tripletIndexed(this.rows, indexesOf.call(this.head, xyz), by, to);
  }

  *indexedTo(to) {
    yield* matrixMapper.indexedTo(this.rows, to);
  }

  *entryIndexedTo(kv, to) {
    yield* matrixMapper.entryIndexedTo(this.rows, indexesOf.call(this.head, kv), to);
  }

  *tripletIndexedTo(xyz, to) {
    yield* matrixMapper.tripletIndexedTo(this.rows, indexesOf.call(this.head, xyz), to);
  }

}

exports.Labels = Labels;
exports.XMappable = XMappable;
exports.YMappable = YMappable;
exports.indexesAt = indexesAt;
exports.indexesOf = indexesOf;
