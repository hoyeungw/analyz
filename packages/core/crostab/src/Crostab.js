import { Matrix }                                         from '@analyz/matrix'
import { transpose }                                      from '@vect/matrix-algebra'
import { shallow }                                        from '@vect/matrix-init'
import { mapper as mapperMatrix, mutate as mutateMatrix } from '@vect/matrix-mapper'
import { mutate as mutateVector }                         from '@vect/vector-mapper'
import { indexedOf }                                      from './infrastructure/indexed'
import { Headward, Sideward }                             from './infrastructure/ward.mixins'


export class Crostab {
  /** @type {string[]} */ side
  /** @type {string[]} */ head
  /** @type {any[][]}  */ rows
  /** @type {string}   */ title
  /** @type {Sideward} */ #xward
  /** @type {Headward} */ #yward

  constructor(side, head, rows, title) {
    this.side = side ?? []
    this.head = head ?? []
    this.rows = rows ?? []
    this.title = title
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
  column(y) { return Matrix.prototype.column.call(this.coin[y]) }
  cell(x, y) {
    const row = this.rows[this.roin(x)]
    return row[this.coin[y]]
  }

  coord(r, c) { return {x: this.roin(r), y: this.coin(c)} }
  map(fn) { return Crostab.build(this.side.slice(), this.head.slice(), mapperMatrix(this.rows, fn), this.title) }
  mutate(fn) { return mutateMatrix(this.rows, fn), this }
  mutateKeys(fn) { return mutateVector(this.side, fn), mutateVector(this.head, fn), this }
  update(x, y, v) { if (~(x = this.roin(x)) && ~(y = this.coin(y))) this.rows[x][y] = v }
  collect(iter) {
    for (let [ x, y, v ] of iter) this.update(x, y, v)
    return this
  }
  transpose(title) {
    let {side: head, head: side, rows: columns} = this
    this.side = side, this.head = head, this.rows = transpose(columns), this.title = title ?? this.title
    return this
  }
  slice() { return Crostab.build(this.side.slice(), this.head.slice(), shallow(this.rows), this.title) }
}

