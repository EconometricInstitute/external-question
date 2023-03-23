
import blockly from './blockly';
import coding from './coding';
import multicoding from './multicoding';

export const types = {
     blockly,
     coding,
     multicoding
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