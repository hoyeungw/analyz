import { shallow } from '@vect/matrix-init';
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

class XMappable {
  side;
  rows;

  constructor({
    side,
    rows
  }) {
    this.side = side, this.rows = rows;
  }

  mapKeys(fn) {
    return new XMappable({
      side: this.side.map(fn),
      rows: shallow(this.rows)
    });
  }

  mutateKeys(fn) {
    return mutate(this.side, fn), this;
  }

  map(keys, fn) {
    keys = Labels.prototype.indexesOf.call(this.side, keys);
    const rows = shallow(this.rows);

    for (let x of keys) {
      mutate(rows[x], fn);
    }

    return new XMappable({
      side: this.side.slice(),
      rows
    });
  }

  mutate(keys, fn) {
    keys = Labels.prototype.indexesOf.call(this.side, keys);

    for (let x of keys) {
      mutate(this.rows[x], fn);
    }

    return this;
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

  mapKeys(fn) {
    return new YMappable({
      head: this.head.map(fn),
      rows: shallow(this.rows)
    });
  }

  mutateKeys(fn) {
    return mutate(this.head, fn), this;
  }

  map(keys, fn) {
    keys = Labels.prototype.indexesOf.call(this.head, keys);
    const rows = shallow(this.rows);

    for (let row of rows) for (let y of keys) row[y] = fn(row[y]);

    return new YMappable({
      head: this.head.slice(),
      rows
    });
  }

  mutate(keys, fn) {
    keys = Labels.prototype.indexesOf.call(this.head, keys);

    for (let row of this.rows) for (let y of keys) row[y] = fn(row[y]);

    return this;
  }

}

export { Labels, XMappable, YMappable };
