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
    return keys.map(key => this.indexOf(key));
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

class XMappable {
  side;
  rows;

  constructor({
    side,
    rows
  }) {
    this.side = side, this.rows = rows;
  } // mapKeys(fn) { return new XMappable({side: this.side.map(fn), rows: shallow(this.rows)}) }
  // map(keys, fn) {
  //   keys = Labels.prototype.indexesOf.call(this.side, keys)
  //   const rows = shallow(this.rows)
  //   for (let x of keys) { mutate(rows[x], fn) }
  //   return new XMappable({side: this.side.slice(), rows})
  // }


  mutateKeys(fn) {
    return vectorMapper.mutate(this.side, fn), this;
  }

  mutate(keys, fn) {
    keys = Labels.prototype.indexesOf.call(this.side, keys);

    for (let x of keys) {
      vectorMapper.mutate(this.rows[x], fn);
    }

    return this;
  }

  *indexed(by, to) {
    yield* columnsMapper.indexed(this.rows, by, to);
  }

  *entryIndexed(kv, by, to) {
    yield* matrixMapper.entryIndexed(matrixAlgebra.transpose(this.rows), kv, by, to);
  }

  *tripletIndexed(xyz, by, to) {
    yield* matrixMapper.tripletIndexed(matrixAlgebra.transpose(this.rows), xyz, by, to);
  }

  *indexedTo(to) {
    yield* columnsMapper.indexedTo(this.rows, to);
  }

  *entryIndexedTo(kv, to) {
    yield* matrixMapper.entryIndexedTo(matrixAlgebra.transpose(this.rows), kv, to);
  }

  *tripletIndexedTo(xyz, to) {
    yield* matrixMapper.tripletIndexedTo(matrixAlgebra.transpose(this.rows), xyz, to);
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
  } // mapKeys(fn) { return new YMappable({head: this.head.map(fn), rows: shallow(this.rows)})}
  // map(keys, fn) {
  //   keys = Labels.prototype.indexesOf.call(this.head, keys)
  //   const rows = shallow(this.rows)
  //   for (let row of rows) for (let y of keys) row[y] = fn(row[y])
  //   return new YMappable({head: this.head.slice(), rows})
  // }


  mutateKeys(fn) {
    return vectorMapper.mutate(this.head, fn), this;
  }

  mutateValues(fn) {
    return matrixMapper.mutate(this.rows, fn), this;
  }

  mutate(keys, fn) {
    keys = Labels.prototype.indexesOf.call(this.head, keys);

    for (let row of this.rows) for (let y of keys) row[y] = fn(row[y]);

    return this;
  }

  *indexed(by, to) {
    yield* matrixMapper.indexed(this.rows, by, to);
  }

  *entryIndexed(kv, by, to) {
    yield* matrixMapper.entryIndexed(this.rows, kv, by, to);
  }

  *tripletIndexed(xyz, by, to) {
    yield* matrixMapper.tripletIndexed(this.rows, xyz, by, to);
  }

  *indexedTo(to) {
    yield* matrixMapper.indexedTo(this.rows, to);
  }

  *entryIndexedTo(kv, to) {
    yield* matrixMapper.entryIndexedTo(this.rows, kv, to);
  }

  *tripletIndexedTo(xyz, to) {
    yield* matrixMapper.tripletIndexedTo(this.rows, xyz, to);
  }

}

exports.Labels = Labels;
exports.XMappable = XMappable;
exports.YMappable = YMappable;
