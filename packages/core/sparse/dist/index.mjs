import { nullish } from '@typen/nullish';

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
  #init = null;
  #val = null;

  constructor(el) {
    el instanceof Function ? this.#init = el : this.#val = el;
  }

  clear() {
    for (let x in this) delete this[x];
  }

  get zero() {
    var _this$init;

    return ((_this$init = this.#init) === null || _this$init === void 0 ? void 0 : _this$init.call(this)) ?? this.#val;
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

}

function transpose(sparse) {
  const s = new Sparse();

  for (let [xi, yi, v] of indexed(sparse)) s.update(yi, xi, v);

  return s;
}

class List extends Array {
  constructor() {
    super();
  }

  static build() {
    return new List();
  }

  get count() {
    return this.length;
  }

  get sum() {
    return this.reduce((a, b) => a + b, 0);
  }

  get average() {
    return this.length ? this.sum / this.length : 0;
  }

  get max() {
    return Math.max.apply(null, this);
  }

  get min() {
    return Math.min.apply(null, this);
  }

}
class CrosList extends Sparse {
  constructor(el = List.build) {
    super(el);
  }

  static build(el) {
    return new CrosList(el);
  }

  update(x, y, v) {
    this.cellOrInit(x, y).push(v);
  } // toObject(fn) { return {side: this.side, head: this.head, rows: mapper(this.rows, fn ?? (li => li.average))} }


}
class CrosMax extends Sparse {
  constructor(el = Number.NEGATIVE_INFINITY) {
    super(el);
  }

  static build(el) {
    return new CrosMax(el);
  }

  update(x, y, v) {
    const row = this.rowOn(x, y);
    if (v > row[y]) row[y] = v;
  }

}
class CrosMin extends Sparse {
  constructor(el = Number.POSITIVE_INFINITY) {
    super(el);
  }

  static build(el) {
    return new CrosMin(el);
  }

  update(x, y, v) {
    const row = this.rowOn(x, y);
    if (v < row[y]) row[y] = v;
  }

}
class CrosSum extends Sparse {
  constructor(el = 0) {
    super(el);
  }

  static build(el) {
    return new CrosSum(el);
  }

  update(x, y, v) {
    this.rowOn(x, y)[y] += v;
  }

}
class CrosFirst extends Sparse {
  constructor() {
    super(null);
  }

  static build() {
    return new CrosSum();
  }

  update(x, y, v) {
    const row = this.row(x);
    if (nullish(row[y])) row[y] = v;
  }

}
class CrosLast extends Sparse {
  constructor() {
    super(null);
  }

  static build() {
    return new CrosSum();
  }

  update(x, y, v) {
    if (nullish(v)) return;
    const row = this.row(x);
    row[y] = v;
  }

}

export { CrosFirst, CrosLast, CrosList, CrosMax, CrosMin, CrosSum, Sparse, indexed, indexedBy, indexedOf, indexedTo, transpose };
