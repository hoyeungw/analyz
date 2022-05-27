import { nullish }       from '@typen/nullish'
import { Counter, List } from './infrastructure/statistics'
import { Sparse }        from './Sparse'


export class CrosList extends Sparse {
  constructor(el = List.build) { super(el) }
  static build(el) { return new CrosList(el) }
  static gather(iter) { return CrosList.build().collect(iter) }
  update(x, y, v) {
    this.cellOrInit(x, y).push(v)
  }
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

export class CrosAverage extends Sparse {
  constructor(el = Counter.build) { super(el) }
  static build(el) { return new CrosAverage(el) }
  static gather(iter) { return CrosAverage.build().collect(iter) }
  update(x, y, v) {
    this.rowOn(x, y)[y].record(v)
  }
}

export class CrosSum extends Sparse {
  constructor(el = 0) { super(el) }
  static build(el) { return new CrosSum(el) }
  static gather(iter) { return CrosSum.build().collect(iter) }
  update(x, y, v) {
    this.rowOn(x, y)[y] += v
  }
}

export class CrosCount extends Sparse {
  constructor(el = 0) { super(el) }
  static build(el) { return new CrosCount(el) }
  static gather(iter) { return CrosCount.build().collect(iter) }
  update(x, y, _) {
    this.rowOn(x, y)[y]++
  }
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

