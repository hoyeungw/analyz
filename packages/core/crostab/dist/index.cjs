'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mappable = require('@analyz/mappable');
var selectable = require('@analyz/selectable');
var updatable = require('@analyz/updatable');

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
    return mappable.YMappable.prototype.mapKeys.call(this, fn);
  }

  mutateKeys(fn) {
    return mappable.YMappable.prototype.mutateKeys.call(this, fn);
  }

  map(keys, fn) {
    return mappable.YMappable.prototype.map.call(this, keys, fn);
  }

  mutate(keys, fn) {
    return mappable.YMappable.prototype.mutate.call(this, keys, fn);
  }

  select(keys) {
    return selectable.YSelectable.prototype.select.call(this, keys);
  }

  filter(x, by) {
    return selectable.YSelectable.prototype.filter.call(this, x, by);
  }

  sortKeys(comp) {
    return selectable.YSelectable.prototype.sortKeys.call(this, comp);
  }

  sortKeysBy(yi, comp) {
    return selectable.YSelectable.prototype.sortKeysBy.call(this, yi, comp);
  }

  set(x, row) {
    return updatable.YUpdatable.prototype.set.call(this, x, row);
  }

  delete(x) {
    return updatable.YUpdatable.prototype.delete.call(this, x);
  }

  prepend(x, row) {
    return updatable.YUpdatable.prototype.prepend.call(this, x, row);
  }

  append(x, row) {
    return updatable.YUpdatable.prototype.append.call(this, x, row);
  }

  shift() {
    return updatable.YUpdatable.prototype.shift.call(this);
  }

  pop() {
    return updatable.YUpdatable.prototype.pop.call(this);
  }

  grow(from, to, as, at) {
    return updatable.YUpdatable.prototype.grow.call(this, from, to, as, at);
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
    return mappable.XMappable.prototype.mapKeys.call(this, fn);
  }

  mutateKeys(fn) {
    return mappable.XMappable.prototype.mutateKeys.call(this, fn);
  }

  map(keys, fn) {
    return mappable.XMappable.prototype.map.call(this, keys, fn);
  }

  mutate(keys, fn) {
    return mappable.XMappable.prototype.mutate.call(this, keys, fn);
  }

  select(keys) {
    return selectable.XSelectable.prototype.select.call(this, keys);
  }

  filter(x, by) {
    return selectable.XSelectable.prototype.filter.call(this, x, by);
  }

  sortKeys(comp) {
    return selectable.XSelectable.prototype.sortKeys.call(this, comp);
  }

  sortKeysBy(yi, comp) {
    return selectable.XSelectable.prototype.sortKeysBy.call(this, yi, comp);
  }

  set(x, row) {
    return updatable.XUpdatable.prototype.set.call(this, x, row);
  }

  delete(x) {
    return updatable.XUpdatable.prototype.delete.call(this, x);
  }

  prepend(x, row) {
    return updatable.XUpdatable.prototype.prepend.call(this, x, row);
  }

  append(x, row) {
    return updatable.XUpdatable.prototype.append.call(this, x, row);
  }

  shift() {
    return updatable.XUpdatable.prototype.shift.call(this);
  }

  pop() {
    return updatable.XUpdatable.prototype.pop.call(this);
  }

  grow(from, to, as, at) {
    return updatable.XUpdatable.prototype.grow.call(this, from, to, as, at);
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

exports.Crostab = Crostab;
