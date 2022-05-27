import { Crostab, DynamicCrostab, indexed as crostabIndexed } from '@analyz/crostab'
import { indexed as sparseIndexed, Sparse }                   from '@analyz/sparse'

export const sparseToCrostab = (sparse, element) => {
  const crostab = DynamicCrostab.build(element)
  for (let [ x, y, v ] of sparseIndexed(sparse)) crostab.update(x, y, v)
  return Crostab.from(crostab)
}

export function crostabToSparse(crostab, by, to) {
  return Sparse.build().collect(crostabIndexed(crostab, by, to))
}
