import { mapper as matrixMapper } from '@vect/matrix-mapper'
import { Crostab }                from '../Crostab'

export class Crostat extends Crostab {
  /** @type {function} */ init = null
  /** @type {*}        */ base = null
  constructor(fill) {
    super()
    fill instanceof Function ? (this.init = fill) : (this.base = fill)
  }
  static build(element) { return new Crostat(element) }
  static gather(iter) { return (new Crostat()).collect(iter) }

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
  cell(x, y) { return this.rows[this.xi(x)][this.yi(y)] }
  query(x, y) { return ~(x = this.side.indexOf(x)) && ~(y = this.head.indexOf(y)) ? this.rows[x][y] : void 0 }
  object(po) { return { side: this.side, head: this.head, rows: po ? matrixMapper(this.rows, po) : this.rows } }
}