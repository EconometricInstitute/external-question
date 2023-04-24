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

import BlocklyQuestion from './BlocklyQuestion';
import EditBlocklyQuestion from './EditBlocklyQuestion';

function initialize(newQuestion) {
    return {
        ...newQuestion,
        exampleInput: { cost: 8},
        exampleOutput: { output: 4},
        toolbox: "<xml id=\"toolbox\" style=\"display: none\">\n    <category id=\"catLogic\" colour=\"210\" name=\"Logic\">\n      <block type=\"controls_if\"></block>\n      <block type=\"logic_compare\"></block>\n      <block type=\"logic_operation\"></block>\n      <block type=\"logic_negate\"></block>\n      <block type=\"logic_boolean\"></block>\n      <block type=\"logic_null\"></block>\n      <block type=\"logic_ternary\"></block>\n    </category>\n    <category id=\"catLoops\" colour=\"120\" name=\"Loops\">\n      <block type=\"controls_repeat_ext\">\n        <value name=\"TIMES\">\n          <shadow type=\"math_number\">\n            <field name=\"NUM\">10</field>\n          </shadow>\n        </value>\n      </block>\n      <block type=\"controls_whileUntil\"></block>\n      <block type=\"controls_for\">\n        <value name=\"FROM\">\n          <shadow type=\"math_number\">\n            <field name=\"NUM\">1</field>\n          </shadow>\n        </value>\n        <value name=\"TO\">\n          <shadow type=\"math_number\">\n            <field name=\"NUM\">10</field>\n          </shadow>\n        </value>\n        <value name=\"BY\">\n          <shadow type=\"math_number\">\n            <field name=\"NUM\">1</field>\n          </shadow>\n        </value>\n      </block>\n      <block type=\"controls_forEach\"></block>\n      <block type=\"controls_flow_statements\"></block>\n    </category>\n    <category id=\"catMath\" colour=\"230\" name=\"Math\">\n      <block type=\"math_number\"></block>\n      <block type=\"math_arithmetic\">\n        <value name=\"A\">\n          <shadow type=\"math_number\">\n            <field name=\"NUM\">1</field>\n          </shadow>\n        </value>\n        <value name=\"B\">\n          <shadow type=\"math_number\">\n            <field name=\"NUM\">1</field>\n          </shadow>\n        </value>\n      </block>\n      <block type=\"math_single\">\n        <value name=\"NUM\">\n          <shadow type=\"math_number\">\n            <field name=\"NUM\">9</field>\n          </shadow>\n        </value>\n      </block>\n      <block type=\"math_trig\">\n        <value name=\"NUM\">\n          <shadow type=\"math_number\">\n            <field name=\"NUM\">45</field>\n          </shadow>\n        </value>\n      </block>\n      <block type=\"math_constant\"></block>\n      <block type=\"math_number_property\">\n        <value name=\"NUMBER_TO_CHECK\">\n          <shadow type=\"math_number\">\n            <field name=\"NUM\">0</field>\n          </shadow>\n        </value>\n      </block>\n      <block type=\"math_change\">\n        <value name=\"DELTA\">\n          <shadow type=\"math_number\">\n            <field name=\"NUM\">1</field>\n          </shadow>\n        </value>\n      </block>\n      <block type=\"math_round\">\n        <value name=\"NUM\">\n          <shadow type=\"math_number\">\n            <field name=\"NUM\">3.1</field>\n          </shadow>\n        </value>\n      </block>\n      <block type=\"math_modulo\">\n        <value name=\"DIVIDEND\">\n          <shadow type=\"math_number\">\n            <field name=\"NUM\">64</field>\n          </shadow>\n        </value>\n        <value name=\"DIVISOR\">\n          <shadow type=\"math_number\">\n            <field name=\"NUM\">10</field>\n          </shadow>\n        </value>\n      </block>\n      <block type=\"math_constrain\">\n        <value name=\"VALUE\">\n          <shadow type=\"math_number\">\n            <field name=\"NUM\">50</field>\n          </shadow>\n        </value>\n        <value name=\"LOW\">\n          <shadow type=\"math_number\">\n            <field name=\"NUM\">1</field>\n          </shadow>\n        </value>\n        <value name=\"HIGH\">\n          <shadow type=\"math_number\">\n            <field name=\"NUM\">100</field>\n          </shadow>\n        </value>\n      </block>\n      <block type=\"math_random_int\">\n        <value name=\"FROM\">\n          <shadow type=\"math_number\">\n            <field name=\"NUM\">1</field>\n          </shadow>\n        </value>\n        <value name=\"TO\">\n          <shadow type=\"math_number\">\n            <field name=\"NUM\">100</field>\n          </shadow>\n        </value>\n      </block>\n      <block type=\"math_random_float\"></block>\n    </category>\n    <category id=\"catText\" colour=\"160\" name=\"Text\">\n      <block type=\"text\"></block>\n      <block type=\"text_join\"></block>\n      <block type=\"text_append\">\n        <value name=\"TEXT\">\n          <shadow type=\"text\"></shadow>\n        </value>\n      </block>\n      <block type=\"text_length\">\n        <value name=\"VALUE\">\n          <shadow type=\"text\">\n            <field name=\"TEXT\">abc</field>\n          </shadow>\n        </value>\n      </block>\n      <block type=\"text_isEmpty\">\n        <value name=\"VALUE\">\n          <shadow type=\"text\">\n            <field name=\"TEXT\"></field>\n          </shadow>\n        </value>\n      </block>\n      <block type=\"text_indexOf\">\n        <value name=\"VALUE\">\n          <block type=\"variables_get\">\n            <field name=\"VAR\">text</field>\n          </block>\n        </value>\n        <value name=\"FIND\">\n          <shadow type=\"text\">\n            <field name=\"TEXT\">abc</field>\n          </shadow>\n        </value>\n      </block>\n      <block type=\"text_charAt\">\n        <value name=\"VALUE\">\n          <block type=\"variables_get\">\n            <field name=\"VAR\">text</field>\n          </block>\n        </value>\n      </block>\n      <block type=\"text_getSubstring\">\n        <value name=\"STRING\">\n          <block type=\"variables_get\">\n            <field name=\"VAR\">text</field>\n          </block>\n        </value>\n      </block>\n      <block type=\"text_changeCase\">\n        <value name=\"TEXT\">\n          <shadow type=\"text\">\n            <field name=\"TEXT\">abc</field>\n          </shadow>\n        </value>\n      </block>\n      <block type=\"text_trim\">\n        <value name=\"TEXT\">\n          <shadow type=\"text\">\n            <field name=\"TEXT\">abc</field>\n          </shadow>\n        </value>\n      </block>\n      <block type=\"text_print\">\n        <value name=\"TEXT\">\n          <shadow type=\"text\">\n            <field name=\"TEXT\">abc</field>\n          </shadow>\n        </value>\n      </block>\n      <block type=\"text_prompt_ext\">\n        <value name=\"TEXT\">\n          <shadow type=\"text\">\n            <field name=\"TEXT\">abc</field>\n          </shadow>\n        </value>\n      </block>\n    </category>\n    <category id=\"catLists\" colour=\"260\" name=\"Lists\">\n      <block type=\"lists_create_with\">\n        <mutation items=\"0\"></mutation>\n      </block>\n      <block type=\"lists_create_with\"></block>\n      <block type=\"lists_repeat\">\n        <value name=\"NUM\">\n          <shadow type=\"math_number\">\n            <field name=\"NUM\">5</field>\n          </shadow>\n        </value>\n      </block>\n      <block type=\"lists_length\"></block>\n      <block type=\"lists_isEmpty\"></block>\n      <block type=\"lists_getIndex\">\n        <value name=\"VALUE\">\n          <block type=\"variables_get\">\n            <field name=\"VAR\">list</field>\n          </block>\n        </value>\n      </block>\n      <block type=\"lists_setIndex\">\n        <value name=\"LIST\">\n          <block type=\"variables_get\">\n            <field name=\"VAR\">list</field>\n          </block>\n        </value>\n      </block>\n      <block type=\"lists_getSublist\">\n        <value name=\"LIST\">\n          <block type=\"variables_get\">\n            <field name=\"VAR\">list</field>\n          </block>\n        </value>\n      </block>\n      <block type=\"lists_split\">\n        <value name=\"DELIM\">\n          <shadow type=\"text\">\n            <field name=\"TEXT\">,</field>\n          </shadow>\n        </value>\n      </block>\n      <block type=\"lists_sort\"></block>\n    </category>\n    <category id=\"catColour\" colour=\"20\" name=\"Color\">\n      <block type=\"colour_picker\"></block>\n      <block type=\"colour_random\"></block>\n      <block type=\"colour_rgb\">\n        <value name=\"RED\">\n          <shadow type=\"math_number\">\n            <field name=\"NUM\">100</field>\n          </shadow>\n        </value>\n        <value name=\"GREEN\">\n          <shadow type=\"math_number\">\n            <field name=\"NUM\">50</field>\n          </shadow>\n        </value>\n        <value name=\"BLUE\">\n          <shadow type=\"math_number\">\n            <field name=\"NUM\">0</field>\n          </shadow>\n        </value>\n      </block>\n      <block type=\"colour_blend\">\n        <value name=\"COLOUR1\">\n          <shadow type=\"colour_picker\">\n            <field name=\"COLOUR\">#ff0000</field>\n          </shadow>\n        </value>\n        <value name=\"COLOUR2\">\n          <shadow type=\"colour_picker\">\n            <field name=\"COLOUR\">#3333ff</field>\n          </shadow>\n        </value>\n        <value name=\"RATIO\">\n          <shadow type=\"math_number\">\n            <field name=\"NUM\">0.5</field>\n          </shadow>\n        </value>\n      </block>\n    </category>\n    <sep></sep>\n    <category id=\"catVariables\" colour=\"330\" custom=\"VARIABLE\" name=\"Variables\"></category>\n    <category id=\"catFunctions\" colour=\"290\" custom=\"PROCEDURE\" name=\"Functions\"></category>\n  </xml>",
        testCaseScript: "function getTestCases() {\n        const cases = [];\n        for (let i=-20; i <= 20; i+=2) {\n           cases.push({cost: i});\n        }\n        return cases;\n}",
        decimals: 1,
        strictStrings: false,
        hashReps: 1,
        hashLength: 10,
        hashPrefix: 'x'
    }
}

function exportAnswer(question, _, component) {
    return new Promise((resolve, reject) => {
        try {
            const config = question.exportConfig;
            if (config.type == 'file') {
                // Output file
                const content = component.generateFile();
                resolve({ type: 'file', filename: config.filename, contentType: 'text', content});
            }
        }
        catch (err) {
            reject(err);
        }
    });
}

export default {
    description: 'Visual programming exercise based on the Google Blockly toolkit',
    view: BlocklyQuestion,
    edit: EditBlocklyQuestion,
    initialize,
    exportAnswer,
    defaultExtension: '.html',
};