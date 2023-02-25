import MultiCodingQuestion from './MultiCodingQuestion';
import EditMultiCodingQuestion from './EditMultiCodingQuestion';

function initialize(newQuestion) {
    return {...newQuestion,
            lang: 'java',
            files: [
                { 
                filename: 'Main.java', 
                content: `public class Main { \n \n }`
                }
            ],
            mainClass: 'Main',
            runUrl: '',
            runToken: '',
            testCases: [],
            allowCustomTest: true,
            referenceUrl: 'https://docs.oracle.com/javase/8/docs/api/index.html', 
    };
}

function exportAnswer(question, answer, target) {
    console.log(question, answer, target);
}

export default {
    description: 'Multiple files coding exercise with the Monaco Editor',
    view: MultiCodingQuestion,
    edit: EditMultiCodingQuestion,
    initialize,
    exportAnswer
};