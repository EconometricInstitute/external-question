import * as md5hex from 'md5-hex';

const NO_VALUE_CODE = '#NO_VALUE!';
const NO_FORMULA_CODE = '#NO_FORMULA!';

export const BASE_ENTRY = {
  decimals: 2,
  iterations: 1,
  hashLength: 8,
  truncate: false,
  truncateLength: 1,
  case: false,
  trim: true
}

export function computeAnswerCode(answerSpec, wb) {
    if (!answerSpec) {
      this.answerCode = '';
    }
    const parts = [];
    for (const spec of answerSpec.entries) {
      // Since a formula does not operate on a range, we handle this case first
      if (spec.type == 'formula') {
        const result = wb.calculateFormula(spec.formula, 0);
        const processed =  process(result, spec);
        parts.push(processed);
        continue;
      }

      // TODO: determine if we have a range or a single cell
      const range = getRange(spec.source, wb);
      //const address = spec.source ? wb.simpleCellAddressFromString(spec.cell, -1) : undefined;
      if (spec.type == 'range-formulas') {
        const matrix = rangeToFormulas(range, wb);
        const part = joinMatrix(matrix, answerSpec.entrySeparator);
        parts.push(part);
      }
      else if (spec.type == 'range-values') {
        const matrix = rangeToValues(range, wb);
        // TODO: determine processing function
        const part = joinMatrix(matrix, answerSpec.valueSeparator, val => process(val, spec));
        parts.push(part);
      }
      else if (spec.type == 'range-hash') {
        const matrix = rangeToValues(range, wb);
        // TODO: determine processing function
        const str = joinMatrix(matrix, answerSpec.hashSeparator, val => process(val, spec));
        let result = md5hex(str);
        for (let i=1; i < spec.iterations; i++) {
          result = md5hex(result + '||' + str);
        }
        if (spec.hashLength) {
          result = result.substring(0, spec.hashLength);
        }
        parts.push(result);
      }
    }
    return parts.join(answerSpec.entrySeparator);
}

function process(value, entry) {
  let result = value;
  if (result && (result === 0 || !Number.isNaN(result)) && (entry.decimals || entry.decimals === 0)) {
    result = (+result).toFixed(entry.decimals);
  }
  result = (''+result);
  if (entry.trim) {
    result = result.trim();
  }
  if (entry.case) {
    if (entry.case == 'upper') {
      result = result.toLowerCase();
    }
    else if (entry.case == 'lower') {
      result = result.toUpperCase();
    }
  }
  if (entry.truncate) {
    if (entry.truncate == 'start') {
      result = result.substring(0, entry.truncateLength);
    }
    else if (entry.truncate == 'end') {
      const start = Math.max(0, result.length - entry.truncateLength);
      result = result.substring(start, entry.truncateLength);
    }
  }
  return result;
}

function getRange(source, wb) {
    if (source.search(':') >= 0) {
        // We have a range
        return wb.simpleCellRangeFromString(source, -1);
    }
    // We have a single cell
    const cell = wb.simpleCellAddressFromString(source, -1);
    return { start: cell, end: cell };
}

function replaceUndefined(matrix, value) {
  for (let i = 0; i < matrix.length; i++) {
    const row = matrix[i];
    for (let j=0; j < row.length; j++) {
      if (row[j] === undefined || row[j] == '') {
        row[j] = value;
      }
    }
  }
}

function rangeToValues(range, wb) {
  const result = wb.getRangeValues(range);
  replaceUndefined(result, NO_VALUE_CODE);
  return result;
}

function rangeToFormulas(range, wb) {
  const result = wb.getRangeFormulas(range);
  replaceUndefined(result, NO_FORMULA_CODE);
  return result;
}

function joinMatrix(matrix, sep, conv=(x=>x)) {
  return matrix.map(row => row.map(conv)
                              .join(sep))
               .join(sep);
}