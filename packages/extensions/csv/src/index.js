import { Crostab } from '@analyz/crostab'
import { Table }   from '@analyz/table'
import { indexed } from './indexed.js'

export { indexed }

export const csvToTable = (csv, options) => {
  const enumerator = indexed(csv, options)
  const { done, value: head } = enumerator.next()
  if (done) return null
  return Table.build(head, [...enumerator])
}

export const csvToCrostab = (csv, options) => {
  const enumerator = indexed(csv, options)
  const { done, value } = enumerator.next()
  if (done) return null
  const [title, ...head] = value
  const side = [], rows = []
  for (let [mark, ...row] of enumerator) {
    side.push(mark)
    rows.push(row)
  }
  return Crostab.build(side, head, rows, title)
}
