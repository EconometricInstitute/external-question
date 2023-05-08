import { PivotUtilities } from 'vue-pivottable'

export function convertDataset(question) {
    const dataset = question?.dataset;
    const result = [];
    if (dataset && dataset.header && dataset.matrix) {
        const header = dataset?.header;
        for (let row of dataset.matrix) {
        const rowObj = {};
        for (let i=0; i < header.length; i++) {
            rowObj[header[i]] = row[i];
        }
        result.push(rowObj);
        }
    }
    return result;
}

export const AGGREGATORS = [...Object.keys(PivotUtilities.aggregators)];