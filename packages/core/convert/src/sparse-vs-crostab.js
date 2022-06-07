import { Crostab, Crostat, indexed as crostabIndexed } from '@analyz/crostab'
import { Sparse }                                      from '@analyz/sparse'

export const sparseToCrostab = (sparse, fill) => {
  const crostab = Crostat.build(fill)
  for (let [x, y, v] of sparse) crostab.update(x, y, v)
  return Crostab.from(crostab)
}

export function crostabToSparse(crostab, by, to) {
  return Sparse.build().collect(crostabIndexed(crostab, by, to))
}
