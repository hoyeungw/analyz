import { Crostab }            from '@analyz/crostab'
import { init, iso }          from '@vect/matrix-init'
import { indexed, indexedTo } from './infrastructure/indexed'

// only private field is allowed to be assigned to Sparse instance
// public field is not allowed to be assigned to Sparse instance

export class Sparse {
  data
  #init = null
  #base = null
  constructor(fill, data) {
    fill instanceof Function ? (this.#init = fill) : (this.#base = fill)
    this.data = data ?? {}
  }
  static build(fill, data) { return new Sparse(fill, data) }
  static from(nested) { return new Sparse(null, nested) }
  static gather(iter) {
    const sparse = new Sparse()
    for (let [x, y, v] of iter) sparse.update(x, y, v)
    return sparse
  }

  [Symbol.iterator]() { return this.indexed() }
  clear() { for (let x in this.data) delete this.data[x] }
  get zero() { return this.#init?.call(this) ?? this.#base }
  cell(x, y) {
    const row = this.data[x]
    return row ? row[y] : null
  }
  cellOrInit(x, y) {
    const row = this.data[x] ?? (this.data[x] = {})
    return row[y] ?? (row[y] = this.zero)
  }
  row(x) { return this.data[x] ?? (this.data[x] = {}) }
  rowOn(x, y) {
    const row = this.data[x] ?? (this.data[x] = {})
    if (!(y in row)) row[y] = this.zero
    return row
  }
  update(x, y, v) { (this.data[x] ?? (this.data[x] = {}))[y] = v }
  collect(iter) {
    for (let [x, y, v] of iter) this.update(x, y, v)
    return this
  }
  * indexed(by, to) { yield* indexed(this.data, by, to) }
  * indexedTo(to) { yield* indexedTo(this.data, to) }
  get side() { return Object.keys(this.data) }
  get head() {
    const vec = []
    for (let x in this.data) for (let y in this.data[x]) if (!~vec.indexOf(y)) vec.push(y)
    return vec
  }
  crostab(to, fill) {
    const { side, head } = this, ht = side.length, wd = head.length
    const rows = fill instanceof Function ? init(ht, wd, fill) : iso(ht, wd, fill)
    const crostab = Crostab.build(side, head, rows)
    for (let [x, y, v] of this) { crostab.update(x, y, to ? to(v) : v) }
    return crostab
  }
}