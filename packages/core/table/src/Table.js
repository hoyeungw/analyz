import { Headward } from '@analyz/crostab'
import { shallow }  from '@vect/matrix-init'

export class Table extends Headward {
  title
  constructor(table) {
    super(table)
    this.title = table?.title
  }
  static from(o = {}) { return new Table(o) }
  slice() {
    let {head, rows, title} = this
    return new Table({head: head.slice(), rows: shallow(rows), title})
  }
}