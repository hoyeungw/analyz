import { Headward, Stat } from '@analyz/crostab';
import { Matrix } from '@analyz/matrix';
import { shallow } from '@vect/matrix-init';
import { mapper, mutate } from '@vect/matrix-mapper';
import { indexedOf, mutate as mutate$1 } from '@vect/vector-mapper';
import { gather } from '@vect/vector-init';

class Table {
  /** @type {string[]} */ head
  /** @type {any[][]}  */ rows
  /** @type {string}   */ title
  /** @type {Headward} */ #yward

  constructor(head, rows, title) {
    this.head = head ?? [];
    this.rows = rows ?? [];
    this.title = title;
  }
  static build(head, rows, title) { return new Table(head, rows, title) }
  static from(o = {}) { return new Table(o.head, o.rows, o.title) }
  /** @returns {Headward} */ get headward() { return this.#yward ?? (this.#yward = new Headward(this)) }
  collect(rows) {
    for (let row of rows) this.rows.push(row);
    return this
  }
  get height() { return this.rows.length }
  get width() { return this.head.length }
  [Symbol.iterator]() { return indexedOf(this) }
  coin(y) { return this.head.indexOf(y) }
  column(y) { return Matrix.prototype.column.call(this.coin(y)) }

  map(fn) { return Table.build(this.head.slice(), mapper(this.rows, fn), this.title) }
  filter(y, fn) { return y = this.head.indexOf(y), Table.build(this.head.slice(), this.rows.filter(row => fn(row[y])), this.title) }
  sort(y, comp) {
    y = this.head.indexOf(y);
    if (!~y) return this
    this.rows.sort((ra, rb) => comp(ra[y], rb[y]));
    return this
  }
  mutate(fn) { return mutate(this.rows, fn), this }
  mutateKeys(fn) { return mutate$1(this.head, fn), this }

  slice() { return Table.build(this.head.slice(), shallow(this.rows), this.title) }
  crostab(x, y, v, mode, by) {
    return Stat.of(mode).collect(this.headward.tripletIndexed([x, y, v], by))
  }
}

class Flatward {
  head
  rows
  constructor(head, rows) {
    this.head = head;
    this.rows = rows;
  }
  static build(head, rows) { return new Flatward(head, rows) }
  static from(o = {}) { return new Flatward(o.head, o.rows) }

  matrix() { return gather(this.rowsIndexed()) }

  * rowsIndexed() {
    yield this.head;
    for (let i = 0, h = this.rows.length; i < h; i++) yield this.rows[i];
  }
  * columnsIndexed() {
    for (let j = 0, w = this.head.length; j < w; j++) yield this.columnIndexed(j);
  }
  * columnIndexed(yi) {
    yield this.head[yi];
    for (let i = 0, h = this.rows.length; i < h; i++) yield this[i][yi];
  }
}

export { Flatward, Table };
