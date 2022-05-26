import { XIndexable, YIndexable } from '@analyz/indexable';
import { XMappable, YMappable } from '@analyz/mappable';
import { XSelectable, YSelectable } from '@analyz/selectable';
import { XUpdatable, YUpdatable } from '@analyz/updatable';
import { mixin } from '@ject/mixin';

const shallow = mx => mx.map(r => r.slice());

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

function mutate$1(vec, fn, l) {
  l = l || (vec === null || vec === void 0 ? void 0 : vec.length);

  for (--l; l >= 0; l--) vec[l] = fn.call(this, vec[l], l);

  return vec;
}

function mutate(mx, fn, h, w) {
  var _mx$3;

  h = h || (mx === null || mx === void 0 ? void 0 : mx.length), w = w || h && ((_mx$3 = mx[0]) === null || _mx$3 === void 0 ? void 0 : _mx$3.length);

  for (let i = 0, j, r; i < h; i++) for (j = 0, r = mx[i]; j < w; j++) r[j] = fn(r[j], i, j);

  return mx;
}

/**
 * @typedef {Object} Sideward.at
 */

/**
 * @class
 * @typedef Sideward
 * @type {Class}
 * @property {function():Sideward} Sideward.mutate
 * @property {function():Sideward} Sideward.mutateKeys
 * @property {function():Sideward} Sideward.mutateValues
 * @property {function():Generator} Sideward.indexed
 * @property {function():Generator} Sideward.entryIndexed
 * @property {function():Generator} Sideward.tripletIndexed
 * @property {function():Generator} Sideward.indexedTo
 * @property {function():Generator} Sideward.entryIndexedTo
 * @property {function():Generator} Sideward.tripletIndexedTo
 * @property {function():Sideward} Sideward.select
 * @property {function():Sideward} Sideward.filter
 * @property {function():Sideward} Sideward.sortKeys
 * @property {function():Sideward} Sideward.sortKeysBy
 * @property {function():Sideward} Sideward.set
 * @property {function():Sideward} Sideward.delete
 * @property {function():Sideward} Sideward.prepend
 * @property {function():Sideward} Sideward.append
 * @property {function():Sideward} Sideward.shift
 * @property {function():Sideward} Sideward.pop
 * @property {function():Sideward} Sideward.grow
 */

const Sideward = mixin(XIndexable, XMappable, XUpdatable, XSelectable);
/**
 * @typedef {Object} Headward.at
 */

/**
 * @class
 * @typedef Headward
 * @typedef {Object} Headward.at
 * @type {Class}
 * @property {Object} Headward.at
 * @property {function():Headward} Headward.mutate
 * @property {function():Headward} Headward.mutateKeys
 * @property {function():Headward} Headward.mutateValues
 * @property {function():Generator} Headward.indexed
 * @property {function():Generator} Headward.entryIndexed
 * @property {function():Generator} Headward.tripletIndexed
 * @property {function():Generator} Headward.indexedTo
 * @property {function():Generator} Headward.entryIndexedTo
 * @property {function():Generator} Headward.tripletIndexedTo
 * @property {function():Headward} Headward.select
 * @property {function():Headward} Headward.filter
 * @property {function():Headward} Headward.sortKeys
 * @property {function():Headward} Headward.sortKeysBy
 * @property {function():Headward} Headward.set
 * @property {function():Headward} Headward.delete
 * @property {function():Headward} Headward.prepend
 * @property {function():Headward} Headward.append
 * @property {function():Headward} Headward.shift
 * @property {function():Headward} Headward.pop
 * @property {function():Headward} Headward.grow
 */

const Headward = mixin(YIndexable, YMappable, YUpdatable, YSelectable);
class Crostab {
  /** @type {string[]} */
  side;
  /** @type {string[]} */

  head;
  /** @type {any[][]} */

  rows;
  /** @type {string} */

  title;
  /** @type {Sideward} */

  #xward;
  /** @type {Headward} */

  #yward;

  constructor({
    side,
    head,
    rows,
    title
  }) {
    this.side = side;
    this.head = head;
    this.rows = rows;
    this.title = title;
  }
  /** @returns {Sideward} */


  get sideward() {
    return this.#xward ?? (this.#xward = new Sideward(this));
  }
  /** @returns {Headward} */


  get headward() {
    return this.#yward ?? (this.#yward = new Headward(this));
  }

  get size() {
    return [this.height, this.width];
  }

  get height() {
    return this.side.length;
  }

  get width() {
    return this.head.length;
  }

  roin(r) {
    return this.side.indexOf(r);
  }

  coin(c) {
    return this.head.indexOf(c);
  }

  cell(r, c) {
    const row = this.rows[this.roin(r)];
    return row[this.coin[c]];
  }

  coord(r, c) {
    return {
      x: this.roin(r),
      y: this.coin(c)
    };
  }

  mutate(fn) {
    return mutate(this.rows, fn, this.height, this.width), this;
  }

  mutateKeys(fn) {
    return mutate$1(this.side, fn), mutate$1(this.head, fn), this;
  }

  transpose(title) {
    let {
      side: head,
      head: side,
      rows: columns
    } = this;
    this.side = side, this.head = head, this.rows = transpose(columns), this.title = title ?? this.title;
    return this;
  }

  slice() {
    let {
      side,
      head,
      rows,
      title
    } = this;
    return new Crostab({
      side: side.slice(),
      head: head.slice(),
      rows: shallow(rows),
      title
    });
  }

}

export { Crostab, Headward, Sideward };
