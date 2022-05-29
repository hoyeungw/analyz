'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var objectSelect = require('@vect/object-select');

class Samples extends Array {
  title;

  constructor(hi) {
    super(hi);
  }

  static build(hi) {
    return new Samples(hi);
  }

  copyFrom(another) {
    for (let i = 0, h = another.length; i < h; i++) {
      this[i] = another;
    }

    return this;
  }

  collect(iter) {
    for (let sample of iter) {
      this.push(sample);
    }

    return this;
  }

  get head() {
    return this.length ? Object.keys(this[0]) : [];
  }

  select(keys) {
    return this.copy(this.map(objectSelect.select.bind(keys)));
  }

  copy(samples) {
    return Samples.build((samples = samples ?? this).length).copyFrom(samples);
  }

  table() {
    return {
      head: this.head,
      rows: this.map(Object.values),
      title: this.title
    };
  }

}

exports.Samples = Samples;
