'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var crostab = require('@analyz/crostab');

function mutate$1(vec, fn, l) {
  l = l || (vec === null || vec === void 0 ? void 0 : vec.length);

  for (--l; l >= 0; l--) vec[l] = fn.call(this, vec[l], l);

  return vec;
}

function* indexedOf$2(vec) {
  // for (let i = 0, h = vec?.length; i < h; i++) yield vec[i]
  yield* vec;
}

function* indexedBy$2(vec, by) {
  for (let i = 0, h = vec === null || vec === void 0 ? void 0 : vec.length, el; i < h; i++) if (by(el = vec[i], i)) yield el;
}

function* indexedTo$2(vec, to) {
  if (!to) {
    return yield* indexedOf$2(vec);
  }

  for (let i = 0, h = vec === null || vec === void 0 ? void 0 : vec.length; i < h; i++) yield to(vec[i], i);
}

function* indexed$2(vec, by, to) {
  if (!to) {
    return yield* !by ? indexedOf$2(vec) : indexedBy$2(vec, by);
  }

  for (let i = 0, h = vec === null || vec === void 0 ? void 0 : vec.length, el; i < h; i++) if (by(el = vec[i], i)) yield to(el, i);
}

const width = mx => {
  var _mx$;

  return mx !== null && mx !== void 0 && mx.length ? (_mx$ = mx[0]) === null || _mx$ === void 0 ? void 0 : _mx$.length : null;
};

function column(y, h) {
  const mx = this,
        col = Array(h ?? (h = this === null || this === void 0 ? void 0 : this.length));

  for (--h; h >= 0; h--) col[h] = mx[h][y];

  return col;
}

function* indexedOf$1(mx) {
  for (let j = 0, w = width(mx); j < w; j++) yield column.call(mx, j);
}

function* indexedBy$1(mx, by) {
  for (let j = 0, w = width(mx), col; j < w; j++) if (by(col = column.call(mx, j), j)) yield col;
}

function* indexedTo$1(mx, to) {
  if (!to) {
    return yield* indexedOf$1(mx);
  }

  for (let j = 0, w = width(mx); j < w; j++) yield to(column.call(mx, j), j);
}

function* indexed$1(mx, by, to) {
  if (!to) return yield* !by ? indexedOf$1(mx) : indexedBy$1(mx, by);

  for (let j = 0, w = width(mx), col; j < w; j++) if (by(col = column.call(mx, j), j)) yield to(col, j);
}

/**
 * Iterate through elements on each (x of rows,y of columns) coordinate of a 2d-array.
 * @param {*[][]} mx
 * @param {function} fn
 * @param {number} [h]
 * @param {number} [w]
 * @returns {*[]}
 */

function mapper(mx, fn, h, w) {
  var _mx$;

  h = h || (mx === null || mx === void 0 ? void 0 : mx.length), w = w || h && ((_mx$ = mx[0]) === null || _mx$ === void 0 ? void 0 : _mx$.length);
  const tx = Array(h);

  for (let i = 0, j, r, tr; i < h; i++) for (tx[i] = tr = Array(w), r = mx[i], j = 0; j < w; j++) tr[j] = fn(r[j], i, j);

  return tx;
}

function mutate(mx, fn, h, w) {
  var _mx$3;

  h = h || (mx === null || mx === void 0 ? void 0 : mx.length), w = w || h && ((_mx$3 = mx[0]) === null || _mx$3 === void 0 ? void 0 : _mx$3.length);

  for (let i = 0, j, r; i < h; i++) for (j = 0, r = mx[i]; j < w; j++) r[j] = fn(r[j], i, j);

  return mx;
}

function* indexedOf(mx) {
  if (mx) for (let i = 0, h = mx.length; i < h; i++) {
    const row = mx[i];
    if (row) for (let j = 0, w = row.length; j < w; j++) {
      yield [row[j], i, j];
    }
  }
}

function* indexedBy(mx, by) {
  if (mx) for (let i = 0, h = mx.length; i < h; i++) {
    const row = mx[i];
    if (row) for (let j = 0, w = row.length; j < w; j++) {
      const val = row[j];
      if (by(val, i, j)) yield [val, i, j];
    }
  }
}

function* indexedTo(mx, to) {
  if (!to) {
    return yield* indexedOf(mx);
  }

  if (mx) for (let i = 0, h = mx.length; i < h; i++) {
    const row = mx[i];
    if (row) for (let j = 0, w = row.length; j < w; j++) {
      yield to(row[j], i, j);
    }
  }
}

function* indexed(mx, by, to) {
  if (!to) {
    return yield* !by ? indexedOf(mx) : indexedBy(mx, by);
  }

  if (mx) for (let i = 0, h = mx.length; i < h; i++) {
    const row = mx[i];
    if (row) for (let j = 0, w = row.length; j < w; j++) {
      const val = row[j];
      if (by(val, i, j)) yield to(val, i, j);
    }
  }
}

function* entryIndexedOf(rows, [k, v]) {
  for (let row of rows) {
    yield [row[k], row[v]];
  }
}

function* entryIndexedBy(rows, [k, v], by) {
  for (let row of rows) {
    const x = row[k],
          y = row[v];
    if (by(x, y)) yield [x, y];
  }
}

function* entryIndexedTo(rows, [k, v], to) {
  if (!to) {
    return yield* entryIndexedOf(rows, [k, v]);
  }

  for (let row of rows) {
    yield to(row[k], row[v]);
  }
}
/**
 *
 * @param {*[][]|*[][]} rows
 * @param {[*,*]} kv
 * @param {function(*,*):boolean} [by]
 * @param {function(*,*):*} [to]
 * @returns {Generator<*, void, *>}
 */


function* entryIndexed(rows, kv, by, to) {
  if (!to) {
    return yield* !by ? entryIndexedOf(rows, kv) : entryIndexedBy(rows, kv, by);
  }

  const [k, v] = kv;

  for (let row of rows) {
    const x = row[k],
          y = row[v];
    if (by(x, y)) yield to(x, y);
  }
}

function* tripletIndexedOf(rows, [xi, yi, zi]) {
  for (let row of rows) yield [row[xi], row[yi], row[zi]];
}

function* tripletIndexedBy(rows, [xi, yi, zi], by) {
  for (let row of rows) {
    const x = row[xi],
          y = row[yi],
          z = row[zi];
    if (by(x, y, z)) yield to(x, y, z);
  }
}

function* tripletIndexedTo(rows, [xi, yi, zi], to) {
  for (let row of rows) yield to(row[xi], row[yi], row[zi]);
}
/**
 *
 * @param {*[][]} rows
 * @param {[*,*,*]} xyz
 * @param {function(*,*,*):boolean} [by]
 * @param {function(*,*,*):*} [to]
 * @returns {Generator<*, void, *>}
 */


function* tripletIndexed(rows, xyz, by, to) {
  if (!to) {
    return yield* !by ? tripletIndexedOf(rows, xyz) : tripletIndexedBy(rows, xyz, by);
  }

  const [xi, yi, zi] = xyz;

  for (let row of rows) {
    const x = row[xi],
          y = row[yi],
          z = row[zi];
    if (by(x, y, z)) yield to(x, y, z);
  }
}

class ProxyFab {
  static columnsProxy(rows) {
    return new Proxy(rows, {
      get(rows, yi) {
        return rows.map(row => row[yi]);
      },

      set(rows, yi, column) {
        for (let i = 0, h = rows.length; i < h; i++) {
          rows[i][yi] = column[i];
        }

        return true;
      }

    });
  }

}

class Matrix extends Array {
  /** @type {Array} */
  #cols;

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

  get rows() {
    return this;
  }
  /** @returns {Array} */


  get columns() {
    return this.#cols ?? (this.#cols = ProxyFab.columnsProxy(this));
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

  *rowIter(x) {
    yield* this[x];
  }

  *columnIter(y) {
    for (let i = 0, h = this.length; i < h; i++) yield this[i][y];
  }

  *rowsBy(by, to) {
    yield* indexed$2(this, by, to);
  }

  *columnsBy(by, to) {
    yield* indexed$1(this, by, to);
  }

  *pointsBy(by, to) {
    yield* indexed(this, by, to);
  }

  *entriesBy(xy, by, to) {
    yield* entryIndexed(this, xy, to);
  }

  *tripletsBy(xyz, by, to) {
    yield* tripletIndexed(this, xyz, by, to);
  }

  *rowsTo(to) {
    yield* indexedTo$2(this, to);
  }

  *columnsTo(to) {
    yield* indexedTo$1(this, to);
  }

  *pointsTo(to) {
    yield* indexedTo(this, to);
  }

  *entriesTo(xy, to) {
    yield* entryIndexedTo(this, xy, to);
  }

  *tripletsTo(xyz, to) {
    yield* tripletIndexedTo(this, xyz, to);
  }

}

const shallow = mx => mx.map(r => r.slice());

class Table {
  /** @type {string[]} */
  head;
  /** @type {any[][]}  */

  rows;
  /** @type {string}   */

  title;
  /** @type {Headward} */

  #yward;

  constructor(head, rows, title) {
    this.head = head ?? [];
    this.rows = rows ?? [];
    this.title = title;
  }

  static build(head, rows, title) {
    return new Table(head, rows, title);
  }

  static from(o = {}) {
    return new Table(o.head, o.rows, o.title);
  }
  /** @returns {Headward} */


  get headward() {
    return this.#yward ?? (this.#yward = new crostab.Headward(this));
  }

  collect(rows) {
    for (let row of rows) this.rows.push(row);

    return this;
  }

  get height() {
    return this.rows.length;
  }

  get width() {
    return this.head.length;
  }

  [Symbol.iterator]() {
    return indexedOf$2(this);
  }

  coin(y) {
    return this.head.indexOf(y);
  }

  column(y) {
    return Matrix.prototype.column.call(this.coin(y));
  }

  map(fn) {
    return Table.build(this.head.slice(), mapper(this.rows, fn), this.title);
  }

  filter(y, fn) {
    return y = this.head.indexOf(y), Table.build(this.head.slice(), this.rows.filter(row => fn(row[y])), this.title);
  }

  sort(y, comp) {
    y = this.head.indexOf(y);
    if (!~y) return this;
    this.rows.sort((ra, rb) => comp(ra[y], rb[y]));
    return this;
  }

  mutate(fn) {
    return mutate(this.rows, fn), this;
  }

  mutateKeys(fn) {
    return mutate$1(this.head, fn), this;
  }

  slice() {
    return Table.build(this.head.slice(), shallow(this.rows), this.title);
  }

  crostab(x, y, v, mode, by) {
    return crostab.Stat.of(mode).collect(this.headward.tripletIndexed([x, y, v], by));
  }

}

class Flatward {
  head;
  rows;

  constructor(head, rows) {
    this.head = head;
    this.rows = rows;
  }

  static build(head, rows) {
    return new Flatward(head, rows);
  }

  static from(o = {}) {
    return new Flatward(o.head, o.rows);
  }

  *rowsIndexed() {
    yield this.head;

    for (let i = 0, h = this.side.length; i < h; i++) yield this.rows[i];
  }

  *columnsIndexed() {
    yield this.sideIndexed();

    for (let j = 0, w = this.head.length; j < w; j++) yield this.columnIndexed(j);
  }

  *columnIndexed(yi) {
    yield this.head[yi];

    for (let i = 0, h = this.rows.length; i < h; i++) yield this[i][yi];
  }

}

exports.Flatward = Flatward;
exports.Table = Table;
