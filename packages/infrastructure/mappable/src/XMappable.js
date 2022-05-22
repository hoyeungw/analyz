import { shallow }                        from '@vect/matrix-init'
import { mutate, mutate as mutateVector } from '@vect/vector-mapper'
import { Labels }                         from './Labels'

export class XMappable {
  side
  rows
  constructor({side, rows}) { this.side = side, this.rows = rows }
  mapKeys(fn) { return new XMappable({side: this.side.map(fn), rows: shallow(this.rows)}) }
  mutateKeys(fn) { return mutateVector(this.side, fn), this }
  map(keys, fn) {
    keys = Labels.prototype.indexesOf.call(this.side, keys)
    const rows = shallow(this.rows)
    for (let x of keys) { mutate(rows[x], fn) }
    return new XMappable({side: this.side.slice(), rows})
  }
  mutate(keys, fn) {
    keys = Labels.prototype.indexesOf.call(this.side, keys)
    for (let x of keys) { mutate(this.rows[x], fn) }
    return this
  }
}