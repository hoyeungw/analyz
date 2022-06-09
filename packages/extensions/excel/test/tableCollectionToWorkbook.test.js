import { CrostabCollection } from '@foba/crostab'
import { TableCollection }   from '@foba/table'
import { delogger }          from '@spare/logger'
import { Workbook }          from '../index'

const testTables = async () => {
  const tableCollection = Object.assign({},
    TableCollection.flopShuffle({ keyed: true }),
    TableCollection.flopShuffle({ keyed: true }),
    TableCollection.flopShuffle({ keyed: true })
  )
  const workbook = Workbook.fromTables(tableCollection)
  Workbook.write('./packages/extensions/excel/test/xlsx/tables.xlsx', workbook)
  'done' |> delogger
}

const testCrostabs = async () => {
  const crostabCollection = Object.assign({},
    CrostabCollection.flopShuffle({ keyed: true }),
    CrostabCollection.flopShuffle({ keyed: true }),
    CrostabCollection.flopShuffle({ keyed: true })
  )
  const workbook = Workbook.fromCrostabs(crostabCollection)
  Workbook.write('./packages/extensions/excel/test/xlsx/crostabs.xlsx', workbook)
  'done' |> delogger
}

testTables().then()
testCrostabs().then()


