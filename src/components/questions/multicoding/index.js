/*
 * This file is part of External-Question.
 * It is a single page web static web-application for advanced exercises related to computer skills.
 * 
 * Copyright (C) 2023 Paul Bouman
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see https://www.gnu.org/licenses/
 *
 */

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