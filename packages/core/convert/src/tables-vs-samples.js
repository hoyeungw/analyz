import { select } from '@vect/columns-select'
import { Table }  from '@analyz/table'

export function tableToSamples(table) {

}

export function samplesToTable(samples, fields) {
  const head = fields ?? samples.length ? Object.keys(samples[0]) : [];
  const rows = samples.map(select.bind(head))
  return Table.build(head, rows, samples?.title)
}