import { Crostat, Crostab, indexed } from '@analyz/crostab';
import { Sparse } from '@analyz/sparse';

const sparseToCrostab = (sparse, fill) => {
  const crostab = Crostat.build(fill);
  for (let [x, y, v] of sparse) crostab.update(x, y, v);
  return Crostab.from(crostab)
};

function crostabToSparse(crostab, by, to) {
  return Sparse.build().collect(indexed(crostab, by, to))
}

export { crostabToSparse, sparseToCrostab };
