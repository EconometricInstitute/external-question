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

function exportAnswer(question, answer) {
    return new Promise((resolve, reject) => {
        try {
            const config = question.exportConfig;
            if (config.type == 'file') {
                resolve({ type: 'file', filename: config.filename, contentType: 'text', content: answer});
            }
        }
        catch (err) {
            reject(err);
        }
    });
}

export default {
    description: 'Single file coding exercise with the Monaco Editor',
    view: CodingQuestion,
    edit: EditCodingQuestion,
    initialize,
    exportAnswer,
    defaultExtension: '.java',
};