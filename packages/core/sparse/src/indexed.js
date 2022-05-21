export function* indexedOf(sparse) {
  let row
  for (let x in sparse) {
    for (let y in (row = sparse[x])) {
      yield [ x, y, row[y] ]
    }
  }
}

export function* indexedBy(sparse, by) {
  let row
  for (let x in sparse) {
    for (let y in (row = sparse[x])) {
      const v = row[y]
      if (by(x, y, v)) yield [ x, y, v ]
    }
  }
}

export function* indexedTo(sparse, to) {
  let row
  for (let x in sparse) {
    for (let y in (row = sparse[x])) {
      yield to(x, y, row[y])
    }
  }
}

export function* indexed(sparse, by, to) {
  if (!to) { return yield* (!by ? indexedOf(sparse) : indexedBy(sparse, by)) }
  let row
  for (let x in sparse) {
    for (let y in (row = sparse[x])) {
      const v = row[y]
      if (by(x, y, v)) yield to(x, y, v)
    }
  }
}