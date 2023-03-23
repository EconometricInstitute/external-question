import MultiCodingQuestion from './MultiCodingQuestion';
import EditMultiCodingQuestion from './EditMultiCodingQuestion';
import JSZip from 'jszip';

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

function exportAnswer(question, answer) {
    const promises = [];
    const zip = new JSZip();
    for (const file of question.files) {
        const filename = file.filename;
        const fileContent = answer && answer[filename] ? answer[filename] : file.content;
        zip.file(filename, fileContent);
    }
    return Promise.all(promises).then(
        () => zip.generateAsync({type: 'blob'})
    ).then(content => ({
            filename: question.exportConfig.filename,
            contentType: 'blob',
            content
    }));
}

export default {
    description: 'Multiple files coding exercise with the Monaco Editor',
    view: MultiCodingQuestion,
    edit: EditMultiCodingQuestion,
    initialize,
    exportAnswer,
    defaultExtension: '.zip',
};