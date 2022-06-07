import { Sparse } from '../Sparse'

export function transpose(sparse) {
  const target = new Sparse()
  for (let [xi, yi, v] of sparse.indexed()) target.update(yi, xi, v)
  return target
}