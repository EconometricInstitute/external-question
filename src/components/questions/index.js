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

import blockly from './blockly';
import coding from './coding';
import multicoding from './multicoding';
import hyperformula from './hyperformula';

export const types = {
     blockly,
     coding,
     multicoding,
     hyperformula
};

export function exportAnswer(question, answer, component) {
     return new Promise((resolve, reject) => {
          try {
               const config = question.exportConfig;
               if (config.type == 'code') {
                    // Output an answer code
                    const content = answer.shortAnswer;
                    resolve({ type: 'code', content });
               }
               else if (config.type == 'json') {
                    // Output .json file
                    const content = JSON.stringify(answer);
                    resolve({ type: 'file', filename: config.filename, contentType: 'text', content });
               }
               else if (config.type == 'file') {
                    // Delegate file generate to the question specific answer generator
                    types[question.type].exportAnswer(question, answer, component)
                    .then(result => resolve(result))
                    .catch(err => reject(err));
               }
          }
          catch (err) {
               reject(err);
          }
     });
}

export function getDefaultExtension(question) {
     if (question.exportConfig && question.exportConfig == 'json') {
          return '.answer.json';
     }
     return types[question.type].defaultExtension;
}

export default types;