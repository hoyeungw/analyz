export class List extends Array {
  constructor() { super() }
  static build() { return new List() }
  get count() { return this.length }
  get sum() { return this.reduce((a, b) => a + b, 0) }
  get average() { return this.length ? this.sum / this.length : 0 }
  get max() { return Math.max.apply(null, this) }
  get min() { return Math.min.apply(null, this) }
}

export class Counter {
  sum = 0
  count = 0
  constructor() {}
  static build() {return new Counter()}
  record(value) { this.sum += value, this.count++ }
  get average() { return this.sum / this.count }
}