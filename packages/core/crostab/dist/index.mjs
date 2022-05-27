import { mutate, mapper } from '@vect/matrix-mapper';
import { Matrix } from '@analyz/matrix';
import { transpose } from '@vect/matrix-algebra';
import { shallow } from '@vect/matrix-init';
import { mutate as mutate$1 } from '@vect/vector-mapper';
import { XIndexable, YIndexable, ProxyFab } from '@analyz/indexable';
import { XMappable, YMappable } from '@analyz/mappable';
import { XSelectable, YSelectable } from '@analyz/selectable';
import { XUpdatable, YUpdatable } from '@analyz/updatable';
import { mixin } from '@ject/mixin';

function* indexedOf(crostab) {
  const {
    side,
    head,
    rows
  } = crostab;
  const h = side === null || side === void 0 ? void 0 : side.length,
        w = head === null || head === void 0 ? void 0 : head.length;

  for (let i = 0; i < h; i++) for (let j = 0; j < w; j++) yield [side[i], head[j], rows[i][j]];
}
function* indexedBy(crostab, by) {
  const {
    side,
    head,
    rows
  } = crostab;
  const h = side === null || side === void 0 ? void 0 : side.length,
        w = head === null || head === void 0 ? void 0 : head.length;

  for (let i = 0; i < h; i++) for (let j = 0; j < w; j++) if (by(side[i], head[j], rows[i][j])) yield [side[i], head[j], rows[i][j]];
}
function* indexedTo(crostab, to) {
  if (!to) return yield* indexedOf(crostab);
  const {
    side,
    head,
    rows
  } = crostab;
  const h = side === null || side === void 0 ? void 0 : side.length,
        w = head === null || head === void 0 ? void 0 : head.length;

  for (let i = 0; i < h; i++) for (let j = 0; j < w; j++) yield to(side[i], head[j], rows[i][j]);
}
function* indexed(crostab, by, to) {
  if (!to) return yield* !by ? indexedOf(crostab) : indexedBy(crostab, by);
  const {
    side,
    head,
    rows
  } = crostab;
  const h = side === null || side === void 0 ? void 0 : side.length,
        w = head === null || head === void 0 ? void 0 : head.length;

  for (let i = 0; i < h; i++) for (let j = 0; j < w; j++) if (by(side[i], head[j], rows[i][j])) yield to(side[i], head[j], rows[i][j]);
}

/**
 * @typedef {Object} Sideward.at
 */

/**
 * @class
 * @typedef Sideward
 * @type {Class}
 * @property {function():Sideward} Sideward.mutate
 * @property {function():Sideward} Sideward.mutateKeys
 * @property {function():Sideward} Sideward.mutateValues
 * @property {function():Generator} Sideward.indexed
 * @property {function():Generator} Sideward.entryIndexed
 * @property {function():Generator} Sideward.tripletIndexed
 * @property {function():Generator} Sideward.indexedTo
 * @property {function():Generator} Sideward.entryIndexedTo
 * @property {function():Generator} Sideward.tripletIndexedTo
 * @property {function():Sideward} Sideward.select
 * @property {function():Sideward} Sideward.selectAs
 * @property {function():Sideward} Sideward.filterKeys
 * @property {function():Sideward} Sideward.filterKeysBy
 * @property {function():Sideward} Sideward.sortKeys
 * @property {function():Sideward} Sideward.sortKeysBy
 * @property {function():Sideward} Sideward.set
 * @property {function():Sideward} Sideward.delete
 * @property {function():Sideward} Sideward.prepend
 * @property {function():Sideward} Sideward.append
 * @property {function():Sideward} Sideward.shift
 * @property {function():Sideward} Sideward.pop
 * @property {function():Sideward} Sideward.grow
 */

const Sideward$1 = mixin(XIndexable, XMappable, XUpdatable, XSelectable);
/**
 * @typedef {Object} Headward.at
 */

/**
 * @class
 * @typedef Headward
 * @typedef {Object} Headward.at
 * @type {Class}
 * @property {Object} Headward.at
 * @property {function():Headward} Headward.mutate
 * @property {function():Headward} Headward.mutateKeys
 * @property {function():Headward} Headward.mutateValues
 * @property {function():Generator} Headward.indexed
 * @property {function():Generator} Headward.entryIndexed
 * @property {function():Generator} Headward.tripletIndexed
 * @property {function():Generator} Headward.indexedTo
 * @property {function():Generator} Headward.entryIndexedTo
 * @property {function():Generator} Headward.tripletIndexedTo
 *
 * @property {function():Headward} Headward.select
 * @property {function():Headward} Headward.selectAs
 * @property {function():Headward} Headward.filterKeys
 * @property {function():Headward} Headward.filterKeysBy
 * @property {function():Headward} Headward.sortKeys
 * @property {function():Headward} Headward.sortKeysBy

 * @property {function():Headward} Headward.set
 * @property {function():Headward} Headward.delete
 * @property {function():Headward} Headward.prepend
 * @property {function():Headward} Headward.append
 * @property {function():Headward} Headward.shift
 * @property {function():Headward} Headward.pop
 * @property {function():Headward} Headward.grow
 */

const Headward$1 = mixin(YIndexable, YMappable, YUpdatable, YSelectable);

class Crostab {
  /** @type {string[]} */
  side;
  /** @type {string[]} */

  head;
  /** @type {any[][]}  */

  rows;
  /** @type {string}   */

  title;
  /** @type {Sideward} */

  #xward;
  /** @type {Headward} */

  #yward;

  constructor(o) {
    this.side = (o === null || o === void 0 ? void 0 : o.side) ?? [];
    this.head = (o === null || o === void 0 ? void 0 : o.head) ?? [];
    this.rows = (o === null || o === void 0 ? void 0 : o.rows) ?? [];
    this.title = o === null || o === void 0 ? void 0 : o.title;
  }

  static build(side, head, rows, title) {
    return new Crostab({
      side,
      head,
      rows,
      title
    });
  }

  static from(o) {
    return new Crostab(o);
  }
  /** @returns {Sideward} */


  get sideward() {
    return this.#xward ?? (this.#xward = new Sideward$1(this));
  }
  /** @returns {Headward} */


  get headward() {
    return this.#yward ?? (this.#yward = new Headward$1(this));
  }

  get height() {
    return this.side.length;
  }

  get width() {
    return this.head.length;
  }

  [Symbol.iterator]() {
    return indexedOf(this);
  }

  roin(x) {
    return this.side.indexOf(x);
  }

  coin(y) {
    return this.head.indexOf(y);
  }

  row(x) {
    return this.rows[this.roin(x)];
  }

  column(y) {
    return Matrix.prototype.column.call(this.coin[y]);
  }

  cell(x, y) {
    const row = this.rows[this.roin(x)];
    return row[this.coin[y]];
  }

  coord(r, c) {
    return {
      x: this.roin(r),
      y: this.coin(c)
    };
  }

  mutate(fn) {
    return mutate(this.rows, fn, this.height, this.width), this;
  }

  mutateKeys(fn) {
    return mutate$1(this.side, fn), mutate$1(this.head, fn), this;
  }

  update(x, y, v) {
    if (~(x = this.roin(x)) && ~(y = this.coin(y))) this.rows[x][y] = v;
  }

  collect(iter) {
    for (let [x, y, v] of iter) this.update(x, y, v);

    return this;
  }

  transpose(title) {
    let {
      side: head,
      head: side,
      rows: columns
    } = this;
    this.side = side, this.head = head, this.rows = transpose(columns), this.title = title ?? this.title;
    return this;
  }

  slice() {
    let {
      side,
      head,
      rows,
      title
    } = this;
    return new Crostab({
      side: side.slice(),
      head: head.slice(),
      rows: shallow(rows),
      title
    });
  }

}

class DynamicCrostab extends Crostab {
  /** @type {function} */
  init = null;
  /** @type {*}        */

  base = null;

  constructor(element) {
    super({
      side: [],
      head: [],
      rows: []
    });
    element instanceof Function ? this.init = element : this.base = element;
  }

  static build(element) {
    return new DynamicCrostab(element);
  }

  static gather(iter) {
    const crostab = new DynamicCrostab();

    for (let [x, y, v] of iter) crostab.update(x, y, v);

    return crostab;
  }

  get zero() {
    var _this$init;

    return ((_this$init = this.init) === null || _this$init === void 0 ? void 0 : _this$init.call(this)) ?? this.base;
  }

  xi(x) {
    const xi = this.side.indexOf(x);
    if (~xi) return xi;
    const wd = this.head.length,
          row = Array(wd);

    for (let i = 0; i < wd; i++) row[i] = this.zero;

    return (this.rows.push(row), this.side.push(x)) - 1;
  }

  yi(y) {
    const yi = this.head.indexOf(y);
    if (~yi) return yi;
    const ht = this.side.length;

    for (let i = 0; i < ht; i++) this.rows[i].push(this.zero);

    return this.head.push(y) - 1;
  }

  update(x, y, v) {
    return this.rows[this.xi(x)][this.yi(y)] = v;
  }

  append(x, y, v) {
    return this.rows[this.xi(x)][this.yi(y)].push(v);
  }

  assign(x, y, k, v) {
    return this.rows[this.xi(x)][this.yi(y)][k] = v;
  }

  cell(x, y) {
    return this.rows[this.xi(x)][this.yi(y)];
  }

  query(x, y) {
    return ~(x = this.side.indexOf(x)) && ~(y = this.head.indexOf(y)) ? this.rows[x][y] : void 0;
  }

  toObject(po) {
    return {
      side: this.side,
      head: this.head,
      rows: po ? mapper(this.rows, po) : this.rows
    };
  }

}

class Headward {
  head;
  rows;

  constructor({
    head,
    rows
  }) {
    this.head = head, this.rows = rows;
  }

  get at() {
    return this._hdi ?? (this._hdi = ProxyFab.headwardIndexer(this));
  }

  mutateKeys(fn) {
    return YMappable.prototype.mutateKeys.call(this, fn);
  }

  mutate(keys, fn) {
    return YMappable.prototype.mutate.call(this, keys, fn);
  }

  *indexed(by, to) {
    yield* YMappable.prototype.indexed.call(this, by, to);
  }

  *entryIndexed(kv, by, to) {
    yield* YMappable.prototype.entryIndexed.call(this, kv, by, to);
  }

  *tripletIndexed(xyz, by, to) {
    yield* YMappable.prototype.tripletIndexed.call(this, xyz, by, to);
  }

  *indexedTo(to) {
    yield* YMappable.prototype.indexedTo.call(this, to);
  }

  *entryIndexedTo(kv, to) {
    yield* YMappable.prototype.entryIndexedTo.call(this, kv, to);
  }

  *tripletIndexedTo(xyz, to) {
    yield* YMappable.prototype.tripletIndexedTo.call(this, xyz, to);
  }

  select(keys) {
    return YSelectable.prototype.select.call(this, keys);
  }

  selectAs(keys) {
    return YSelectable.prototype.selectAs.call(this, keys);
  }

  filterKeys(by) {
    return YSelectable.prototype.filterKeys.call(this, by);
  }

  filterKeysBy(xi, by) {
    return YSelectable.prototype.filterKeysBy.call(this, xi, by);
  }

  sortKeys(comp) {
    return YSelectable.prototype.sortKeys.call(this, comp);
  }

  sortKeysBy(xi, comp) {
    return YSelectable.prototype.sortKeysBy.call(this, xi, comp);
  }

  set(x, row) {
    return YUpdatable.prototype.set.call(this, x, row);
  }

  delete(x) {
    return YUpdatable.prototype.delete.call(this, x);
  }

  prepend(x, row) {
    return YUpdatable.prototype.prepend.call(this, x, row);
  }

  append(x, row) {
    return YUpdatable.prototype.append.call(this, x, row);
  }

  shift() {
    return YUpdatable.prototype.shift.call(this);
  }

  pop() {
    return YUpdatable.prototype.pop.call(this);
  }

  grow(from, to, as, at) {
    return YUpdatable.prototype.grow.call(this, from, to, as, at);
  }

}

class Sideward {
  side;
  rows;

  constructor({
    side,
    rows
  }) {
    this.side = side, this.rows = rows;
  }

  get at() {
    return this._sdi ?? (this._sdi = ProxyFab.sidewardIndexer(this));
  }

  mutateKeys(fn) {
    return XMappable.prototype.mutateKeys.call(this, fn);
  }

  mutate(keys, fn) {
    return XMappable.prototype.mutate.call(this, keys, fn);
  }

  *indexed(by, to) {
    yield* XMappable.prototype.indexed.call(this, by, to);
  }

  *entryIndexed(kv, by, to) {
    yield* XMappable.prototype.entryIndexed.call(this, kv, by, to);
  }

  *tripletIndexed(xyz, by, to) {
    yield* XMappable.prototype.tripletIndexed.call(this, xyz, by, to);
  }

  *indexedTo(to) {
    yield* XMappable.prototype.indexedTo.call(this, to);
  }

  *entryIndexedTo(kv, to) {
    yield* XMappable.prototype.entryIndexedTo.call(this, kv, to);
  }

  *tripletIndexedTo(xyz, to) {
    yield* XMappable.prototype.tripletIndexedTo.call(this, xyz, to);
  }

  select(keys) {
    return XSelectable.prototype.select.call(this, keys);
  }

  selectAs(keys) {
    return XSelectable.prototype.selectAs.call(this, keys);
  }

  filterKeys(by) {
    return XSelectable.prototype.filterKeys.call(this, by);
  }

  filterKeysBy(yi, by) {
    return XSelectable.prototype.filterKeysBy.call(this, yi, by);
  }

  sortKeys(comp) {
    return XSelectable.prototype.sortKeys.call(this, comp);
  }

  sortKeysBy(yi, comp) {
    return XSelectable.prototype.sortKeysBy.call(this, yi, comp);
  }

  set(x, row) {
    return XUpdatable.prototype.set.call(this, x, row);
  }

  delete(x) {
    return XUpdatable.prototype.delete.call(this, x);
  }

  prepend(x, row) {
    return XUpdatable.prototype.prepend.call(this, x, row);
  }

  append(x, row) {
    return XUpdatable.prototype.append.call(this, x, row);
  }

  shift() {
    return XUpdatable.prototype.shift.call(this);
  }

  pop() {
    return XUpdatable.prototype.pop.call(this);
  }

  grow(from, to, as, at) {
    return XUpdatable.prototype.grow.call(this, from, to, as, at);
  }

}

class Flatward {
  side;
  head;
  rows;
  title;

  constructor({
    side,
    head,
    rows,
    title
  }) {
    this.side = side;
    this.head = head;
    this.rows = rows;
    this.title = title;
  }

  static from(crostab) {
    return new Flatward(crostab);
  }

  *rowsIndexed() {
    yield this.headIndexed();

    for (let i = 0, h = this.side.length; i < h; i++) yield this.rowIndexed(i);
  }

  *columnsIndexed() {
    yield this.sideIndexed();

    for (let j = 0, w = this.head.length; j < w; j++) yield this.columnIndexed(j);
  }

  *headIndexed() {
    yield this.title;
    yield* this.head;
  }

  *sideIndexed() {
    yield this.title;
    yield* this.side;
  }

  *rowIndexed(xi) {
    yield this.side[xi];
    yield* this.rows[xi];
  }

  *columnIndexed(yi) {
    yield this.head[yi];

    for (let i = 0, h = this.rows.length; i < h; i++) yield this.rows[i][yi];
  }

}

export { Crostab, DynamicCrostab, Flatward, Headward, Sideward, indexed, indexedBy, indexedOf, indexedTo };
