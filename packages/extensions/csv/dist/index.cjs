'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var crostab = require('@analyz/crostab');
var table = require('@analyz/table');

class RegUtil {
  static DEFAULT = /(,|\r?\n|\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^",\r\n]*))/gi;

  static csv(de = ',', qt = '"') {
    if (de === ',' && qt === '"') return RegUtil.DEFAULT;
    const delim = `${de}|\r?\n|\r|^`;
    const quote = `[^${qt}]*(?:${qt + qt}[^${qt}]*)*`;
    const value = `[^${qt}${de}\r\n]*`;
    return new RegExp(`(${delim})(?:${qt}(${quote})${qt}|(${value}))`, 'gi');
  }

  static quoteRep(qt) {
    return new RegExp(qt + qt, 'g');
  }

} // const regexCsv = /(,|\x?\n|\x|^)(?:"([^"]*(?:""[^"]*)*)"|([^",\x\n]*))/gi

/**
 *
 * @param csv
 * @param de
 * @param qt
 * @returns {Generator<string[], void, *>}
 */

function* indexed(csv, {
  de = ',',
  qt = '"'
} = {}) {
  if (!(csv !== null && csv !== void 0 && csv.length)) return void 0;
  const regex = RegUtil.csv(de, qt),
        quote2 = RegUtil.quoteRep(qt);
  let matches,
      delim,
      quote,
      value,
      row = [];
  if (csv.startsWith(de)) row.push('');

  while ((matches = regex.exec(csv)) && ([, delim, quote, value] = matches)) {
    var _value;

    // `[delim] (${delim.replace(/\r?\n/g, '[LF]')}) [quote] (${quote ?? '[UDF]'}) [value] (${value?.replace(/\r?\n/g, '[LF]')})`  |> console.log
    if (delim && delim !== de) {
      yield row;
      row = [];
    } // if separator is line-feed, push new row.


    row.push(quote ? quote.replace(quote2, qt) : ((_value = value) === null || _value === void 0 ? void 0 : _value.trim()) ?? '');
  } // if the captured value is quoted, unescape double quotes, else push the non-quoted value


  if (row.length && row.some(x => x === null || x === void 0 ? void 0 : x.length)) yield row;
} // regex,    // regex to parse the CSV values
// quoteRep, // regex for double quotes
// matches,  // array to hold individual pattern matching groups.
// delim,    // captured separator, can be either delimiter or line-feed.
// quote,    // captured quoted value.
// value,    // captured unquoted value.
// wd,       // final processed capture value.
// row,      // data row.

const csvToTable = (csv, options) => {
  const enumerator = indexed(csv, options);
  const {
    done,
    value: head
  } = enumerator.next();
  if (done) return null;
  return table.Table.build(head, [...enumerator]);
};
const csvToCrostab = (csv, options) => {
  const enumerator = indexed(csv, options);
  const {
    done,
    value
  } = enumerator.next();
  if (done) return null;
  const [title, ...head] = value;
  const side = [],
        rows = [];

  for (let [mark, ...row] of enumerator) {
    side.push(mark);
    rows.push(row);
  }

  return crostab.Crostab.build(side, head, rows, title);
};

exports.csvToCrostab = csvToCrostab;
exports.csvToTable = csvToTable;
exports.indexed = indexed;
