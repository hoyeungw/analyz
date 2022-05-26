import { Crostab }        from '@analyz/crostab'
import { DynamicCrostab } from '@analyz/crostab'

export const sparseToCrostab = (sparse, element) => {
  const crostab = new DynamicCrostab(element)
  for (let [ x, y, v ] of sparse.indexed()) crostab.update(x, y, v)
  return new Crostab(crostab)
}
