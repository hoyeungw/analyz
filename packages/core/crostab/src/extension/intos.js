import { List, Vast }     from '@analyz/list'
import { nullish, valid } from '@typen/nullish'
import { Crostat }        from './Crostat'

export class IntoList extends Crostat {
  constructor(fill = List.build) { super(fill) }
  static build(fill) { return new IntoList(fill) }
  static gather(iter) { return IntoList.build().collect(iter) }
  update(x, y, v) {
    this.cell(x, y).push(v)
  }
}

export class IntoMax extends Crostat {
  constructor(fill = Number.NEGATIVE_INFINITY) { super(fill) }
  static build(fill) { return new IntoMax(fill) }
  static gather(iter) { return IntoMax.build().collect(iter) }
  update(x, y, v) {
    if (v > this.rows[x = this.xi(x)][y = this.yi(y)]) this.rows[x][y] = v
  }
}

export class IntoMin extends Crostat {
  constructor(fill = Number.POSITIVE_INFINITY) { super(fill) }
  static build(fill) { return new IntoMin(fill) }
  static gather(iter) { return IntoMin.build().collect(iter) }
  update(x, y, v) {
    if (v < this.rows[x = this.xi(x)][y = this.yi(y)]) this.rows[x][y] = v
  }
}

export class IntoAverage extends Crostat {
  constructor(fill = Vast.build) { super(fill) }
  static build(fill) { return new IntoAverage(fill) }
  static gather(iter) { return IntoAverage.build().collect(iter) }
  update(x, y, v) {
    this.cell(x, y).record(v)
  }
}

export class IntoSum extends Crostat {
  constructor(fill = 0) { super(fill) }
  static build(fill) { return new IntoSum(fill) }
  static gather(iter) { return IntoSum.build().collect(iter) }
  update(x, y, v) {
    this.rows[this.xi(x)][this.yi(y)] += v
  }
}

export class IntoCount extends Crostat {
  constructor(fill = 0) { super(fill) }
  static build(fill) { return new IntoCount(fill) }
  static gather(iter) { return IntoCount.build().collect(iter) }
  update(x, y, _) {
    this.rows[this.xi(x)][this.yi(y)]++
  }
}

export class IntoFirst extends Crostat {
  constructor() { super(null) }
  static build() { return new IntoFirst() }
  static gather(iter) { return IntoFirst.build().collect(iter) }
  update(x, y, v) {
    if (nullish(this.rows[x = this.xi(x)][y = this.yi(y)])) this.rows[x][y] = v
  }
}

export class IntoLast extends Crostat {
  constructor() { super(null) }
  static build() { return new IntoLast() }
  static gather(iter) { return IntoLast.build().collect(iter) }
  update(x, y, v) {
    if (valid(v)) this.rows[this.xi(x)][this.yi(y)] = v
  }
}

