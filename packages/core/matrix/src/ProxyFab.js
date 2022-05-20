export class ProxyFab {
  static columnsProxy(rows) {
    return new Proxy(rows, {
      get(rows, yi) { return rows.map(row => row[yi]) },
      set(rows, yi, column) {
        for (let i = 0, h = rows.length; i < h; i++) { rows[i][yi] = column[i] }
      }
    })
  }
}