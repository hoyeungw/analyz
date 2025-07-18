import { TableCollection } from '@foba/table'
import { deco, decoTable } from '@spare/logger'
import { says }            from '@spare/xr'
import { YUpdatable }      from '../src/index.js'

const table = TableCollection.TopBoxOffice

table.headward.select(['name', 'year', 'director', 'budget', 'boxoffice'])
table |> decoTable |> says['original']

const [key, column] = YUpdatable.prototype.pop.call(table)

column  |> deco |> says[key]

YUpdatable.prototype.prepend.call(table, key, column)

table |> decoTable |> says['prepended']



