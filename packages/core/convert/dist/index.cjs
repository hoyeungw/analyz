'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var crostab = require('@analyz/crostab');

function iso(h, w, v) {
  const mx = Array(h);

  for (let i = 0, j, row; i < h; i++) for (j = 0, mx[i] = row = Array(w); j < w; j++) row[j] = v;

  return mx;
}

function init(h, w, fn) {
  const mx = Array(h);

  for (let i = 0, j, row; i < h; i++) for (j = 0, mx[i] = row = Array(w); j < w; j++) row[j] = fn(i, j);

  return mx;
}

function* indexedOf(sparse) {
  let row;

  for (let x in sparse) {
    for (let y in row = sparse[x]) {
      yield [x, y, row[y]];
    }
  }
}

function* indexedBy(sparse, by) {
  let row;

  for (let x in sparse) {
    for (let y in row = sparse[x]) {
      const v = row[y];
      if (by(x, y, v)) yield [x, y, v];
    }
  }
}

function* indexedTo(sparse, to) {
  if (!to) {
    return yield* indexedOf(sparse);
  }

  let row;

  for (let x in sparse) {
    for (let y in row = sparse[x]) {
      yield to(x, y, row[y]);
    }
  }
}

function* indexed(sparse, by, to) {
  if (!to) {
    return yield* !by ? indexedOf(sparse) : indexedBy(sparse, by);
  }

  let row;

  for (let x in sparse) {
    for (let y in row = sparse[x]) {
      const v = row[y];
      if (by(x, y, v)) yield to(x, y, v);
    }
  }
} // public field is not allowed to be assigned to Sparse instance


class Sparse {
  data;
  #init = null;
  #base = null;

  constructor(fill, data) {
    fill instanceof Function ? this.#init = fill : this.#base = fill;
    this.data = data ?? {};
  }

  static build(fill, data) {
    return new Sparse(fill, data);
  }

  static from(nested) {
    return new Sparse(null, nested);
  }

  static gather(iter) {
    const sparse = new Sparse();

    for (let [x, y, v] of iter) sparse.update(x, y, v);

    return sparse;
  }

  [Symbol.iterator]() {
    return this.indexed();
  }

  clear() {
    for (let x in this.data) delete this.data[x];
  }

  get zero() {
    var _this$init;

    return ((_this$init = this.#init) === null || _this$init === void 0 ? void 0 : _this$init.call(this)) ?? this.#base;
  }

  cell(x, y) {
    const row = this.data[x];
    return row ? row[y] : null;
  }

  cellOrInit(x, y) {
    const row = this.data[x] ?? (this.data[x] = {});
    return row[y] ?? (row[y] = this.zero);
  }

  row(x) {
    return this.data[x] ?? (this.data[x] = {});
  }

  rowOn(x, y) {
    const row = this.data[x] ?? (this.data[x] = {});
    if (!(y in row)) row[y] = this.zero;
    return row;
  }

  update(x, y, v) {
    (this.data[x] ?? (this.data[x] = {}))[y] = v;
  }

  collect(iter) {
    for (let [x, y, v] of iter) this.update(x, y, v);

    return this;
  }

  *indexed(by, to) {
    yield* indexed(this.data, by, to);
  }

  *indexedTo(to) {
    yield* indexedTo(this.data, to);
  }

  get side() {
    return Object.keys(this.data);
  }

  get head() {
    const vec = [];

    for (let x in this.data) for (let y in this.data[x]) if (!~vec.indexOf(y)) vec.push(y);

    return vec;
  }

  crostab(to, fill) {
    const {
      side,
      head
    } = this,
          ht = side.length,
          wd = head.length;
    const rows = fill instanceof Function ? init(ht, wd, fill) : iso(ht, wd, fill);
    const crostab$1 = crostab.Crostab.build(side, head, rows);

    for (let [x, y, v] of this) {
      crostab$1.update(x, y, to ? to(v) : v);
    }

    return crostab$1;
  }

}

const sparseToCrostab = (sparse, fill) => {
  const crostab$1 = crostab.Crostat.build(fill);

  for (let [x, y, v] of sparse) crostab$1.update(x, y, v);

  return crostab.Crostab.from(crostab$1);
};
function crostabToSparse(crostab$1, by, to) {
  return Sparse.build().collect(crostab.indexed(crostab$1, by, to));
}

exports.crostabToSparse = crostabToSparse;
exports.sparseToCrostab = sparseToCrostab;
