import { YMappable }   from '@analyz/mappable'
import { YSelectable } from '@analyz/selectable'
import { YUpdatable }  from '@analyz/updatable'

export class Headward {
  head
  rows
  constructor({head, rows}) { this.head = head, this.rows = rows }
  mapKeys(fn) { return YMappable.prototype.mapKeys.call(this, fn) }
  mutateKeys(fn) { return YMappable.prototype.mutateKeys.call(this, fn) }
  map(keys, fn) { return YMappable.prototype.map.call(this, keys, fn) }
  mutate(keys, fn) { return YMappable.prototype.mutate.call(this, keys, fn) }

  select(keys) { return YSelectable.prototype.select.call(this, keys) }
  filter(x, by) { return YSelectable.prototype.filter.call(this, x, by) }
  sortKeys(comp) { return YSelectable.prototype.sortKeys.call(this, comp) }
  sortKeysBy(yi, comp) { return YSelectable.prototype.sortKeysBy.call(this, yi, comp) }

  set(x, row) { return YUpdatable.prototype.set.call(this, x, row) }
  delete(x) { return YUpdatable.prototype.delete.call(this, x) }
  prepend(x, row) { return YUpdatable.prototype.prepend.call(this, x, row) }
  append(x, row) { return YUpdatable.prototype.append.call(this, x, row) }
  shift() { return YUpdatable.prototype.shift.call(this) }
  pop() { return YUpdatable.prototype.pop.call(this) }
  grow(from, to, as, at) { return YUpdatable.prototype.grow.call(this, from, to, as, at) }
}
