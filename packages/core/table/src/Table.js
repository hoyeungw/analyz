import { Headward } from '@analyz/crostab'

export class Table extends Headward {
  title
  constructor(table) {
    super(table)
    this.title = table?.title
  }
}