import { TableCollection } from '@foba/table'
import { logger }          from '@spare/logger'
import xlsx                from 'xlsx'
import { tableToWorkbook } from '../index.js'

const test = async () => {
  const table = TableCollection.USTechFirms
  const workbook = tableToWorkbook(table)
  xlsx.writeFile(workbook, './xlsx/singleSheet.xlsx')
  logger('done')
}

test()


