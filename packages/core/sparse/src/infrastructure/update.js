export function updateCell(x, y, v) {
  const row = this[x] ?? (this[x] = {})
  row[y] = v
}

export function appendCell(x, y, v) {
  const row = this[x] ?? (this[x] = {})
  const cell = row[y] ?? (row[y] = [])
  cell.push(v)
}

export function assignCell(x, y, k, v) {
  const row = this[x] ?? (this[x] = {})
  const cell = row[y] ?? (row[y] = {})
  cell[k] = v
}
