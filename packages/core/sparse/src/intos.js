import { Vast, List } from '@analyz/scarce'
import { nullish }       from '@typen/nullish'
import { Sparse }        from './Sparse'


export class IntoList extends Sparse {
  constructor(el = List.build) { super(el) }
  static build(el) { return new IntoList(el) }
  static gather(iter) { return IntoList.build().collect(iter) }
  update(x, y, v) {
    this.cellOrInit(x, y).push(v)
  }
}

export class IntoMax extends Sparse {
  constructor(el = Number.NEGATIVE_INFINITY) { super(el) }
  static build(el) { return new IntoMax(el) }
  static gather(iter) { return IntoMax.build().collect(iter) }
  update(x, y, v) {
    const row = this.rowOn(x, y)
    if (v > row[y]) row[y] = v
  }
}

export class IntoMin extends Sparse {
  constructor(el = Number.POSITIVE_INFINITY) { super(el) }
  static build(el) { return new IntoMin(el) }
  static gather(iter) { return IntoMin.build().collect(iter) }
  update(x, y, v) {
    const row = this.rowOn(x, y)
    if (v < row[y]) row[y] = v
  }
}

export class IntoAverage extends Sparse {
  constructor(el = Vast.build) { super(el) }
  static build(el) { return new IntoAverage(el) }
  static gather(iter) { return IntoAverage.build().collect(iter) }
  update(x, y, v) {
    this.rowOn(x, y)[y].record(v)
  }
}

export class IntoSum extends Sparse {
  constructor(el = 0) { super(el) }
  static build(el) { return new IntoSum(el) }
  static gather(iter) { return IntoSum.build().collect(iter) }
  update(x, y, v) {
    this.rowOn(x, y)[y] += v
  }
}

export class IntoCount extends Sparse {
  constructor(el = 0) { super(el) }
  static build(el) { return new IntoCount(el) }
  static gather(iter) { return IntoCount.build().collect(iter) }
  update(x, y, _) {
    this.rowOn(x, y)[y]++
  }
}

export class IntoFirst extends Sparse {
  constructor() { super(null) }
  static build() { return new IntoFirst() }
  static gather(iter) { return IntoFirst.build().collect(iter) }
  update(x, y, v) {
    const row = this.row(x)
    if (nullish(row[y])) row[y] = v
  }
}

export class IntoLast extends Sparse {
  constructor() { super(null) }
  static build() { return new IntoLast() }
  static gather(iter) { return IntoLast.build().collect(iter) }
  update(x, y, v) {
    if (nullish(v)) return
    const row = this.row(x)
    row[y] = v
  }
}

