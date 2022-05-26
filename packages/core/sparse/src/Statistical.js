import { nullish } from '@typen/nullish'
import { Sparse }  from './Sparse'

export class List extends Array {
  constructor() { super() }
  static build() { return new List() }
  get count() { return this.length }
  get sum() { return this.reduce((a, b) => a + b, 0) }
  get average() { return this.length ? this.sum / this.length : 0 }
  get max() { return Math.max.apply(null, this) }
  get min() { return Math.min.apply(null, this) }
}

export class CrosList extends Sparse {
  constructor(el = List.build) { super(el) }
  static build(el) { return new CrosList(el) }
  static gather(iter) { return CrosList.build().collect(iter) }
  update(x, y, v) { this.cellOrInit(x, y).push(v) }
  // toObject(fn) { return {side: this.side, head: this.head, rows: mapper(this.rows, fn ?? (li => li.average))} }
}

export class CrosMax extends Sparse {
  constructor(el = Number.NEGATIVE_INFINITY) { super(el) }
  static build(el) { return new CrosMax(el) }
  static gather(iter) { return CrosMax.build().collect(iter) }
  update(x, y, v) {
    const row = this.rowOn(x, y)
    if (v > row[y]) row[y] = v
  }
}

export class CrosMin extends Sparse {
  constructor(el = Number.POSITIVE_INFINITY) { super(el) }
  static build(el) { return new CrosMin(el) }
  static gather(iter) { return CrosMin.build().collect(iter) }
  update(x, y, v) {
    const row = this.rowOn(x, y)
    if (v < row[y]) row[y] = v
  }
}

export class CrosSum extends Sparse {
  constructor(el = 0) { super(el) }
  static build(el) { return new CrosSum(el) }
  static gather(iter) { return CrosSum.build().collect(iter) }
  update(x, y, v) { this.rowOn(x, y)[y] += v }
}

export class CrosCount extends Sparse {
  constructor(el = 0) { super(el) }
  static build(el) { return new CrosCount(el) }
  static gather(iter) { return CrosCount.build().collect(iter) }
  update(x, y, _) { this.rowOn(x, y)[y]++ }
}

export class CrosFirst extends Sparse {
  constructor() { super(null) }
  static build() { return new CrosFirst() }
  static gather(iter) { return CrosFirst.build().collect(iter) }
  update(x, y, v) {
    const row = this.row(x)
    if (nullish(row[y])) row[y] = v
  }
}

export class CrosLast extends Sparse {
  constructor() { super(null) }
  static build() { return new CrosLast() }
  static gather(iter) { return CrosLast.build().collect(iter) }
  update(x, y, v) {
    if (nullish(v)) return
    const row = this.row(x)
    row[y] = v
  }
}

