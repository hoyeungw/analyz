import { Crostab }            from '@analyz/crostab'
import { init, iso }          from '@vect/matrix-init'
import { indexed, indexedTo } from './infrastructure/indexed'

// only private field is allowed to be assigned to Sparse instance
// public field is not allowed to be assigned to Sparse instance

export class Sparse {
  #init = null
  #base = null
  constructor(el) { el instanceof Function ? (this.#init = el) : (this.#base = el) }
  static build(el) { return new Sparse(el) }
  static from(nested) {
    const sparse = new Sparse()
    for (let [ x, y, v ] of indexed(nested)) sparse.update(x, y, v)
    return sparse
  }
  static gather(iter) {
    const sparse = new Sparse()
    for (let [ x, y, v ] of iter) sparse.update(x, y, v)
    return sparse
  }

  [Symbol.iterator]() { return this.indexed() }
  clear() { for (let x in this) delete this[x] }
  get #zero() { return this.#init?.call(this) ?? this.#base }
  cell(x, y) {
    const row = this[x]
    return row ? row[y] : null
  }
  cellOrInit(x, y) {
    const row = this[x] ?? (this[x] = {})
    return row[y] ?? (row[y] = this.#zero)
  }
  row(x) { return this[x] ?? (this[x] = {}) }
  rowOn(x, y) {
    const row = this[x] ?? (this[x] = {})
    if (!(y in row)) row[y] = this.#zero
    return row
  }
  update(x, y, v) { (this[x] ?? (this[x] = {}))[y] = v }
  collect(iter) {
    for (let [ x, y, v ] of iter) this.update(x, y, v)
    return this
  }
  * indexed(by, to) { yield* indexed(this, by, to) }
  * indexedTo(to) { yield* indexedTo(this, to) }
  get side() { return Object.keys(this) }
  get head() {
    const vec = []
    for (let x in this) for (let y in this[x]) if (!~vec.indexOf(y)) vec.push(y)
    return vec
  }
  crostab(to, nu) {
    const { side, head } = this, ht = side.length, wd = head.length
    const rows = nu instanceof Function ? init(ht, wd, nu) : iso(ht, wd, nu)
    const crostab = Crostab.build(side, head, rows)
    for (let [ x, y, v ] of this) { crostab.update(x, y, to ? to(v) : v) }
    return crostab
  }
}