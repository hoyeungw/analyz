import { ProxyFab }    from '@analyz/indexable'
import { YMappable }   from '@analyz/mappable'
import { YSelectable } from '@analyz/selectable'
import { YUpdatable }  from '@analyz/updatable'
import { XMappable }   from '@analyz/mappable'
import { XSelectable } from '@analyz/selectable'
import { XUpdatable }  from '@analyz/updatable'

export class Sideward {
  side
  rows
  constructor({side, rows}) {
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


export class Headward {
  head
  rows
  constructor({head, rows}) { this.head = head, this.rows = rows }

  get at() { return this._hdi ?? (this._hdi = ProxyFab.headwardIndexer(this)) }

  mutateKeys(fn) { return YMappable.prototype.mutateKeys.call(this, fn) }
  mutateAt(y, fn) { return YMappable.prototype.mutateAt.call(this, y, fn) }
  mutate(ys, fn) { return YMappable.prototype.mutate.call(this, ys, fn) }
  * indexed(by, to) { yield* YMappable.prototype.indexed.call(this, by, to) }
  * entryIndexed(kv, by, to) { yield* YMappable.prototype.entryIndexed.call(this, kv, by, to) }
  * tripletIndexed(xyz, by, to) { yield* YMappable.prototype.tripletIndexed.call(this, xyz, by, to) }
  * indexedTo(to) { yield* YMappable.prototype.indexedTo.call(this, to) }
  * entryIndexedTo(kv, to) { yield* YMappable.prototype.entryIndexedTo.call(this, kv, to) }
  * tripletIndexedTo(xyz, to) { yield* YMappable.prototype.tripletIndexedTo.call(this, xyz, to) }

  select(keys) { return YSelectable.prototype.select.call(this, keys) }
  selectAs(keys) { return YSelectable.prototype.selectAs.call(this, keys) }
  filterKeys(by) { return YSelectable.prototype.filterKeys.call(this, by) }
  filterKeysBy(xi, by) { return YSelectable.prototype.filterKeysBy.call(this, xi, by) }
  sortKeys(comp) { return YSelectable.prototype.sortKeys.call(this, comp) }
  sortKeysBy(xi, comp) { return YSelectable.prototype.sortKeysBy.call(this, xi, comp) }

  set(x, row) { return YUpdatable.prototype.set.call(this, x, row) }
  delete(x) { return YUpdatable.prototype.delete.call(this, x) }
  prepend(x, row) { return YUpdatable.prototype.prepend.call(this, x, row) }
  append(x, row) { return YUpdatable.prototype.append.call(this, x, row) }
  shift() { return YUpdatable.prototype.shift.call(this) }
  pop() { return YUpdatable.prototype.pop.call(this) }
  grow(from, to, as, at) { return YUpdatable.prototype.grow.call(this, from, to, as, at) }
}
