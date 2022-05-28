import { Headward }                                       from '@analyz/crostab'
import { Matrix }                                         from '@analyz/matrix'
import { shallow }                                        from '@vect/matrix-init'
import { mapper as mapperMatrix, mutate as mutateMatrix } from '@vect/matrix-mapper'
import { indexedOf, mutate as mutateVector }              from '@vect/vector-mapper'


export class Table {
  /** @type {string[]} */ head
  /** @type {any[][]}  */ rows
  /** @type {string}   */ title
  /** @type {Headward} */ #yward

  constructor(head, rows, title) {
    this.head = head ?? []
    this.rows = rows ?? []
    this.title = title
  }
  static build(head, rows, title) { return new Table(head, rows, title) }
  static from(o = {}) { return new Table(o.head, o.rows, o.title) }
  /** @returns {Headward} */ get headward() { return this.#yward ?? (this.#yward = new Headward(this)) }
  collect(rows) {
    for (let row of rows) this.rows.push(row)
    return this
  }
  get height() { return this.rows.length }
  get width() { return this.head.length }
  [Symbol.iterator]() { return indexedOf(this) }
  coin(y) { return this.head.indexOf(y) }
  column(y) { return Matrix.prototype.column.call(this.coin[y]) }

  map(fn) { return Table.build(this.head.slice(), mapperMatrix(this.rows, fn), this.title) }
  filter(y, fn) { return y = this.head.indexOf(y), Table.build(this.head.slice(), this.rows.filter(row => fn(row[y])), this.title) }
  sort(y, comp) {
    y = this.head.indexOf(y)
    if (!~y) return this
    this.rows.sort((ra, rb) => comp(ra[y], rb[y]))
    return this
  }
  mutate(fn) { return mutateMatrix(this.rows, fn), this }
  mutateKeys(fn) { return mutateVector(this.head, fn), this }

  slice() { return Table.build(this.head.slice(), shallow(this.rows), this.title) }
}