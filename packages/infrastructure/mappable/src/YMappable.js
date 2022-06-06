import {
  entryIndexed,
  entryIndexedTo,
  indexed,
  indexedTo,
  mutate as mutateMatrix,
  tripletIndexed,
  tripletIndexedTo
}                                 from '@vect/matrix-mapper'
import { mutate as mutateVector } from '@vect/vector-mapper'
import { indexesOf }              from './Labels'

export class YMappable {
  head
  rows
  constructor({ head, rows }) { this.head = head, this.rows = rows }

  mutateKeys(fn) { return mutateVector(this.head, fn), this }
  mutateValues(fn) { return mutateMatrix(this.rows, fn), this }

  mutateAt(y, fn) {
    y = this.head.indexOf(y)
    if (!~y) return this
    for (let row of this.rows) row[y] = fn(row[y])
    return this
  }
  mutate(ys, fn) {
    if (!Array.isArray(ys)) return this.mutateAt(ys, fn)
    if (ys.length === 1) return this.mutateAt(ys[0], fn)
    ys = indexesOf.call(this.head, ys)
    for (let row of this.rows) for (let y of ys) row[y] = fn(row[y])
    return this
  }

  * indexed(by, to) { yield* indexed(this.rows, by, to) }
  * entryIndexed(kv, by, to) { yield* entryIndexed(this.rows, indexesOf.call(this.head, kv), by, to) }
  * tripletIndexed(xyz, by, to) { yield* tripletIndexed(this.rows, indexesOf.call(this.head, xyz), by, to) }
  * indexedTo(to) { yield* indexedTo(this.rows, to) }
  * entryIndexedTo(kv, to) { yield* entryIndexedTo(this.rows, indexesOf.call(this.head, kv), to) }
  * tripletIndexedTo(xyz, to) { yield* tripletIndexedTo(this.rows, indexesOf.call(this.head, xyz), to) }
}