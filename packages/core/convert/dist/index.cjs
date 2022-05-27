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
  #init = null;
  #base = null;

  constructor(el) {
    el instanceof Function ? this.#init = el : this.#base = el;
  }

  static build(el) {
    return new Sparse(el);
  }

  static from(nested) {
    const sparse = new Sparse();

    for (let [x, y, v] of indexed(nested)) sparse.update(x, y, v);

    return sparse;
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
    for (let x in this) delete this[x];
  }

  get zero() {
    var _this$init;

    return ((_this$init = this.#init) === null || _this$init === void 0 ? void 0 : _this$init.call(this)) ?? this.#base;
  }

  cell(x, y) {
    const row = this[x];
    return row ? row[y] : null;
  }

  cellOrInit(x, y) {
    const row = this[x] ?? (this[x] = {});
    return row[y] ?? (row[y] = this.zero);
  }

  row(x) {
    return this[x] ?? (this[x] = {});
  }

  rowOn(x, y) {
    const row = this[x] ?? (this[x] = {});
    if (!(y in row)) row[y] = this.zero;
    return row;
  }

  update(x, y, v) {
    (this[x] ?? (this[x] = {}))[y] = v;
  }

  collect(iter) {
    for (let [x, y, v] of iter) this.update(x, y, v);

    return this;
  }

  *indexed(by, to) {
    yield* indexed(this, by, to);
  }

  *indexedTo(to) {
    yield* indexedTo(this, to);
  }

  get side() {
    return Object.keys(this);
  }

  get head() {
    const vec = [];

    for (let x in this) for (let y in this[x]) if (!~vec.indexOf(y)) vec.push(y);

    return vec;
  }

  crostab(to, nu) {
    const {
      side,
      head
    } = this,
          ht = side.length,
          wd = head.length;
    const rows = nu instanceof Function ? init(ht, wd, nu) : iso(ht, wd, nu);
    const crostab$1 = crostab.Crostab.build(side, head, rows);

    for (let [x, y, v] of this) {
      crostab$1.update(x, y, to ? to(v) : v);
    }

    return crostab$1;
  }

}

const sparseToCrostab = (sparse, element) => {
  const crostab$1 = crostab.DynamicCrostab.build(element);

  for (let [x, y, v] of indexed(sparse)) crostab$1.update(x, y, v);

  return crostab.Crostab.from(crostab$1);
};
function crostabToSparse(crostab$1, by, to) {
  return Sparse.build().collect(crostab.indexed(crostab$1, by, to));
}

exports.crostabToSparse = crostabToSparse;
exports.sparseToCrostab = sparseToCrostab;
