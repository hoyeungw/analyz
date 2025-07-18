import { Crostab } from '@analyz/crostab';
import { init, iso } from '@vect/matrix-init';
import { ACCUM, AVERAGE, COUNT, INCRE, MAX, MIN, FIRST, LAST } from '@analys/enum-pivot-mode';
import { List, Vast } from '@analyz/list';
import { nullish } from '@typen/nullish';

function* indexedOf(sparse) {
  let row;
  for (let x in sparse) {
    for (let y in (row = sparse[x])) {
      yield [x, y, row[y]];
    }
  }
}

function* indexedBy(sparse, by) {
  let row;
  for (let x in sparse) {
    for (let y in (row = sparse[x])) {
      const v = row[y];
      if (by(x, y, v)) yield [x, y, v];
    }
  }
}

function* indexedTo(sparse, to) {
  if (!to) { return yield* indexedOf(sparse) }
  let row;
  for (let x in sparse) {
    for (let y in (row = sparse[x])) {
      yield to(x, y, row[y]);
    }
  }
}

function* indexed(sparse, by, to) {
  if (!to) { return yield* (!by ? indexedOf(sparse) : indexedBy(sparse, by)) }
  let row;
  for (let x in sparse) {
    for (let y in (row = sparse[x])) {
      const v = row[y];
      if (by(x, y, v)) yield to(x, y, v);
    }
  }
}

// only private field is allowed to be assigned to Sparse instance
// public field is not allowed to be assigned to Sparse instance

class Sparse {
  data
  #init = null
  #base = null
  constructor(fill, data) {
    fill instanceof Function ? (this.#init = fill) : (this.#base = fill);
    this.data = data ?? {};
  }
  static build(fill, data) { return new Sparse(fill, data) }
  static from(nested) { return new Sparse(null, nested) }
  static gather(iter) {
    const sparse = new Sparse();
    for (let [x, y, v] of iter) sparse.update(x, y, v);
    return sparse
  }

  [Symbol.iterator]() { return this.indexed() }
  clear() { for (let x in this.data) delete this.data[x]; }
  get zero() { return this.#init?.call(this) ?? this.#base }
  cell(x, y) {
    const row = this.data[x];
    return row ? row[y] : null
  }
  cellOrInit(x, y) {
    const row = this.data[x] ?? (this.data[x] = {});
    return row[y] ?? (row[y] = this.zero)
  }
  row(x) { return this.data[x] ?? (this.data[x] = {}) }
  rowOn(x, y) {
    const row = this.data[x] ?? (this.data[x] = {});
    if (!(y in row)) row[y] = this.zero;
    return row
  }
  update(x, y, v) { (this.data[x] ?? (this.data[x] = {}))[y] = v; }
  collect(iter) {
    for (let [x, y, v] of iter) this.update(x, y, v);
    return this
  }
  * indexed(by, to) { yield* indexed(this.data, by, to); }
  * indexedTo(to) { yield* indexedTo(this.data, to); }
  get side() { return Object.keys(this.data) }
  get head() {
    const vec = [];
    for (let x in this.data) for (let y in this.data[x]) if (!~vec.indexOf(y)) vec.push(y);
    return vec
  }
  crostab(to, fill) {
    const { side, head } = this, ht = side.length, wd = head.length;
    const rows = fill instanceof Function ? init(ht, wd, fill) : iso(ht, wd, fill);
    const crostab = Crostab.build(side, head, rows);
    for (let [x, y, v] of this) { crostab.update(x, y, to ? to(v) : v); }
    return crostab
  }
}

function transpose(sparse) {
  const target = new Sparse();
  for (let [xi, yi, v] of sparse.indexed()) target.update(yi, xi, v);
  return target
}

class IntoList extends Sparse {
  constructor(fill = List.build) { super(fill); }
  static build(fill) { return new IntoList(fill) }
  static gather(iter) { return IntoList.build().collect(iter) }
  update(x, y, v) {
    this.cellOrInit(x, y).push(v);
  }
}

class IntoMax extends Sparse {
  constructor(fill = Number.NEGATIVE_INFINITY) { super(fill); }
  static build(fill) { return new IntoMax(fill) }
  static gather(iter) { return IntoMax.build().collect(iter) }
  update(x, y, v) {
    const row = this.rowOn(x, y);
    if (v > row[y]) row[y] = v;
  }
}

class IntoMin extends Sparse {
  constructor(fill = Number.POSITIVE_INFINITY) { super(fill); }
  static build(fill) { return new IntoMin(fill) }
  static gather(iter) { return IntoMin.build().collect(iter) }
  update(x, y, v) {
    const row = this.rowOn(x, y);
    if (v < row[y]) row[y] = v;
  }
}

class IntoAverage extends Sparse {
  constructor(fill = Vast.build) { super(fill); }
  static build(fill) { return new IntoAverage(fill) }
  static gather(iter) { return IntoAverage.build().collect(iter) }
  update(x, y, v) {
    this.rowOn(x, y)[y].record(v);
  }
}

class IntoSum extends Sparse {
  constructor(fill = 0) { super(fill); }
  static build(fill) { return new IntoSum(fill) }
  static gather(iter) { return IntoSum.build().collect(iter) }
  update(x, y, v) {
    this.rowOn(x, y)[y] += v;
  }
}

class IntoCount extends Sparse {
  constructor(fill = 0) { super(fill); }
  static build(fill) { return new IntoCount(fill) }
  static gather(iter) { return IntoCount.build().collect(iter) }
  update(x, y, _) {
    this.rowOn(x, y)[y]++;
  }
}

class IntoFirst extends Sparse {
  constructor() { super(null); }
  static build() { return new IntoFirst() }
  static gather(iter) { return IntoFirst.build().collect(iter) }
  update(x, y, v) {
    const row = this.row(x);
    if (nullish(row[y])) row[y] = v;
  }
}

class IntoLast extends Sparse {
  constructor() { super(null); }
  static build() { return new IntoLast() }
  static gather(iter) { return IntoLast.build().collect(iter) }
  update(x, y, v) {
    if (nullish(v)) return
    const row = this.row(x);
    row[y] = v;
  }
}

class Stat {
  static of(mode) {
    if (mode === ACCUM) return new IntoList()
    if (mode === AVERAGE) return new IntoAverage()
    if (mode === COUNT) return new IntoCount()
    if (mode === INCRE) return new IntoSum()
    if (mode === MAX) return new IntoMax()
    if (mode === MIN) return new IntoMin()
    if (mode === FIRST) return new IntoFirst()
    if (mode === LAST) return new IntoLast()
    return new IntoList()
  }
}

export { IntoAverage, IntoFirst, IntoLast, IntoList, IntoMax, IntoMin, IntoSum, Sparse, Stat, transpose };
