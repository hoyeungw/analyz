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

  row(x) {
    return this[x] ?? (this[x] = {});
  }

}

function transpose(sparse) {
  const s = new Sparse();

  for (let [xi, yi, v] of indexed(sparse)) s.update(yi, xi, v);

  return s;
}

export { Sparse, indexed, indexedBy, indexedOf, indexedTo, transpose };
