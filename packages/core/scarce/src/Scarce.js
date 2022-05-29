import { mapVal }             from '@vect/object-mapper'
import { indexed, indexedTo } from '@vect/vector-mapper'
import { oneself }            from '@ject/oneself'
import { List }               from './infrastructure/List'

export class Scarce {
  data = {}
  #init = null
  #base = null
  constructor(fill = List.build) {
    fill instanceof Function ? (this.#init = fill) : (this.#base = fill)
  }
  static build(fill) { return new Scarce(fill) }
  static from(data, fill) {
    const scarce = new Scarce(fill)
    scarce.data = data
    return scarce
  }

  [Symbol.iterator]() { return this.indexed() }
  clear() { for (let k in this.data) delete this.data[k] }
  get zero() { return this.#init?.call(this) ?? this.#base }

  get(k) { return this.data[k] ?? (this.data[k] = this.zero) }

  update(k, v) { this.get(k).push(v) }
  collect(iter) {
    for (let [ k, v ] of iter) this.update(k, v)
    return this
  }
  * indexed(by, to) { yield* indexed(this.data, by, to) }
  * indexedTo(to) { yield* indexedTo(this.data, to) }
  get keys() { return Object.keys(this.data) }
  object(to) { return mapVal(this.data, to ?? oneself) }
}