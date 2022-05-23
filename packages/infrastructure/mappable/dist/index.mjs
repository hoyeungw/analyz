import '@vect/matrix-init';
import { entryIndexed, tripletIndexed, entryIndexedTo, tripletIndexedTo, mutate as mutate$1, indexed as indexed$1 } from '@vect/matrix-mapper';
import { mutate } from '@vect/vector-mapper';
import { indexed, indexedTo as indexedTo$1 } from '@vect/columns-mapper';

const height = mx => mx === null || mx === void 0 ? void 0 : mx.length;

const width = mx => {
  var _mx$;

  return mx !== null && mx !== void 0 && mx.length ? (_mx$ = mx[0]) === null || _mx$ === void 0 ? void 0 : _mx$.length : null;
};

/**
 * Transpose a 2d-array.
 * @param {*[][]} mx
 * @returns {*[][]}
 */


const transpose = mx => {
  const h = height(mx),
        w = width(mx),
        cols = Array(w);

  for (let j = 0; j < w; j++) for (let i = 0, col = cols[j] = Array(h); i < h; i++) col[i] = mx[i][j];

  return cols;
};

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
  //   keys = Labels.prototype.indexesOf.call(this.side, keys)
  //   const rows = shallow(this.rows)
  //   for (let x of keys) { mutate(rows[x], fn) }
  //   return new XMappable({side: this.side.slice(), rows})
  // }


  mutateKeys(fn) {
    return mutate(this.side, fn), this;
  }

  mutate(keys, fn) {
    keys = Labels.prototype.indexesOf.call(this.side, keys);

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
    yield* indexedTo$1(this.rows, to);
  }

  *entryIndexedTo(kv, to) {
    yield* entryIndexedTo(transpose(this.rows), kv, to);
  }

  *tripletIndexedTo(xyz, to) {
    yield* tripletIndexedTo(transpose(this.rows), xyz, to);
  }

}

function* indexedTo(sparse, to) {
  let row;

  for (let x in sparse) {
    for (let y in row = sparse[x]) {
      yield to(x, y, row[y]);
    }
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
    keys = Labels.prototype.indexesOf.call(this.head, keys);

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
    yield* indexedTo(this.rows, to);
  }

  *entryIndexedTo(kv, to) {
    yield* entryIndexedTo(this.rows, kv, to);
  }

  *tripletIndexedTo(xyz, to) {
    yield* tripletIndexedTo(this.rows, xyz, to);
  }

}

export { Labels, XMappable, YMappable };
