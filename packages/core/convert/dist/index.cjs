'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var crostab = require('@analyz/crostab');

const sparseToCrostab = (sparse, element) => {
  const crostab$1 = new crostab.DynamicCrostab(element);

  for (let [x, y, v] of sparse.indexed()) crostab$1.update(x, y, v);

  return new crostab.Crostab(crostab$1);
};

exports.sparseToCrostab = sparseToCrostab;
