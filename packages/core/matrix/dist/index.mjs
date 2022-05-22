import { points, entries, triplets, pointsTo, entriesTo, tripletsTo } from '@vect/matrix-mapper';
import { columns, columnsTo } from '@vect/columns-mapper';
import { indexed, indexedTo } from '@vect/vector-mapper';

class ProxyFab {
  static columnsProxy(rows) {
    return new Proxy(rows, {
      get(rows, yi) {
        return rows.map(row => row[yi]);
      },

      set(rows, yi, column) {
        for (let i = 0, h = rows.length; i < h; i++) {
          rows[i][yi] = column[i];
        }

        return true;
      }

    });
  }

}

class Matrix extends Array {
  /** @type {Array} */
  #cols;

  constructor(size) {
    super(size);
  }

  static of(...rows) {
    return new Matrix(rows === null || rows === void 0 ? void 0 : rows.length).collect(rows);
  }

  static from(rows) {
    return new Matrix(rows === null || rows === void 0 ? void 0 : rows.length).collect(rows);
  }

  get height() {
    return this.length;
  }

  get width() {
    var _this$;

    return (_this$ = this[0]) === null || _this$ === void 0 ? void 0 : _this$.length;
  }

  get size() {
    return [this.height, this.width];
  }

  collect(iter, lo = 0) {
    for (let row of iter) this[lo++] = row;

    return this;
  }

  get rows() {
    return this;
  }
  /** @returns {Array} */


  get columns() {
    return this.#cols ?? (this.#cols = ProxyFab.columnsProxy(this));
  }

  row(x) {
    return this[x];
  }

  column(y) {
    let h = this.length,
        col = Array(h);

    for (--h; h >= 0; h--) col[h] = this[h][y];

    return col;
  }

  *rowIter(x) {
    yield* this[x];
  }

  *columnIter(y) {
    for (let i = 0, h = this.length; i < h; i++) yield this[i][y];
  }

  *rowsBy(by, to) {
    yield* indexed(this, by, to);
  }

  *columnsBy(by, to) {
    yield* columns(this, by, to);
  }

  *pointsBy(by, to) {
    yield* points(this, by, to);
  }

  *entriesBy(xy, by, to) {
    yield* entries(this, xy, to);
  }

  *tripletsBy(xyz, by, to) {
    yield* triplets(this, xyz, by, to);
  }

  *rowsTo(to) {
    yield* indexedTo(this, to);
  }

  *columnsTo(to) {
    yield* columnsTo(this, to);
  }

  *pointsTo(to) {
    yield* pointsTo(this, to);
  }

  *entriesTo(xy, to) {
    yield* entriesTo(this, xy, to);
  }

  *tripletsTo(xyz, to) {
    yield* tripletsTo(this, xyz, to);
  }

}

export { Matrix };
