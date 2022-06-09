import { TableCollection } from '@foba/table'
import { delogger }        from '@spare/logger'
import xlsx                from 'xlsx'
import { tableToWorkbook } from '../index'

const test = async () => {
  const table = TableCollection.USTechFirms
  const workbook = tableToWorkbook(table)
  xlsx.writeFile(workbook, './packages/extensions/excel/test/xlsx/singleSheet.xlsx')
  'done' |> delogger
}

test()


