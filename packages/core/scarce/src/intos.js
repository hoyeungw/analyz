import { nullish } from '@typen/nullish'
import { Scarce }  from './Scarce.js'
import { Vast }    from './infrastructure/Vast.js'
import { List }    from './infrastructure/List.js'


export class IntoList extends Scarce {
  constructor(fill = List.build) { super(fill) }
  static build(fill) { return new IntoList(fill) }
  static gather(iter) { return IntoList.build().collect(iter) }
  update(k, v) {
    this.cellOrInit(x, k).push(v)
  }
}

export class IntoMax extends Scarce {
  constructor(fill = Number.NEGATIVE_INFINITY) { super(fill) }
  static build(fill) { return new IntoMax(fill) }
  static gather(iter) { return IntoMax.build().collect(iter) }
  update(k, v) {
    if (v > this.get(k)) this.data[k] = v
  }
}

export class IntoMin extends Scarce {
  constructor(fill = Number.POSITIVE_INFINITY) { super(fill) }
  static build(fill) { return new IntoMin(fill) }
  static gather(iter) { return IntoMin.build().collect(iter) }
  update(k, v) {
    if (v < this.get(k)) this.data[k] = v
  }
}

export class IntoAverage extends Scarce {
  constructor(fill = Vast.build) { super(fill) }
  static build(fill) { return new IntoAverage(fill) }
  static gather(iter) { return IntoAverage.build().collect(iter) }
  update(k, v) {
    this.get(k).record(v)
  }
}

export class IntoSum extends Scarce {
  constructor(fill = 0) { super(fill) }
  static build(fill) { return new IntoSum(fill) }
  static gather(iter) { return IntoSum.build().collect(iter) }
  update(k, v) {
    this.get(k), this.data[k] += v
  }
}

export class IntoCount extends Scarce {
  constructor(fill = 0) { super(fill) }
  static build(fill) { return new IntoCount(fill) }
  static gather(iter) { return IntoCount.build().collect(iter) }
  update(k, _) {
    this.get(k), this.data[k]++
  }
}

export class IntoFirst extends Scarce {
  constructor() { super(null) }
  static build() { return new IntoFirst() }
  static gather(iter) { return IntoFirst.build().collect(iter) }
  update(k, v) {
    if (nullish(this.data[k])) this.data[k] = v
  }
}

export class IntoLast extends Scarce {
  constructor() { super(null) }
  static build() { return new IntoLast() }
  static gather(iter) { return IntoLast.build().collect(iter) }
  update(k, v) {
    if (nullish(v)) return
    this.data[k] = v
  }
}

