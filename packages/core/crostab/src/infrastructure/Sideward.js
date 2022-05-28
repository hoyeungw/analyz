import { ProxyFab }    from '@analyz/indexable'
import { XMappable }   from '@analyz/mappable'
import { XSelectable } from '@analyz/selectable'
import { XUpdatable }  from '@analyz/updatable'

export class Sideward {
  side
  rows
  constructor({ side, rows }) {
    this.side = side, this.rows = rows
  }

  get at() { return this._sdi ?? (this._sdi = ProxyFab.sidewardIndexer(this)) }

  mutateKeys(fn) { return XMappable.prototype.mutateKeys.call(this, fn) }
  mutateAt(x, fn) { return XMappable.prototype.mutateAt.call(this, x, fn) }
  mutate(xs, fn) { return XMappable.prototype.mutate.call(this, xs, fn) }
  * indexed(by, to) { yield* XMappable.prototype.indexed.call(this, by, to) }
  * entryIndexed(kv, by, to) { yield* XMappable.prototype.entryIndexed.call(this, kv, by, to) }
  * tripletIndexed(xyz, by, to) { yield* XMappable.prototype.tripletIndexed.call(this, xyz, by, to) }
  * indexedTo(to) { yield* XMappable.prototype.indexedTo.call(this, to) }
  * entryIndexedTo(kv, to) { yield* XMappable.prototype.entryIndexedTo.call(this, kv, to) }
  * tripletIndexedTo(xyz, to) { yield* XMappable.prototype.tripletIndexedTo.call(this, xyz, to) }

  select(keys) { return XSelectable.prototype.select.call(this, keys) }
  selectAs(keys) { return XSelectable.prototype.selectAs.call(this, keys) }
  filterKeys(by) { return XSelectable.prototype.filterKeys.call(this, by) }
  filterKeysBy(yi, by) { return XSelectable.prototype.filterKeysBy.call(this, yi, by) }
  sortKeys(comp) { return XSelectable.prototype.sortKeys.call(this, comp) }
  sortKeysBy(yi, comp) { return XSelectable.prototype.sortKeysBy.call(this, yi, comp) }

  set(x, row) { return XUpdatable.prototype.set.call(this, x, row) }
  delete(x) { return XUpdatable.prototype.delete.call(this, x) }
  prepend(x, row) { return XUpdatable.prototype.prepend.call(this, x, row) }
  append(x, row) { return XUpdatable.prototype.append.call(this, x, row) }
  shift() { return XUpdatable.prototype.shift.call(this) }
  pop() { return XUpdatable.prototype.pop.call(this) }
  grow(from, to, as, at) { return XUpdatable.prototype.grow.call(this, from, to, as, at) }
}


