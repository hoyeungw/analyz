import { indexed, indexedTo } from '@vect/columns-mapper';
import { transpose } from '@vect/matrix-algebra';
import { entryIndexed, tripletIndexed, entryIndexedTo, tripletIndexedTo, mutate as mutate$1, indexed as indexed$1, indexedTo as indexedTo$1 } from '@vect/matrix-mapper';
import { mutate } from '@vect/vector-mapper';

class Labels extends Array {
  constructor(size) {
    super(size);
  }

  indexesOf(keys) {
    return keys.map(key => this.indexOf(key));
  }

  indexAt(key) {
    return Array.isArray(key) ? {
      at: this.indexOf(key[0]),
      as: key[1]
    } : {
      at: this.indexOf(key),
      as: key
    };
  }

  indexesAt(keys) {
    return keys.map(Labels.prototype.indexAt.bind(this));
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
  } // mapKeys(fn) { return new XMappable({side: this.side.map(fn), rows: shallow(this.rows)}) }
  // map(keys, fn) {
  //   keys = indexesOf.call(this.side, keys)
  //   const rows = shallow(this.rows)
  //   for (let x of keys) { mutate(rows[x], fn) }
  //   return new XMappable({side: this.side.slice(), rows})
  // }


  mutateKeys(fn) {
    return mutate(this.side, fn), this;
  }

  mutate(keys, fn) {
    keys = indexesOf.call(this.side, keys);

    for (let x of keys) {
      mutate(this.rows[x], fn);
    }

    return this;
  }

  *indexed(by, to) {
    yield* indexed(this.rows, by, to);
  }

  *entryIndexed(kv, by, to) {
    yield* entryIndexed(transpose(this.rows), kv, by, to);
  }

  *tripletIndexed(xyz, by, to) {
    yield* tripletIndexed(transpose(this.rows), xyz, by, to);
  }

  *indexedTo(to) {
    yield* indexedTo(this.rows, to);
  }

  *entryIndexedTo(kv, to) {
    yield* entryIndexedTo(transpose(this.rows), kv, to);
  }

  *tripletIndexedTo(xyz, to) {
    yield* tripletIndexedTo(transpose(this.rows), xyz, to);
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
  } // mapKeys(fn) { return new YMappable({head: this.head.map(fn), rows: shallow(this.rows)})}
  // map(keys, fn) {
  //   keys = Labels.prototype.indexesOf.call(this.head, keys)
  //   const rows = shallow(this.rows)
  //   for (let row of rows) for (let y of keys) row[y] = fn(row[y])
  //   return new YMappable({head: this.head.slice(), rows})
  // }


  mutateKeys(fn) {
    return mutate(this.head, fn), this;
  }

  mutateValues(fn) {
    return mutate$1(this.rows, fn), this;
  }

  mutate(keys, fn) {
    keys = indexesOf.call(this.head, keys);

    for (let row of this.rows) for (let y of keys) row[y] = fn(row[y]);

    return this;
  }

  *indexed(by, to) {
    yield* indexed$1(this.rows, by, to);
  }

  *entryIndexed(kv, by, to) {
    yield* entryIndexed(this.rows, kv, by, to);
  }

  *tripletIndexed(xyz, by, to) {
    yield* tripletIndexed(this.rows, xyz, by, to);
  }

  *indexedTo(to) {
    yield* indexedTo$1(this.rows, to);
  }

  *entryIndexedTo(kv, to) {
    yield* entryIndexedTo(this.rows, kv, to);
  }

  *tripletIndexedTo(xyz, to) {
    yield* tripletIndexedTo(this.rows, xyz, to);
  }

}

export { Labels, XMappable, YMappable, indexesAt, indexesOf };
