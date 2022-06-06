'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var objectSelect = require('@vect/object-select');
var table = require('@analyz/table');
var objectIndex = require('@vect/object-index');
var vectorMapper = require('@vect/vector-mapper');
var crostab = require('@analyz/crostab');
var matrixMapper = require('@vect/matrix-mapper');

class Samples extends Array {
  title = null;

  constructor(hi) {
    super(hi);
  }

  static build(hi) {
    return new Samples(hi);
  }

  static of(...samples) {
    return new Samples(samples === null || samples === void 0 ? void 0 : samples.length).acquire(samples);
  }

  static from(samples) {
    return new Samples(samples === null || samples === void 0 ? void 0 : samples.length).acquire(samples);
  }

  get head() {
    return this.length ? objectIndex.keys(this[0]) : [];
  }

  acquire(samples) {
    for (let i = 0, h = samples.length; i < h; i++) {
      this[i] = samples[i];
    }

    return this;
  }

  collect(iter) {
    for (let sample of iter) {
      this.push(sample);
    }

    return this;
  }

  select(keys) {
    return this.copy(this.map(objectSelect.select.bind(keys)));
  }

  copy(samples) {
    return Samples.from(samples ?? this);
  }

  table(fields) {
    return table.Table.build(fields ?? this.head, vectorMapper.mapper(this, objectSelect.values.bind(fields)), this.title);
  }

  crostab(x, y, v, mode, by) {
    return crostab.Stat.of(mode).collect(matrixMapper.tripletIndexed(this, [x, y, v], by));
  }

}

exports.Samples = Samples;
