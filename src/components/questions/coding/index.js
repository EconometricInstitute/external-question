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