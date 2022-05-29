import { nullish } from '@typen/nullish'
import { Scarce }  from './Scarce'
import { Vast } from './infrastructure/Vast'
import { List }    from './infrastructure/List'


export class IntoList extends Scarce {
  constructor(el = List.build) { super(el) }
  static build(el) { return new IntoList(el) }
  static gather(iter) { return IntoList.build().collect(iter) }
  update(k, v) {
    this.cellOrInit(x, k).push(v)
  }
}

export class IntoMax extends Scarce {
  constructor(el = Number.NEGATIVE_INFINITY) { super(el) }
  static build(el) { return new IntoMax(el) }
  static gather(iter) { return IntoMax.build().collect(iter) }
  update(k, v) {
    if (v > this.get(k)) this.data[k] = v
  }
}

export class IntoMin extends Scarce {
  constructor(el = Number.POSITIVE_INFINITY) { super(el) }
  static build(el) { return new IntoMin(el) }
  static gather(iter) { return IntoMin.build().collect(iter) }
  update(k, v) {
    if (v < this.get(k)) this.data[k] = v
  }
}

export class IntoAverage extends Scarce {
  constructor(el = Vast.build) { super(el) }
  static build(el) { return new IntoAverage(el) }
  static gather(iter) { return IntoAverage.build().collect(iter) }
  update(k, v) {
    this.get(k).record(v)
  }
}

export class IntoSum extends Scarce {
  constructor(el = 0) { super(el) }
  static build(el) { return new IntoSum(el) }
  static gather(iter) { return IntoSum.build().collect(iter) }
  update(k, v) {
    this.get(k), this.data[k] += v
  }
}

export class IntoCount extends Scarce {
  constructor(el = 0) { super(el) }
  static build(el) { return new IntoCount(el) }
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

