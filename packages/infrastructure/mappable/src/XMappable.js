import { indexed, indexedTo }                                             from '@vect/columns-mapper'
import { transpose }                                                      from '@vect/matrix-algebra'
import { entryIndexed, entryIndexedTo, tripletIndexed, tripletIndexedTo } from '@vect/matrix-mapper'
import { mutate, mutate as mutateVector }                                 from '@vect/vector-mapper'
import { indexesOf }                                                      from './Labels'

export class XMappable {
  side
  rows
  constructor({ side, rows }) { this.side = side, this.rows = rows }
  // mapKeys(fn) { return new XMappable({side: this.side.map(fn), rows: shallow(this.rows)}) }
  // map(keys, fn) {
  //   keys = indexesOf.call(this.side, keys)
  //   const rows = shallow(this.rows)
  //   for (let x of keys) { mutate(rows[x], fn) }
  //   return new XMappable({side: this.side.slice(), rows})
  // }

  mutateKeys(fn) { return mutateVector(this.side, fn), this }
  mutate(keys, fn) {
    keys = indexesOf.call(this.side, keys)
    for (let x of keys) { mutate(this.rows[x], fn) }
    return this
  }

  * indexed(by, to) { yield* indexed(this.rows, by, to) }
  * entryIndexed(kv, by, to) { yield* entryIndexed(transpose(this.rows), kv, by, to) }
  * tripletIndexed(xyz, by, to) { yield* tripletIndexed(transpose(this.rows), xyz, by, to) }
  * indexedTo(to) { yield* indexedTo(this.rows, to) }
  * entryIndexedTo(kv, to) { yield* entryIndexedTo(transpose(this.rows), kv, to) }
  * tripletIndexedTo(xyz, to) { yield* tripletIndexedTo(transpose(this.rows), xyz, to) }
}