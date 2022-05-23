import { XIndexable, YIndexable }   from '@analyz/indexable'
import { XMappable, YMappable }     from '@analyz/mappable'
import { XSelectable, YSelectable } from '@analyz/selectable'
import { XUpdatable, YUpdatable }   from '@analyz/updatable'
import { mixin }                    from '@ject/mixin'

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
export const Sideward = mixin(XIndexable, XMappable, XUpdatable, XSelectable)


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
export const Headward = mixin(YIndexable, YMappable, YUpdatable, YSelectable)

export class Crostab {
  side
  head
  rows
  title
  /** @type {Sideward} */ #xward
  /** @type {Headward} */ #yward

  constructor({side, head, rows, title}) {
    this.side = side
    this.head = head
    this.rows = rows
    this.title = title
  }
  /** @returns {Sideward} */ get sideward() { return this.#xward ?? (this.#xward = new Sideward(this)) }
  /** @returns {Headward} */ get headward() { return this.#yward ?? (this.#yward = new Headward(this)) }
}