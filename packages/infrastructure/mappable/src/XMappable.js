import { indexed, indexedTo }                                             from '@vect/columns-mapper'
import { transpose }                                                      from '@vect/matrix-algebra'
import { entryIndexed, entryIndexedTo, tripletIndexed, tripletIndexedTo } from '@vect/matrix-mapper'
import { mutate as mutateVector }                                         from '@vect/vector-mapper'
import { indexesOf }                                                      from './Labels'

export class XMappable {
  side
  rows
  constructor({side, rows}) { this.side = side, this.rows = rows }

  mutateKeys(fn) { return mutateVector(this.side, fn), this }
  mutateAt(x, fn) {
    x = this.side.indexOf(x)
    if (!~x) return this
    for (let row of this.rows) row[x] = fn(row[x])
    return this
  }
  mutate(xs, fn) {
    if (!Array.isArray(xs)) return this.mutateAt(xs, fn)
    if (xs.length === 1) return this.mutateAt(xs[0], fn)
    xs = indexesOf.call(this.side, xs)
    for (let row of this.rows) for (let x of xs) row[x] = fn(row[x])
    return this
  }

  * indexed(by, to) { yield* indexed(this.rows, by, to) }
  * entryIndexed(kv, by, to) { yield* entryIndexed(transpose(this.rows), indexesOf.call(this.side, kv), by, to) }
  * tripletIndexed(xyz, by, to) { yield* tripletIndexed(transpose(this.rows), indexesOf.call(this.side, xyz), by, to) }
  * indexedTo(to) { yield* indexedTo(this.rows, to) }
  * entryIndexedTo(kv, to) { yield* entryIndexedTo(transpose(this.rows), indexesOf.call(this.side, kv), to) }
  * tripletIndexedTo(xyz, to) { yield* tripletIndexedTo(transpose(this.rows), indexesOf.call(this.side, xyz), to) }
}