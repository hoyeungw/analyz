import { mapper as matrixMapper } from '@vect/matrix-mapper'
import { Crostab }                from './Crostab'

export class DynamicCrostab extends Crostab {
  /** @type {function} */ init = null
  /** @type {*}        */ base = null
  constructor(element) {
    super()
    element instanceof Function ? (this.init = element) : (this.base = element)
  }
  static build(element) { return new DynamicCrostab(element) }
  static gather(iter) {
    const crostab = new DynamicCrostab()
    for (let [ x, y, v ] of iter) crostab.update(x, y, v)
    return crostab
  }

  get zero() { return this.init?.call(this) ?? this.base }

  xi(x) {
    const xi = this.side.indexOf(x)
    if (~xi) return xi
    const wd = this.head.length, row = Array(wd)
    for (let i = 0; i < wd; i++) row[i] = this.zero
    return (this.rows.push(row), this.side.push(x)) - 1
  }
  yi(y) {
    const yi = this.head.indexOf(y)
    if (~yi) return yi
    const ht = this.side.length
    for (let i = 0; i < ht; i++) this.rows[i].push(this.zero)
    return this.head.push(y) - 1
  }

  update(x, y, v) { return this.rows[this.xi(x)][this.yi(y)] = v }
  append(x, y, v) { return this.rows[this.xi(x)][this.yi(y)].push(v) }
  assign(x, y, k, v) { return this.rows[this.xi(x)][this.yi(y)][k] = v }
  cell(x, y) { return this.rows[this.xi(x)][this.yi(y)] }
  query(x, y) { return ~(x = this.side.indexOf(x)) && ~(y = this.head.indexOf(y)) ? this.rows[x][y] : void 0 }
  toObject(po) { return { side: this.side, head: this.head, rows: po ? matrixMapper(this.rows, po) : this.rows } }
}