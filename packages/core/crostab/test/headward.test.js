import { XMappable, YMappable }     from '@analyz/mappable'
import { XSelectable, YSelectable } from '@analyz/selectable'
import { XUpdatable, YUpdatable }   from '@analyz/updatable'
import { mixin }                    from '@ject/mixin'
import { decoTable, logger }        from '@spare/logger'

/**
 * @typedef Headward2
 * @type {Class}
 * @property {function(string[],function):Headward2} Headward2.mutate
 */

/**
 *
 * @type {Function}
 */
export const Sideward2 = mixin(XMappable, XSelectable, XUpdatable)
export const Headward2 = mixin(YMappable, YSelectable, YUpdatable)

const headward = new Headward2({
  side: ['A', 'B', 'C', 'D', 'E'],
  head: ['a', 'b', 'c', 'd'],
  rows: [
    [0, 1, 2, 3],
    [0, 1, 2, 3],
    [0, 1, 2, 3],
    [0, 1, 2, 3],
    [0, 1, 2, 3],
  ]
})

Headward2.prototype |> Object.getOwnPropertyNames |> logger
headward.mutate(['b', 'c'], x => x + 10)

headward |> decoTable |> logger

