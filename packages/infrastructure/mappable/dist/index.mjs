import { indexed, indexedTo } from '@vect/columns-mapper';
import { transpose } from '@vect/matrix-algebra';
import { entryIndexed, tripletIndexed, entryIndexedTo, tripletIndexedTo, mutate as mutate$1, indexed as indexed$1, indexedTo as indexedTo$1 } from '@vect/matrix-mapper';
import { mutate } from '@vect/vector-mapper';

class Labels extends Array {
  constructor(size) {
    super(size);
  }

  indexesOf(keys) {
    let inds = [],
        i;

    for (let key of keys) if (~(i = this.indexOf(key))) inds.push(i);

    return inds;
  }

  indexAt(key) {
    let at, from, as;
    return Array.isArray(key) ? ([from, as] = key) && ~(at = this.indexOf(from)) ? {
      at,
      as
    } : null : (from = key, as = key) && ~(at = this.indexOf(from)) ? {
      at,
      as
    } : null;
  }

  indexesAt(keys) {
    let inds = [],
        info,
        {
      indexAt
    } = Labels.prototype;

    for (let key of keys) if (info = indexAt.call(this, key)) inds.push(info);

    return inds;
  }

}
const {
  indexesOf,
  indexesAt
} = Labels.prototype;

class XMappable {
  side;
  rows;

  constructor({
    side,
    rows
  }) {
    this.side = side, this.rows = rows;
  }

  mutateKeys(fn) {
    return mutate(this.side, fn), this;
  }

  mutateAt(x, fn) {
    x = this.side.indexOf(x);
    if (!~x) return this;

    for (let row of this.rows) row[x] = fn(row[x]);

    return this;
  }

  mutate(xs, fn) {
    if (!Array.isArray(xs)) return this.mutateAt(xs, fn);
    if (xs.length === 1) return this.mutateAt(xs[0], fn);
    xs = indexesOf.call(this.side, xs);

    for (let row of this.rows) for (let x of xs) row[x] = fn(row[x]);

    return this;
  }

  *indexed(by, to) {
    yield* indexed(this.rows, by, to);
  }

  *entryIndexed(kv, by, to) {
    yield* entryIndexed(transpose(this.rows), indexesOf.call(this.side, kv), by, to);
  }

  *tripletIndexed(xyz, by, to) {
    yield* tripletIndexed(transpose(this.rows), indexesOf.call(this.side, xyz), by, to);
  }

  *indexedTo(to) {
    yield* indexedTo(this.rows, to);
  }

  *entryIndexedTo(kv, to) {
    yield* entryIndexedTo(transpose(this.rows), indexesOf.call(this.side, kv), to);
  }

  *tripletIndexedTo(xyz, to) {
    yield* tripletIndexedTo(transpose(this.rows), indexesOf.call(this.side, xyz), to);
  }

}

class YMappable {
  head;
  rows;

  constructor({
    head,
    rows
  }) {
    this.head = head, this.rows = rows;
  }

  mutateKeys(fn) {
    return mutate(this.head, fn), this;
  }

  mutateValues(fn) {
    return mutate$1(this.rows, fn), this;
  }

  mutateAt(y, fn) {
    y = this.head.indexOf(y);
    if (!~y) return this;

    for (let row of this.rows) row[y] = fn(row[y]);

    return this;
  }

  mutate(ys, fn) {
    if (!Array.isArray(ys)) return this.mutateAt(ys, fn);
    if (ys.length === 1) return this.mutateAt(ys[0], fn);
    ys = indexesOf.call(this.head, ys);

    for (let row of this.rows) for (let y of ys) row[y] = fn(row[y]);

    return this;
  }

  *indexed(by, to) {
    yield* indexed$1(this.rows, by, to);
  }

  *entryIndexed(kv, by, to) {
    yield* entryIndexed(this.rows, indexesOf.call(this.head, kv), by, to);
  }

  *tripletIndexed(xyz, by, to) {
    yield* tripletIndexed(this.rows, indexesOf.call(this.head, xyz), by, to);
  }

  *indexedTo(to) {
    yield* indexedTo$1(this.rows, to);
  }

  *entryIndexedTo(kv, to) {
    yield* entryIndexedTo(this.rows, indexesOf.call(this.head, kv), to);
  }

  *tripletIndexedTo(xyz, to) {
    yield* tripletIndexedTo(this.rows, indexesOf.call(this.head, xyz), to);
  }

}

export { Labels, XMappable, YMappable, indexesAt, indexesOf };
