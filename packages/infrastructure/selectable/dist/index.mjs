import { indexesOf, indexesAt } from '@analyz/mappable';
import { fitRoll } from '@vect/vector-index';
import { mutate, iterate } from '@vect/vector-mapper';
import { keep } from '@vect/vector-update';
import { transpose } from '@vect/matrix-algebra';

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
    const {
      side,
      rows
    } = this,
          inds = indexesOf.call(side, keys);
    keep(side, fitRoll(inds)), keep(rows, inds);
    return this;
  }

  selectAs(keys) {
    const {
      side,
      rows
    } = this,
          inds = indexesAt.call(this.side, keys);
    side.splice(inds.length);
    mutate(side, (_, i) => inds[i].as), keep(rows, fitRoll(inds.map(({
      at
    }) => at)));
    return this;
  }

  filterKeys(by) {
    const {
      side,
      rows
    } = this,
          h = rows.length,
          inds = [];

    for (let i = 0; i < h; i++) {
      if (by(side[i], i)) inds.push(i);
    }

    keep(side, inds), keep(rows, inds);
    return this;
  }

  filterKeysBy(yi, by) {
    const {
      side,
      rows
    } = this,
          h = rows.length,
          inds = [];

    for (let i = 0; i < h; i++) {
      if (by(rows[i][yi], i)) inds.push(i);
    }

    keep(side, inds), keep(rows, inds);
    return this;
  }

  sortKeys(comp) {
    const {
      side,
      rows
    } = this,
          h = rows.length;

    for (let i = 0; i < h; i++) {
      rows[i].key = side[i];
    }

    rows.sort((a, b) => comp(a.key, b.key));

    for (let i = 0; i < h; i++) {
      side[i] = rows[i].key, delete rows[i].key;
    }

    return this;
  }

  sortKeysBy(yi, comp) {
    const {
      side,
      rows
    } = this,
          h = rows.length;

    for (let i = 0; i < h; i++) {
      rows[i].key = side[i];
    }

    rows.sort((a, b) => comp(a[yi], b[yi]));

    for (let i = 0; i < h; i++) {
      side[i] = rows[i].key, delete rows[i].key;
    }

    return this;
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
    const {
      head,
      rows
    } = this,
          inds = indexesOf.call(head, keys);
    keep(head, fitRoll(inds)), iterate(rows, row => keep(row, inds));
    return this;
  }

  selectAs(keys) {
    const {
      head,
      rows
    } = this,
          inds = indexesAt.call(this.head, keys),
          fitInds = fitRoll(inds.map(({
      at
    }) => at));
    head.splice(inds.length);
    mutate(head, (_, i) => inds[i].as), iterate(rows, row => keep(row, fitInds));
    return this;
  }

  filterKeys(by) {
    const {
      head,
      rows
    } = this,
          w = head.length,
          inds = [];

    for (let j = 0; j < w; j++) {
      if (by(head[j], j)) inds.push(j);
    }

    keep(head, inds), iterate(rows, row => keep(row, inds));
    return this;
  }

  filterKeysBy(xi, by) {
    const {
      head,
      rows
    } = this,
          columns = transpose(rows),
          w = head.length,
          inds = [];

    for (let j = 0; j < w; j++) {
      if (by(columns[j][xi], j)) inds.push(j);
    }

    keep(head, inds), iterate(rows, row => keep(row, inds));
    return this;
  }

  sortKeys(comp) {
    const {
      head,
      rows
    } = this,
          columns = transpose(rows);

    for (let j = 0; j < head.length; j++) columns[j].key = head[j];

    const newRows = transpose(columns.sort((a, b) => comp(a.key, b.key)));
    mutate(head, (_, j) => columns[j].key);
    mutate(rows, (_, i) => newRows[i]);
    return this;
  }

  sortKeysBy(xi, comp) {
    const {
      head,
      rows
    } = this,
          columns = transpose(rows);

    for (let j = 0; j < head.length; j++) columns[j].key = head[j];

    const newRows = transpose(columns.sort((a, b) => comp(a[xi], b[xi])));
    mutate(head, (_, j) => columns[j].key);
    mutate(rows, (_, i) => newRows[i]);
    return this;
  }

}

export { XSelectable, YSelectable };
