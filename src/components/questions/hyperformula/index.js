import HyperFormulaQuestion from './HyperFormulaQuestion.vue';
import EditHyperFormulaQuestion from './EditHyperFormulaQuestion';

import { BASE_ENTRY } from './utils.js';

function initialize(newQuestion) {
    return {...newQuestion,
        sheets: { 'Sales' : [
                    ['CustomerID', 'Product Name', 'Quantity', 'Price', 'Revenue'],
                    [51236, 'Soap', 12, 1.50, ''],
                    [73452, 'Onions', 8, 0.25, ''],
                    [25623, 'Iceberg Lettuce', 2, 1.25, ''],
                    [92834, 'Coffee', 12, 1.99, ''],
                    ['', '', '', '', ''],
                    ['Average Revenue', '', '', '']
                ],
            },
        namedRanges: [],
        tasks: [
            {
                title: 'Compute revenue',
                description: 'Write a formula for cell `E2` that computes the revenue as the product of price and quantity.',
                targetSheetName: 'Sales',
                targetCell: 'E2',
                defaultFormula: '',
                copyTo: ['E3:E5']
            },
            {
                title: 'Average revenue',
                description: 'Write a formula for cell `B7` that computes the average revenue of the products.',
                targetSheetName: 'Sales',
                targetCell: 'B7',
                defaultFormula: '',
                copyTo: []
            }            
        ],
        answerSpec: {
            entrySeparator: ' :: ',
            valueSeparator: '-',
            hashSeparator: ':|:',
            entries: [
                { ...BASE_ENTRY, type: 'range-hash', source: 'Sales!E2:E5', decimals: 2, truncate: false, iterations: 1 },
                { ...BASE_ENTRY, type: 'range-values', source: 'Sales!B7', decimals: 2, truncate: false },
                { ...BASE_ENTRY, type: 'range-formulas', source: 'Sales!E2' },
                { ...BASE_ENTRY, type: 'range-formulas', source: 'Sales!B7' },
            ]
        }
    }
}

function exportAnswer(question, answer) {
    return new Promise((resolve, reject) => {
        try {
            const config = question.exportConfig;
            if (config.type == 'file') {
                resolve({ type: 'file', filename: config.filename, contentType: 'text', content: JSON.stringify(answer)});
            }
        }
        catch (err) {
            reject(err);
        }
    });
}

export default {
    description: 'Write spreadsheet formulas using the HyperFormula software',
    view: HyperFormulaQuestion,
    edit: EditHyperFormulaQuestion,
    initialize,
    exportAnswer,
    defaultExtension: '.json',
};