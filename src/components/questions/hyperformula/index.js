import HyperFormulaQuestion from './HyperFormulaQuestion.vue';
import EditHyperFormulaQuestion from './EditHyperFormulaQuestion';

function initialize(newQuestion) {
    return {...newQuestion,
        sheets: { 'Sheet1' : [
                [1.0, 2.5, 3.0, 'Hello', 'World', 7.0, '=A2+A3', 'Some value', ''],
                [2.0, 3.5, 4.0, 'More Messages', 'Go Here', 16.0, '=B2+B3', 'Other value', ''],
                ['', '', '', '' , '', '' , '', ''],
                ['Sum of cells', '']
            ]},
        namedRanges: [],
        tasks: [
            { title: 'Sum all',
                description: 'Write a formula for cell `B4` that adds up the numbers in cells `A1:B3`',
                targetSheetName: 'Sheet1',
                targetCell: 'B4',
                defaultFormula: ''
            },
            { title: 'Sum per row',
                description: 'Write a formula for cell `I1` that adds up the values in the first, second and third column such that it can be copied to cell `I2`',
                targetSheetName: 'Sheet1',
                targetCell: 'I1',
                defaultFormula: '',
                copyTo: ['I2']
            }
        ],
        answerSpec: {
            separator: ' :: ',
            entries: [
                { type: 'cell-formula', cell: 'Sheet1!B4' },
                { type: 'cell-value', cell: 'Sheet1!I1' }
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