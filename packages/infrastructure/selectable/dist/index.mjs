import { transpose } from '@vect/matrix-algebra';
import { select } from '@vect/vector-select';
import { zipper } from '@vect/vector-zipper';
import { Labels } from '@analyz/mappable';
import { select as select$1 } from '@vect/columns-select';

class XSelectable {
  side;
  rows;

  constructor({
    side,
    rows
  }) {
    this.side = side, this.rows = rows;
  }

  select(keys) {
    const xs = Labels.prototype.indexesAt.call(this.side, keys);
    this.head = xs.map(({
      as
    }) => as), this.rows = select(this.rows, xs.map(({
      at
    }) => at));
    return this; // return new XSelectable({head: xs.map(({as}) => as), rows: select(this.rows, xs.map(({at}) => at))})
  }

  filter(x, by) {
    const xi = this.side.indexOf(x);
    const columns = transpose(this.rows).filter(col => by(col[xi]));
    this.rows = transpose(columns);
    return this; // return new XSelectable({side: this.side.slice(), rows: transpose(columns)})
  }

  sortKeys(comp) {
    const list = zipper(this.side, this.rows, (key, row) => ({
      key,
      row
    }));
    list.sort((a, b) => comp(a.key, b.key));
    this.side = list.map(({
      key
    }) => key), this.rows = list.map(({
      row
    }) => row);
    return this; // return new XSelectable({side: list.map(({key}) => key), rows: list.map(({row}) => row)})
  }

  sortKeysBy(yi, comp) {
    const list = zipper(this.side, this.rows, (key, row) => ({
      y: row[yi],
      key,
      row
    }));
    list.sort((a, b) => comp(a.y, b.y));
    this.side = list.map(({
      key
    }) => key), this.rows = list.map(({
      row
    }) => row);
    return this; // return new XSelectable({side: list.map(({key}) => key), rows: list.map(({row}) => row)})
  }

}

class YSelectable {
  head;
  rows;

  constructor({
    head,
    rows
  }) {
    this.head = head, this.rows = rows;
  }

  select(keys) {
    const ys = Labels.prototype.indexesAt.call(this.head, keys);
    this.head = ys.map(({
      as
    }) => as), this.rows = select$1(this.rows, ys.map(({
      at
    }) => at));
    return this; // return new YSelectable({head: ys.map(({as}) => as), rows: select(this.rows, ys.map(({at}) => at))})
  }

  filter(y, by) {
    const yi = this.head.indexOf(y);
    this.rows = this.rows.filter(row => by(row[yi]));
    return this; // return new YSelectable({side: this.head.slice(), rows: this.rows.filter(row => by(row[yi]))})
  }

  sortKeys(comp) {
    const list = zipper(this.head, transpose(this.rows), (key, col) => ({
      key,
      col
    }));
    list.sort((a, b) => comp(a.key, b.key));
    this.head = list.map(({
      key
    }) => key), this.rows = transpose(list.map(({
      col
    }) => col));
    return this; // return new YSelectable({head: list.map(({key}) => key), rows: transpose(list.map(({col}) => col))})
  }

  sortKeysBy(xi, comp) {
    const list = zipper(this.head, transpose(this.rows), (key, col) => ({
      x: col[xi],
      key,
      col
    }));
    list.sort((a, b) => comp(a.x, b.x));
    this.head = list.map(({
      key
    }) => key), this.rows = transpose(list.map(({
      col
    }) => col));
    return this; // return new YSelectable({head: list.map(({key}) => key), rows: transpose(list.map(({col}) => col))})
  }

}

export { XSelectable, YSelectable };
