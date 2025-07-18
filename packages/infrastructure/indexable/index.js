class ProxyFab {
  static sidewardIndexer(sideward) {
    return new Proxy(sideward, {
      get(sideward, x) {
        const { side, rows } = sideward, xi = side.indexOf(x);
        return rows[xi]
      },
      set(sideward, x, row) {
        const xi = sideward.side.indexOf(x);
        return ~xi ? (sideward.rows[xi] = row, true) : false
      }
    })
  }
  static headwardIndexer(headward) {
    return new Proxy(headward, {
      get(headward, y) {
        const { head, rows } = headward, h = rows.length, yi = head.indexOf(y), column = [];
        for (let i = 0; i < h; i++) { column[i] = rows[i][yi]; }
        return column
      },
      set(headward, y, column) {
        const { head, rows } = headward, h = rows.length, yi = head.indexOf(y);
        for (let i = 0; i < h; i++) { rows[i][yi] = column[i]; }
        return true
      }
    })
  }
}

class YIndexable {
  head
  rows
  _hdi
  constructor({ head, table }) { this.head = head, this.rows = table; }
  get at() { return this._hdi ?? (this._hdi = ProxyFab.headwardIndexer(this)) }
}

class XIndexable {
  side
  rows
  _sdi
  constructor({ head, table }) { this.head = head, this.rows = table; }
  get at() { return this._sdi ?? (this._sdi = ProxyFab.sidewardIndexer(this)) }
}

export { ProxyFab, XIndexable, YIndexable };
