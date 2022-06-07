'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var crostab = require('@analyz/crostab');
var nullish = require('@typen/nullish');
var enumPivotMode = require('@analys/enum-pivot-mode');
var scarce = require('@analyz/scarce');

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
}

// public field is not allowed to be assigned to Sparse instance

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

function transpose(sparse) {
  const target = new Sparse();

  for (let [xi, yi, v] of sparse.indexed()) target.update(yi, xi, v);

  return target;
}

class IntoList extends Sparse {
  constructor(fill = scarce.List.build) {
    super(fill);
  }

  static build(fill) {
    return new IntoList(fill);
  }

  static gather(iter) {
    return IntoList.build().collect(iter);
  }

  update(x, y, v) {
    this.cellOrInit(x, y).push(v);
  }

}
class IntoMax extends Sparse {
  constructor(fill = Number.NEGATIVE_INFINITY) {
    super(fill);
  }

  static build(fill) {
    return new IntoMax(fill);
  }

  static gather(iter) {
    return IntoMax.build().collect(iter);
  }

  update(x, y, v) {
    const row = this.rowOn(x, y);
    if (v > row[y]) row[y] = v;
  }

}
class IntoMin extends Sparse {
  constructor(fill = Number.POSITIVE_INFINITY) {
    super(fill);
  }

  static build(fill) {
    return new IntoMin(fill);
  }

  static gather(iter) {
    return IntoMin.build().collect(iter);
  }

  update(x, y, v) {
    const row = this.rowOn(x, y);
    if (v < row[y]) row[y] = v;
  }

}
class IntoAverage extends Sparse {
  constructor(fill = scarce.Vast.build) {
    super(fill);
  }

  static build(fill) {
    return new IntoAverage(fill);
  }

  static gather(iter) {
    return IntoAverage.build().collect(iter);
  }

  update(x, y, v) {
    this.rowOn(x, y)[y].record(v);
  }

}
class IntoSum extends Sparse {
  constructor(fill = 0) {
    super(fill);
  }

  static build(fill) {
    return new IntoSum(fill);
  }

  static gather(iter) {
    return IntoSum.build().collect(iter);
  }

  update(x, y, v) {
    this.rowOn(x, y)[y] += v;
  }

}
class IntoCount extends Sparse {
  constructor(fill = 0) {
    super(fill);
  }

  static build(fill) {
    return new IntoCount(fill);
  }

  static gather(iter) {
    return IntoCount.build().collect(iter);
  }

  update(x, y, _) {
    this.rowOn(x, y)[y]++;
  }

}
class IntoFirst extends Sparse {
  constructor() {
    super(null);
  }

  static build() {
    return new IntoFirst();
  }

  static gather(iter) {
    return IntoFirst.build().collect(iter);
  }

  update(x, y, v) {
    const row = this.row(x);
    if (nullish.nullish(row[y])) row[y] = v;
  }

}
class IntoLast extends Sparse {
  constructor() {
    super(null);
  }

  static build() {
    return new IntoLast();
  }

  static gather(iter) {
    return IntoLast.build().collect(iter);
  }

  update(x, y, v) {
    if (nullish.nullish(v)) return;
    const row = this.row(x);
    row[y] = v;
  }

}

class Stat {
  static of(mode) {
    if (mode === enumPivotMode.ACCUM) return new IntoList();
    if (mode === enumPivotMode.AVERAGE) return new IntoAverage();
    if (mode === enumPivotMode.COUNT) return new IntoCount();
    if (mode === enumPivotMode.INCRE) return new IntoSum();
    if (mode === enumPivotMode.MAX) return new IntoMax();
    if (mode === enumPivotMode.MIN) return new IntoMin();
    if (mode === enumPivotMode.FIRST) return new IntoFirst();
    if (mode === enumPivotMode.LAST) return new IntoLast();
    return new IntoList();
  }

}

exports.IntoAverage = IntoAverage;
exports.IntoFirst = IntoFirst;
exports.IntoLast = IntoLast;
exports.IntoList = IntoList;
exports.IntoMax = IntoMax;
exports.IntoMin = IntoMin;
exports.IntoSum = IntoSum;
exports.Sparse = Sparse;
exports.Stat = Stat;
exports.transpose = transpose;
