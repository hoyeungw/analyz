'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class List extends Array {
  constructor() {
    super();
  }

  static build() {
    return new List();
  }

  get count() {
    return this.length;
  }

  get sum() {
    return this.reduce((a, b) => a + b, 0);
  }

  get average() {
    return this.length ? this.sum / this.length : 0;
  }

  get max() {
    return Math.max.apply(null, this);
  }

  get min() {
    return Math.min.apply(null, this);
  }

}

class Vast {
  sum = 0;
  count = 0;

  constructor() {}

  static build() {
    return new Vast();
  }

  record(value) {
    this.sum += value, this.count++;
  }

  get average() {
    return this.sum / this.count;
  }

}

exports.List = List;
exports.Vast = Vast;
