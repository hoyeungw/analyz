import { select, values } from '@vect/object-select'
import { Table }          from '@analyz/table'
import { keys }           from '@vect/object-index'
import { mapper }         from '@vect/vector-mapper'
import { Stat }           from '@analyz/crostab'
import { tripletIndexed } from '@vect/matrix-mapper'

export class Samples extends Array {
  title = null
  constructor(hi) { super(hi) }
  static build(hi) { return new Samples(hi) }
  static of(...samples) { return (new Samples(samples?.length)).acquire(samples) }
  static from(samples) { return (new Samples(samples?.length)).acquire(samples)}

  get head() { return this.length ? keys(this[0]) : [] }

  acquire(samples) {
    for (let i = 0, h = samples.length; i < h; i++) { this[i] = samples[i] }
    return this
  }
  collect(iter) {
    for (let sample of iter) { this.push(sample) }
    return this
  }

  select(keys) { return this.copy(this.map(select.bind(keys))) }
  copy(samples) { return Samples.from(samples ?? this) }
  table(fields) { return Table.build(fields ?? this.head, mapper(this, values.bind(fields)), this.title) }
  crostab(x, y, v, mode, by) {
    return Stat.of(mode).collect(tripletIndexed(this, [x, y, v], by))
  }
}