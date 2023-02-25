import CodingQuestion from './CodingQuestion';
import EditCodingQuestion from './EditCodingQuestion';

function initialize(newQuestion) {
    return {...newQuestion,
            lang: 'java',
            filename: 'Main.java',
            mainClass: 'Main',
            defaultAnswer: 'import java.util.Scanner;\n\npublic class Main {\n\n\tpublic static void main(String [] args) {\n\n\t}\n}\n',
            runUrl: '',
            runToken: '',
            testCases: [],
            allowCustomTest: true,
            referenceUrl: 'https://docs.oracle.com/javase/8/docs/api/index.html'
    };
}

function exportAnswer(question, answer, target) {
    console.log(question, answer, target);
}

export default {
    description: 'Single file coding exercise with the Monaco Editor',
    view: CodingQuestion,
    edit: EditCodingQuestion,
    initialize,
    exportAnswer
};