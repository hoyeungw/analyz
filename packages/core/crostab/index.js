import { mapper, mutate } from '@vect/matrix-mapper';
import { Matrix } from '@analyz/matrix';
import { transpose } from '@vect/matrix-algebra';
import { shallow } from '@vect/matrix-init';
import { mutate as mutate$1 } from '@vect/vector-mapper';
import { XIndexable, YIndexable } from '@analyz/indexable';
import { XMappable, YMappable } from '@analyz/mappable';
import { XSelectable, YSelectable } from '@analyz/selectable';
import { XUpdatable, YUpdatable } from '@analyz/updatable';
import { mixin } from '@ject/mixin';
import { ACCUM, AVERAGE, COUNT, INCRE, MAX, MIN, FIRST, LAST } from '@analys/enum-pivot-mode';
import { List, Vast } from '@analyz/list';
import { nullish, valid } from '@typen/nullish';
import { gather } from '@vect/vector-init';

function* indexedOf(crostab) {
  const { side, head, rows } = crostab;
  const h = side?.length, w = head?.length;
  for (let i = 0; i < h; i++) for (let j = 0; j < w; j++)
    yield [side[i], head[j], rows[i][j]];
}

function* indexedBy(crostab, by) {
  const { side, head, rows } = crostab;
  const h = side?.length, w = head?.length;
  for (let i = 0; i < h; i++) for (let j = 0; j < w; j++)
    if (by(side[i], head[j], rows[i][j]))
      yield [side[i], head[j], rows[i][j]];
}

function* indexedTo(crostab, to) {
  if (!to) return yield* indexedOf(crostab)
  const { side, head, rows } = crostab;
  const h = side?.length, w = head?.length;
  for (let i = 0; i < h; i++) for (let j = 0; j < w; j++)
    yield to(side[i], head[j], rows[i][j]);
}

function* indexed(crostab, by, to) {
  if (!to) return yield* !by ? indexedOf(crostab) : indexedBy(crostab, by)
  const { side, head, rows } = crostab;
  const h = side?.length, w = head?.length;
  for (let i = 0; i < h; i++) for (let j = 0; j < w; j++)
    if (by(side[i], head[j], rows[i][j]))
      yield to(side[i], head[j], rows[i][j]);
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
const Sideward = mixin(XIndexable, XMappable, XUpdatable, XSelectable);

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
const Headward = mixin(YIndexable, YMappable, YUpdatable, YSelectable);

class Crostab {
  /** @type {string[]} */ side
  /** @type {string[]} */ head
  /** @type {any[][]}  */ rows
  /** @type {string}   */ title
  /** @type {Sideward} */ #xward
  /** @type {Headward} */ #yward

  constructor(side, head, rows, title) {
    this.side = side ?? [];
    this.head = head ?? [];
    this.rows = rows ?? [];
    this.title = title;
  }
  static build(side, head, rows, title) { return new Crostab(side, head, rows, title) }
  static from(o = {}) { return new Crostab(o.side, o.head, o.rows, o.title) }
  /** @returns {Sideward} */ get sideward() { return this.#xward ?? (this.#xward = new Sideward(this)) }
  /** @returns {Headward} */ get headward() { return this.#yward ?? (this.#yward = new Headward(this)) }
  get height() { return this.side.length }
  get width() { return this.head.length }
  [Symbol.iterator]() { return indexedOf(this) }
  roin(x) { return this.side.indexOf(x) }
  coin(y) { return this.head.indexOf(y) }
  row(x) { return this.rows[this.roin(x)] }
  column(y) { return Matrix.prototype.column.call(this.coin(y)) }
  cell(x, y) { return ~(x = this.roin(x)) ? this.rows[x][this.coin(y)] : null }

  coord(r, c) { return { x: this.roin(r), y: this.coin(c) } }
  map(fn) { return Crostab.build(this.side.slice(), this.head.slice(), mapper(this.rows, fn), this.title) }
  mutate(fn) { return mutate(this.rows, fn), this }
  mutateKeys(fn) { return mutate$1(this.side, fn), mutate$1(this.head, fn), this }
  update(x, y, v) { if (~(x = this.roin(x)) && ~(y = this.coin(y))) this.rows[x][y] = v; }
  collect(iter) {
    for (let [x, y, v] of iter) this.update(x, y, v);
    return this
  }
  transpose(title) {
    let { side: head, head: side, rows: columns } = this;
    this.side = side, this.head = head, this.rows = transpose(columns), this.title = title ?? this.title;
    return this
  }
  slice() { return Crostab.build(this.side.slice(), this.head.slice(), shallow(this.rows), this.title) }
}

class Crostat extends Crostab {
  /** @type {function} */ init = null
  /** @type {*}        */ base = null
  constructor(fill) {
    super();
    fill instanceof Function ? (this.init = fill) : (this.base = fill);
  }
  static build(element) { return new Crostat(element) }
  static gather(iter) { return (new Crostat()).collect(iter) }

  get zero() { return this.init?.call(this) ?? this.base }

  xi(x) {
    const xi = this.side.indexOf(x);
    if (~xi) return xi
    const wd = this.head.length, row = Array(wd);
    for (let i = 0; i < wd; i++) row[i] = this.zero;
    return (this.rows.push(row), this.side.push(x)) - 1
  }
  yi(y) {
    const yi = this.head.indexOf(y);
    if (~yi) return yi
    const ht = this.side.length;
    for (let i = 0; i < ht; i++) this.rows[i].push(this.zero);
    return this.head.push(y) - 1
  }

  update(x, y, v) { return this.rows[this.xi(x)][this.yi(y)] = v }
  cell(x, y) { return this.rows[this.xi(x)][this.yi(y)] }
  query(x, y) { return ~(x = this.side.indexOf(x)) && ~(y = this.head.indexOf(y)) ? this.rows[x][y] : void 0 }
  object(po) { return { side: this.side, head: this.head, rows: po ? mapper(this.rows, po) : this.rows } }
}

class IntoList extends Crostat {
  constructor(fill = List.build) { super(fill); }
  static build(fill) { return new IntoList(fill) }
  static gather(iter) { return IntoList.build().collect(iter) }
  update(x, y, v) {
    this.cell(x, y).push(v);
  }
}

class IntoMax extends Crostat {
  constructor(fill = Number.NEGATIVE_INFINITY) { super(fill); }
  static build(fill) { return new IntoMax(fill) }
  static gather(iter) { return IntoMax.build().collect(iter) }
  update(x, y, v) {
    if (v > this.rows[x = this.xi(x)][y = this.yi(y)]) this.rows[x][y] = v;
  }
}

class IntoMin extends Crostat {
  constructor(fill = Number.POSITIVE_INFINITY) { super(fill); }
  static build(fill) { return new IntoMin(fill) }
  static gather(iter) { return IntoMin.build().collect(iter) }
  update(x, y, v) {
    if (v < this.rows[x = this.xi(x)][y = this.yi(y)]) this.rows[x][y] = v;
  }
}

class IntoAverage extends Crostat {
  constructor(fill = Vast.build) { super(fill); }
  static build(fill) { return new IntoAverage(fill) }
  static gather(iter) { return IntoAverage.build().collect(iter) }
  update(x, y, v) {
    this.cell(x, y).record(v);
  }
}

class IntoSum extends Crostat {
  constructor(fill = 0) { super(fill); }
  static build(fill) { return new IntoSum(fill) }
  static gather(iter) { return IntoSum.build().collect(iter) }
  update(x, y, v) {
    this.rows[this.xi(x)][this.yi(y)] += v;
  }
}

class IntoCount extends Crostat {
  constructor(fill = 0) { super(fill); }
  static build(fill) { return new IntoCount(fill) }
  static gather(iter) { return IntoCount.build().collect(iter) }
  update(x, y, _) {
    this.rows[this.xi(x)][this.yi(y)]++;
  }
}

class IntoFirst extends Crostat {
  constructor() { super(null); }
  static build() { return new IntoFirst() }
  static gather(iter) { return IntoFirst.build().collect(iter) }
  update(x, y, v) {
    if (nullish(this.rows[x = this.xi(x)][y = this.yi(y)])) this.rows[x][y] = v;
  }
}

class IntoLast extends Crostat {
  constructor() { super(null); }
  static build() { return new IntoLast() }
  static gather(iter) { return IntoLast.build().collect(iter) }
  update(x, y, v) {
    if (valid(v)) this.rows[this.xi(x)][this.yi(y)] = v;
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

class Flatward {
  side
  head
  rows
  title
  constructor(side, head, rows, title) {
    this.side = side ?? [];
    this.head = head ?? [];
    this.rows = rows ?? [];
    this.title = title;
  }
  static from(o = {}) { return new Flatward(o.side, o.head, o.rows, o.title) }
  static build(side, head, rows, title) { return new Flatward(side, head, rows, title) }
  matrix() {
    const rows = [];
    for (let row of this.rowsIndexed()) { rows.push(gather(row));}
    return rows
  }
  * rowsIndexed() {
    yield this.headIndexed();
    for (let i = 0, h = this.side.length; i < h; i++) yield this.rowIndexed(i);
  }
  * columnsIndexed() {
    yield this.sideIndexed();
    for (let j = 0, w = this.head.length; j < w; j++) yield this.columnIndexed(j);
  }
  * headIndexed() {
    yield this.title;
    yield* this.head;
  }
  * sideIndexed() {
    yield this.title;
    yield* this.side;
  }
  * rowIndexed(xi) {
    yield this.side[xi];
    yield* this.rows[xi];
  }
  * columnIndexed(yi) {
    yield this.head[yi];
    for (let i = 0, h = this.rows.length; i < h; i++) yield this.rows[i][yi];
  }
}

export { Crostab, Crostat, Crostat as DynamicCrostab, Flatward, Headward, Sideward, Stat, indexed, indexedBy, indexedOf, indexedTo };
