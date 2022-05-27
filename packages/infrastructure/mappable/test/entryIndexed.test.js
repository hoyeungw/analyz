import { TableCollection } from '@foba/table'
import { decoTable }       from '@spare/logger'
import { YMappable }       from '../dist/index'
// import { entryIndexed }    from '@vect/matrix-mapper'
// import { YMappable }       from '../src/YMappable'

const table = TableCollection.BigMaAdjustedIndexes
table |> decoTable |> console.log

const iter = YMappable.prototype.entryIndexed.call(table, [ 'country', 'priceLocal' ])
for (let kv of iter) {
  kv |> console.log
}
