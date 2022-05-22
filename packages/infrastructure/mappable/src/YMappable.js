import { shallow }                from '@vect/matrix-init'
import { mutate as mutateVector } from '@vect/vector-mapper'
import { Labels }                 from './Labels'

export class YMappable {
  head
  rows
  constructor({head, rows}) { this.head = head, this.rows = rows }
  mapKeys(fn) { return new YMappable({head: this.head.map(fn), rows: shallow(this.rows)})}
  mutateKeys(fn) { return mutateVector(this.head, fn), this }
  map(keys, fn) {
    keys = Labels.prototype.indexesOf.call(this.head, keys)
    const rows = shallow(this.rows)
    for (let row of rows) for (let y of keys) row[y] = fn(row[y])
    return new YMappable({head: this.head.slice(), rows})
  }
  mutate(keys, fn) {
    keys = Labels.prototype.indexesOf.call(this.head, keys)
    for (let row of this.rows) for (let y of keys) row[y] = fn(row[y])
    return this
  }
}