import { indexed, indexedTo } from './indexed'

// only private field is allowed to be assigned to Sparse instance
// public field is not allowed to be assigned to Sparse instance

export class Sparse {
  #init = null
  #val = null
  constructor(el) { el instanceof Function ? (this.#init = el) : (this.#val = el) }
  clear() { for (let x in this) delete this[x] }
  get zero() { return this.#init?.call(this) ?? this.#val }
  cell(x, y) {
    const row = this[x]
    return row ? row[y] : null
  }
  cellOrInit(x, y) {
    const row = this[x] ?? (this[x] = {})
    return row[y] ?? (row[y] = this.zero)
  }
  update(x, y, v) { (this[x] ?? (this[x] = {}))[y] = v }
  * indexed(by, to) { yield* indexed(this, by, to) }
  * indexedTo(to) { yield* indexedTo(this, to) }
  get side() { return Object.keys(this) }
  get head() {
    const vec = []
    for (let x in this) for (let y in this[x]) if (!~vec.indexOf(y)) vec.push(y)
    return vec
  }
  row(x) { return this[x] ?? (this[x] = {}) }
}