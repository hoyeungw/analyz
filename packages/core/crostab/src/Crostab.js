import { Headward } from './Headward'
import { Sideward } from './Sideward'

export class Crostab {
  side
  head
  rows
  #xward
  #yward
  constructor({side, head, rows}) {
    this.side = side
    this.head = head
    this.rows = rows
  }
  get sideward() { return this.#xward ?? (this.#xward = new Sideward(this)) }
  get headward() { return this.#yward ?? (this.#yward = new Headward(this)) }
}