import { TableCollection }                               from '@foba/table'
import { deco, decoFunc, decoTable, decoVector, logger } from '@spare/logger'
import { says }                                          from '@spare/xr'

const table = TableCollection.TopBoxOffice

table.headward.select([ 'name', 'year', 'director', 'budget', 'boxoffice' ])
table |> decoTable |> says['original']

const [ key, column ] = table.headward.pop()

function getMethods(instance) {
  const props = []
  let obj = instance
  do {
    props.push(...Object.getOwnPropertyNames(obj))
  } while (obj = Object.getPrototypeOf(obj))
  return props.sort().filter((e, i, arr) => {
    if (e !== arr[i + 1] && instance[e] instanceof Function) return true
  })
}
getMethods(table.headward) |> decoVector|> logger
table.headward.pop.toString() |> logger
table.headward.mutate.toString() |> logger
table.headward.mutateAt.toString() |> logger


column  |> deco |> says[key]

table.headward.prepend(key, column)

table |> decoTable |> says['prepended']



