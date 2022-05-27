import { entryIndexed, entryIndexedTo, indexed, indexedTo, mutate as mutateMatrix, tripletIndexed, tripletIndexedTo } from '@vect/matrix-mapper'
import { mutate as mutateVector }                                                                                     from '@vect/vector-mapper'
import { indexesOf }                                                                                                  from './Labels'

export class YMappable {
  head
  rows
  constructor({ head, rows }) { this.head = head, this.rows = rows }
  // mapKeys(fn) { return new YMappable({head: this.head.map(fn), rows: shallow(this.rows)})}
  // map(keys, fn) {
  //   keys = Labels.prototype.indexesOf.call(this.head, keys)
  //   const rows = shallow(this.rows)
  //   for (let row of rows) for (let y of keys) row[y] = fn(row[y])
  //   return new YMappable({head: this.head.slice(), rows})
  // }

  mutateKeys(fn) { return mutateVector(this.head, fn), this }
  mutateValues(fn) { return mutateMatrix(this.rows, fn), this }
  mutate(keys, fn) {
    keys = indexesOf.call(this.head, keys)
    for (let row of this.rows) for (let y of keys) row[y] = fn(row[y])
    return this
  }

  * indexed(by, to) { yield* indexed(this.rows, by, to) }
  * entryIndexed(kv, by, to) { yield* entryIndexed(this.rows, kv, by, to) }
  * tripletIndexed(xyz, by, to) { yield* tripletIndexed(this.rows, xyz, by, to) }
  * indexedTo(to) { yield* indexedTo(this.rows, to) }
  * entryIndexedTo(kv, to) { yield* entryIndexedTo(this.rows, kv, to) }
  * tripletIndexedTo(xyz, to) { yield* tripletIndexedTo(this.rows, xyz, to) }
}