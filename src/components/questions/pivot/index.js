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

import PivotQuestion from './PivotQuestion';
import EditPivotQuestion from './EditPivotQuestion';

function initialize(newQuestion) {
    return {...newQuestion,
            dataset: {
               header: ['color', 'shape'],
               matrix: [['blue', 'circle'], ['red', 'triangle']] 
            }
    };
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
    description: 'Analyze a dataset with a pivot component',
    view: PivotQuestion,
    edit: EditPivotQuestion,
    initialize,
    exportAnswer,
    defaultExtension: '.json',
};