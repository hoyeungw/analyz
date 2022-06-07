export class Vast {
  sum = 0
  count = 0
  constructor() {}
  static build() {return new Vast()}
  record(value) { this.sum += value, this.count++ }
  get average() { return this.sum / this.count }
}