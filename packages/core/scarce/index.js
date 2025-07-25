import { oneself } from '@ject/oneself';
import { mapVal } from '@vect/object-mapper';
import { indexed, indexedTo } from '@vect/vector-mapper';
import { ACCUM, AVERAGE, COUNT, INCRE, MAX, MIN, FIRST, LAST } from '@analys/enum-pivot-mode';
import { nullish } from '@typen/nullish';

class List extends Array {
  constructor() { super(); }
  static build() { return new List() }
  get count() { return this.length }
  get sum() { return this.reduce((a, b) => a + b, 0) }
  get average() { return this.length ? this.sum / this.length : 0 }
  get max() { return Math.max.apply(null, this) }
  get min() { return Math.min.apply(null, this) }
}

class Scarce {
  data
  #init = null
  #base = null
  constructor(fill = List.build, data) {
    fill instanceof Function ? (this.#init = fill) : (this.#base = fill);
    this.data = data ?? {};
  }
  static build(fill, data) { return new Scarce(fill, data) }
  static from(data) { return new Scarce(null, data) }

  [Symbol.iterator]() { return this.indexed() }
  clear() { for (let k in this.data) delete this.data[k]; }
  get zero() { return this.#init?.call(this) ?? this.#base }

  get(k) { return this.data[k] ?? (this.data[k] = this.zero) }

  update(k, v) { this.get(k).push(v); }
  collect(iter) {
    for (let [k, v] of iter) this.update(k, v);
    return this
  }
  * indexed(by, to) { yield* indexed(this.data, by, to); }
  * indexedTo(to) { yield* indexedTo(this.data, to); }
  get keys() { return Object.keys(this.data) }
  object(to) { return mapVal(this.data, to ?? oneself) }
}

class Vast {
  sum = 0
  count = 0
  constructor() {}
  static build() {return new Vast()}
  record(value) { this.sum += value, this.count++; }
  get average() { return this.sum / this.count }
}

class IntoList extends Scarce {
  constructor(fill = List.build) { super(fill); }
  static build(fill) { return new IntoList(fill) }
  static gather(iter) { return IntoList.build().collect(iter) }
  update(k, v) {
    this.cellOrInit(x, k).push(v);
  }
}

class IntoMax extends Scarce {
  constructor(fill = Number.NEGATIVE_INFINITY) { super(fill); }
  static build(fill) { return new IntoMax(fill) }
  static gather(iter) { return IntoMax.build().collect(iter) }
  update(k, v) {
    if (v > this.get(k)) this.data[k] = v;
  }
}

class IntoMin extends Scarce {
  constructor(fill = Number.POSITIVE_INFINITY) { super(fill); }
  static build(fill) { return new IntoMin(fill) }
  static gather(iter) { return IntoMin.build().collect(iter) }
  update(k, v) {
    if (v < this.get(k)) this.data[k] = v;
  }
}

class IntoAverage extends Scarce {
  constructor(fill = Vast.build) { super(fill); }
  static build(fill) { return new IntoAverage(fill) }
  static gather(iter) { return IntoAverage.build().collect(iter) }
  update(k, v) {
    this.get(k).record(v);
  }
}

class IntoSum extends Scarce {
  constructor(fill = 0) { super(fill); }
  static build(fill) { return new IntoSum(fill) }
  static gather(iter) { return IntoSum.build().collect(iter) }
  update(k, v) {
    this.get(k), this.data[k] += v;
  }
}

class IntoCount extends Scarce {
  constructor(fill = 0) { super(fill); }
  static build(fill) { return new IntoCount(fill) }
  static gather(iter) { return IntoCount.build().collect(iter) }
  update(k, _) {
    this.get(k), this.data[k]++;
  }
}

class IntoFirst extends Scarce {
  constructor() { super(null); }
  static build() { return new IntoFirst() }
  static gather(iter) { return IntoFirst.build().collect(iter) }
  update(k, v) {
    if (nullish(this.data[k])) this.data[k] = v;
  }
}

class IntoLast extends Scarce {
  constructor() { super(null); }
  static build() { return new IntoLast() }
  static gather(iter) { return IntoLast.build().collect(iter) }
  update(k, v) {
    if (nullish(v)) return
    this.data[k] = v;
  }
}

class Stat {
  static of(mode) {
    if (mode === ACCUM) return new IntoList()
    if (mode === AVERAGE) return new IntoAverage()
    if (mode === COUNT) return new IntoCount()
    if (mode === INCRE) return new IntoSum()
    if (mode === MAX) return new IntoMax()
    if (mode === MIN) return new IntoMin()
    if (mode === FIRST) return new IntoFirst()
    if (mode === LAST) return new IntoLast()
    return new IntoList()
  }
}

export { List, Scarce, Stat, Vast };
