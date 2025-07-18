import { List, Vast } from '@analyz/list'
import { nullish }    from '@typen/nullish'
import { Sparse }     from '../Sparse.js'


export class IntoList extends Sparse {
  constructor(fill = List.build) { super(fill) }
  static build(fill) { return new IntoList(fill) }
  static gather(iter) { return IntoList.build().collect(iter) }
  update(x, y, v) {
    this.cellOrInit(x, y).push(v)
  }
}

export class IntoMax extends Sparse {
  constructor(fill = Number.NEGATIVE_INFINITY) { super(fill) }
  static build(fill) { return new IntoMax(fill) }
  static gather(iter) { return IntoMax.build().collect(iter) }
  update(x, y, v) {
    const row = this.rowOn(x, y)
    if (v > row[y]) row[y] = v
  }
}

export class IntoMin extends Sparse {
  constructor(fill = Number.POSITIVE_INFINITY) { super(fill) }
  static build(fill) { return new IntoMin(fill) }
  static gather(iter) { return IntoMin.build().collect(iter) }
  update(x, y, v) {
    const row = this.rowOn(x, y)
    if (v < row[y]) row[y] = v
  }
}

export class IntoAverage extends Sparse {
  constructor(fill = Vast.build) { super(fill) }
  static build(fill) { return new IntoAverage(fill) }
  static gather(iter) { return IntoAverage.build().collect(iter) }
  update(x, y, v) {
    this.rowOn(x, y)[y].record(v)
  }
}

export class IntoSum extends Sparse {
  constructor(fill = 0) { super(fill) }
  static build(fill) { return new IntoSum(fill) }
  static gather(iter) { return IntoSum.build().collect(iter) }
  update(x, y, v) {
    this.rowOn(x, y)[y] += v
  }
}

export class IntoCount extends Sparse {
  constructor(fill = 0) { super(fill) }
  static build(fill) { return new IntoCount(fill) }
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

