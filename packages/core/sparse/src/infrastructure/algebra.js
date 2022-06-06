import { Sparse }  from '../Sparse'
import { indexed } from './indexed'

export function transpose(sparse) {
  const s = new Sparse()
  for (let [xi, yi, v] of indexed(sparse)) s.update(yi, xi, v)
  return s
}