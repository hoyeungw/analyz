import { YMappable, XMappable } from '@analyz/mappable';
import { YSelectable, XSelectable } from '@analyz/selectable';
import { YUpdatable, XUpdatable } from '@analyz/updatable';

class Headward {
  head;
  rows;

  constructor({
    head,
    rows
  }) {
    this.head = head, this.rows = rows;
  }

  mapKeys(fn) {
    return YMappable.prototype.mapKeys.call(this, fn);
  }

  mutateKeys(fn) {
    return YMappable.prototype.mutateKeys.call(this, fn);
  }

  map(keys, fn) {
    return YMappable.prototype.map.call(this, keys, fn);
  }

  mutate(keys, fn) {
    return YMappable.prototype.mutate.call(this, keys, fn);
  }

  select(keys) {
    return YSelectable.prototype.select.call(this, keys);
  }

  filter(x, by) {
    return YSelectable.prototype.filter.call(this, x, by);
  }

  sortKeys(comp) {
    return YSelectable.prototype.sortKeys.call(this, comp);
  }

  sortKeysBy(yi, comp) {
    return YSelectable.prototype.sortKeysBy.call(this, yi, comp);
  }

  set(x, row) {
    return YUpdatable.prototype.set.call(this, x, row);
  }

  delete(x) {
    return YUpdatable.prototype.delete.call(this, x);
  }

  prepend(x, row) {
    return YUpdatable.prototype.prepend.call(this, x, row);
  }

  append(x, row) {
    return YUpdatable.prototype.append.call(this, x, row);
  }

  shift() {
    return YUpdatable.prototype.shift.call(this);
  }

  pop() {
    return YUpdatable.prototype.pop.call(this);
  }

  grow(from, to, as, at) {
    return YUpdatable.prototype.grow.call(this, from, to, as, at);
  }

}

class Sideward {
  side;
  rows;

  constructor({
    side,
    rows
  }) {
    this.side = side, this.rows = rows;
  }

  mapKeys(fn) {
    return XMappable.prototype.mapKeys.call(this, fn);
  }

  mutateKeys(fn) {
    return XMappable.prototype.mutateKeys.call(this, fn);
  }

  map(keys, fn) {
    return XMappable.prototype.map.call(this, keys, fn);
  }

  mutate(keys, fn) {
    return XMappable.prototype.mutate.call(this, keys, fn);
  }

  select(keys) {
    return XSelectable.prototype.select.call(this, keys);
  }

  filter(x, by) {
    return XSelectable.prototype.filter.call(this, x, by);
  }

  sortKeys(comp) {
    return XSelectable.prototype.sortKeys.call(this, comp);
  }

  sortKeysBy(yi, comp) {
    return XSelectable.prototype.sortKeysBy.call(this, yi, comp);
  }

  set(x, row) {
    return XUpdatable.prototype.set.call(this, x, row);
  }

  delete(x) {
    return XUpdatable.prototype.delete.call(this, x);
  }

  prepend(x, row) {
    return XUpdatable.prototype.prepend.call(this, x, row);
  }

  append(x, row) {
    return XUpdatable.prototype.append.call(this, x, row);
  }

  shift() {
    return XUpdatable.prototype.shift.call(this);
  }

  pop() {
    return XUpdatable.prototype.pop.call(this);
  }

  grow(from, to, as, at) {
    return XUpdatable.prototype.grow.call(this, from, to, as, at);
  }

}

class Crostab {
  side;
  head;
  rows;
  #xward;
  #yward;

  constructor({
    side,
    head,
    rows
  }) {
    this.side = side;
    this.head = head;
    this.rows = rows;
  }

  get sideward() {
    return this.#xward ?? (this.#xward = new Sideward(this));
  }

  get headward() {
    return this.#yward ?? (this.#yward = new Headward(this));
  }

}

export { Crostab };
