import { XMappable }   from '@analyz/mappable'
import { XSelectable } from '@analyz/selectable'
import { XUpdatable }  from '@analyz/updatable'

export class Sideward {
  side
  rows
  constructor({side, rows}) { this.side = side, this.rows = rows }
  mapKeys(fn) { return XMappable.prototype.mapKeys.call(this, fn) }
  mutateKeys(fn) { return XMappable.prototype.mutateKeys.call(this, fn) }
  map(keys, fn) { return XMappable.prototype.map.call(this, keys, fn) }
  mutate(keys, fn) { return XMappable.prototype.mutate.call(this, keys, fn) }

  select(keys) { return XSelectable.prototype.select.call(this, keys) }
  filter(x, by) { return XSelectable.prototype.filter.call(this, x, by) }
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
