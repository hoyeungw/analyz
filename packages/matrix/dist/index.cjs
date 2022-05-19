'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var matrixMapper = require('@vect/matrix-mapper');
var columnsMapper = require('@vect/columns-mapper');
var vectorMapper = require('@vect/vector-mapper');

class Matrix extends Array {
  constructor(size) {
    super(size);
  }

  static of(...rows) {
    return new Matrix(rows === null || rows === void 0 ? void 0 : rows.length).collect(rows);
  }

  static from(rows) {
    return new Matrix(rows === null || rows === void 0 ? void 0 : rows.length).collect(rows);
  }

  get height() {
    return this.length;
  }

  get width() {
    var _this$;

    return (_this$ = this[0]) === null || _this$ === void 0 ? void 0 : _this$.length;
  }

  get size() {
    return [this.height, this.width];
  }

  collect(iter, lo = 0) {
    for (let row of iter) this[lo++] = row;

    return this;
  }

  row(x) {
    return this[x];
  }

  column(y) {
    let h = this.length,
        col = Array(h);

    for (--h; h >= 0; h--) col[h] = this[h][y];

    return col;
  }

  *rowOf(x) {
    yield* this[x];
  }

  *columnOf(y) {
    for (let i = 0, h = this.length; i < h; i++) yield this[i][y];
  }

  *rows(by, to) {
    yield* vectorMapper.indexed(this, by, to);
  }

  *columns(by, to) {
    yield* columnsMapper.columns(this, by, to);
  }

  *points(by, to) {
    yield* matrixMapper.points(this, by, to);
  }

  *entries(xy, by, to) {
    yield* matrixMapper.entries(this, xy, to);
  }

  *triplets(xyz, by, to) {
    yield* matrixMapper.triplets(this, xyz, by, to);
  }

  *rowsTo(to) {
    yield* vectorMapper.indexedTo(this, to);
  }

  *columnsTo(to) {
    yield* columnsMapper.columnsTo(this, to);
  }

  *pointsTo(to) {
    yield* matrixMapper.pointsTo(this, to);
  }

  *entriesTo(xy, to) {
    yield* matrixMapper.entriesTo(this, xy, to);
  }

  *tripletsTo(xyz, to) {
    yield* matrixMapper.tripletsTo(this, xyz, to);
  }

}

exports.Matrix = Matrix;
