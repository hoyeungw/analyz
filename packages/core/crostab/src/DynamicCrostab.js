import { mapper as matrixMapper } from '@vect/matrix-mapper'
import { collect }                from '@vect/vector-init'
import { Crostab }                from './Crostab'

const ZERO = 'zero'

export class DynamicCrostab extends Crostab {
  /** @type {function} */ init = null
  /** @type {*}        */ val = null
  constructor(element) {
    super({side: [], head: [], rows: []})
    element instanceof Function ? (this.init = element) : (this.val = element)
  }
  static build(element) { return new DynamicCrostab(element) }

  get zero() { return this.init?.call(this) ?? this.val }

  roin(x) {
    const i = this.side.indexOf(x)
    if (~i) return i
    this.rows.push(collect.call(this, ZERO, this.head.length))
    return i + this.side.push(x)
  }
  coin(y) {
    const i = this.head.indexOf(y)
    if (~i) return i
    for (let row of this.rows) row.push(this.zero)
    return i + this.head.push(y)
  }

  update(x, y, v) { return this.rows[this.roin(x)][this.coin(y)] = v }
  append(x, y, v) { return this.rows[this.roin(x)][this.coin(y)].push(v) }
  assign(x, y, k, v) { return this.rows[this.roin(x)][this.coin(y)][k] = v }
  cell(x, y) { return this.rows[this.roin(x)][this.coin(y)] }
  query(x, y) { return ~(x = this.side.indexOf(x)) && ~(y = this.head.indexOf(y)) ? this.rows[x][y] : void 0 }
  toObject(po) { return {side: this.side, head: this.head, rows: po ? matrixMapper(this.rows, po) : this.rows} }
}