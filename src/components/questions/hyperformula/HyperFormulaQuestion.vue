<!--
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
-->

<template>
  <div class="question-container">
    <div class="question-editor" v-if="sheets">
      <v-tabs v-model="currentTab" class="question-tabs">
        <v-tab v-if="question?.descriptionAsTab">
          <v-icon dense>mdi-file-document</v-icon> &nbsp; Description
        </v-tab>
        <v-tab v-for="sheet of sheets" :key="sheet.name" class="question-tab">
          <v-icon dense>mdi-table</v-icon>
          &nbsp;
          {{ sheet.name }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="currentTab">
        <v-tab-item v-if="question?.descriptionAsTab">
          <div class="description">
            <MarkdownDisplay class="question-text" :source="question.description" />
          </div>
        </v-tab-item>
        <v-tab-item v-for="sheet of sheets" :key="sheet.name">
          <div class="spreadsheet-wrapper">
            <SpreadsheetTable :value="sheet" />
          </div>
        </v-tab-item>
      </v-tabs-items>
    </div>
    <div class="rhs">
      <div class="question-instruction">
        <div class="rhs-part" v-if="!question?.descriptionAsTab">
          <v-card class="descr-card">
            <v-card-title>Description</v-card-title>
            <v-card-text>
              <MarkdownDisplay class="question-text" :source="question.description" />
            </v-card-text>
          </v-card>
        </div>
        <div class="rhs-part" v-if="question.tasks && question.tasks.length > 0">
          <h3>Tasks</h3>
          <v-card class="task-card" v-for="(task, index) in question.tasks" :key="'task-'+index">
            <v-card-title>{{ 'Task ' + (index+1) }} <span v-if="task.title">&nbsp;-&nbsp;{{ task.title }}</span></v-card-title>
            <v-card-text>
              <MarkdownDisplay :source="task.description" />
                <v-text-field v-model="formulas[index]" :label="'Enter a spreadsheet formula for cell ' + task.targetCell + ' of sheet ' + task.targetSheetName" />
                <v-alert v-if="errors[index]" type="error">
                  <div class="text-h6">
                    {{ errors[index].type }}
                  </div>
                  <span v-if="errors[index].type == 'DIV_BY_ZERO'">
                    Division by zero occurred. This is not allowed!
                  </span>
                  <span v-else>
                    {{ errors[index].message }}
                  </span>
                </v-alert>
                <template v-if="task.copyTo && task.copyTo.length > 0">
                  <p>This formula will be copied to the following cells</p>
                  <ul>
                    <li v-for="target in task.copyTo" :key="'copy-to-'+target"><code>{{ target }}</code></li>
                  </ul>
                </template>
            </v-card-text>
          </v-card>
        </div>
        <div class="rhs-part" v-if="question?.answerSpec?.entries && question.answerSpec.entries.length > 0">
          <h3>Answer code</h3>
          <v-card class="answer-card" v-if="question?.answerSpec">
            <v-card-title>Final Answer</v-card-title>
            <v-card-text>
              <div>The final answer is based on the following information:</div>
              <ul>
                <li v-for="(entry, index) in question?.answerSpec?.entries" :key="'entry-'+index">
                  <span v-if="entry.type == 'range-values'">
                    The <em>values</em> in range <code>{{ entry.source }}</code>
                  </span>
                  <span v-else-if="entry.type == 'range-formulas'">
                    The <em>formulas</em> in range <code>{{ entry.source }}</code>                  
                  </span>
                  <span v-else-if="entry.type == 'range-hash'">
                    A <em>hash</em> computed with the values in range <code>{{ entry.source }}</code>
                  </span>
                  <span v-else-if="entry.type == 'formula'">
                    The result of the formula <code>{{ entry.formula }}</code>
                  </span>
                </li>
              </ul>
              <br />
              <AnswerCodeDisplay :answerCode="answerCode" />
            </v-card-text>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { HyperFormula } from 'hyperformula';
import MarkdownDisplay from '@/components/util/MarkdownDisplay';
import AnswerCodeDisplay from '@/components/util/AnswerCodeDisplay';
import SpreadsheetTable from './SpreadsheetTable';

import { computeAnswerCode } from './utils';

export default {
  name: 'HyperFormulaQuestion',
  props: [
    'question', 'focused', 'inputAnswer'
  ],
  components: {
    MarkdownDisplay,
    AnswerCodeDisplay,
    SpreadsheetTable
  },
  created() {
    this.updateWorkbook();
  },
  methods: {
    updateWorkbook() {
      const question = this.question;
      if (!question) {
        return;
      }
      const config = { licenseKey: 'gpl-v3' };
      this.workbook = HyperFormula.buildFromSheets(question.sheets, config, question.namedRanges);
      
      if (this.inputAnswer && this.inputAnswer.formulas) {
        this.formulas = this.inputAnswer.formulas;
      }
      else {
        this.formulas = [];
        for (const task of question.tasks) {
          this.formulas.push(task.defaultFormula);
        }
      }
      this.updateSheets();
    },
    updateSheets() {
      if (!this.workbook) {
        return [];
      }
      
      const result = [];
      const wb = this.workbook;
      for (let i=0; i < wb.countSheets(); i++) {
        const sheet = {
          name: wb.getSheetName(i),
          dimensions: wb.getSheetDimensions(i),
          values: wb.getSheetValues(i)
        };
        result.push(sheet);
      }
      
      this.sheets = result;
    },
    updateAnswerCode() {
      const answerSpec = this.question?.answerSpec;
      this.answerCode = computeAnswerCode(answerSpec, this.workbook);
      // if (!answerSpec) {
      //   this.answerCode = '';
      // }
      // const wb = this.workbook;
      // const parts = [];
      // for (const spec of answerSpec.entries) {
      //   // TODO: determine if we have a range or a single cell
      //   const address = spec.source ? wb.simpleCellAddressFromString(spec.cell, -1) : undefined;
      //   if (spec.type == 'range-formulas') {
      //     if (wb.doesCellHaveFormula(address)) {
      //       let formula = wb.getCellFormula(address);
      //       parts.push(formula);
      //     }
      //     else {
      //       parts.push('#NO_FORMULA!');
      //     }
      //   }
      //   else if (spec.type == 'range-values') {
      //     const value = wb.getCellValue(address);
      //     if (value && value.type && value.value) {
      //       parts.push(value.value);
      //     }
      //     else {
      //       if (!value) {
      //         parts.push('#NO_VALUE!');
      //       }
      //       else {
      //         parts.push(value);
      //       }
      //     }
      //   }
      // }
      // this.answerCode = parts.join(answerSpec.separator);
    },
  },
  computed: {
    fullAnswer() {
      return {
        shortAnswer: this.answerCode,
        formulas: this.formulas
      };
    }
  },
  watch: {
    question() {
      this.updateWorkbook();
    },
    fullAnswer(newAnswer) {
      this.$emit('input', newAnswer);
    },
    formulas(newFormulas) {
      for (let index=0; index < this.question.tasks.length; index++) {
        const task = this.question.tasks[index];
        const formula = newFormulas[index];
        const sheetIndex = this.workbook.getSheetId(task.targetSheetName);
        const targetAddress = this.workbook.simpleCellAddressFromString(task.targetCell, sheetIndex);
        this.workbook.setCellContents(targetAddress, [[formula]]);
        const formulaResult = this.workbook.getCellValue(targetAddress);
       
        // Check and display possible errors
        if (formulaResult && formulaResult.value && formulaResult.type) {
          // An error occurred
          this.errors[index] = formulaResult;
        }
        else {
          this.errors[index] = null;
        }

        if (task.copyTo) {
          for (const copyToRange of task.copyTo) {
            // Check whether we have a range or a single cell to copy to
            let range;
            if (copyToRange.search(':') != -1) {
              range = this.workbook.simpleCellRangeFromString(copyToRange, sheetIndex);
            }
            else {
              const copyToCell = this.workbook.simpleCellAddressFromString(copyToRange, sheetIndex);
              range = { start: copyToCell, end : copyToCell}
            }

            // Perform copying of formulas
            for (let rowIndex = range.start.row; rowIndex <= range.end.row; rowIndex++) {
              for (let colIndex = range.start.col; colIndex <= range.end.col; colIndex++) {
                const copyTarget = { row: rowIndex, col: colIndex, sheet: range.start.sheet };
                this.workbook.copy({ start: targetAddress, end: targetAddress});
                this.workbook.paste(copyTarget);
              }
            }
          }
        }
      }
      this.updateSheets();
      this.updateAnswerCode();
    }
  },
  data: () => ({
    currentTab: 0,
    workbook: null,
    formulas: [],
    errors: [],
    sheets: [],
    answerCode: ''
  }),
};
</script>

<style scoped>
div.description {
  margin: 1em;
}
.rhs-part {
  margin-bottom: 1em;
}
div.descr-card, div.task-card, div.answer-card {
  margin-top: 1em;
}
div.spreadsheet-wrapper {
  overflow: auto;
}

th.spreadsheet-triangle-cell {
  justify-content: end;
}
div.spreadsheet-triangle {
  width: 0; 
  height: 0; 
  border-left: 1em solid transparent;
  border-bottom: 1em solid gray;
  display: inline-block;
  align-self: flex-end;
}

table.spreadsheet,
table.spreadsheet td,
table.spreadsheet th {
  padding: 0.25em;
  white-space: nowrap;
  box-sizing: border-box;
  line-height: 1em;
  border: 1px solid #ccc;
  min-width: 4em;
  text-align: right;
}

table.spreadsheet th {
  font-weight: normal;
}

table.spreadsheet {
  border-collapse: collapse;
  table-layout: fixed;
  white-space: nowrap;
  empty-cells: show;
  border: 0px;
  background-color: #fff;
  border: 1px solid #ccc;
  /* border-left: 1px solid #ccc;
  border-right: 1px solid transparent;
  border-bottom: 1px solid transparent;   */
}

table.spreadsheet > thead > tr > th.column-label {
  text-align: center;
}

table.spreadsheet > thead > tr > th,
table.spreadsheet > tbody > tr > th {
  background-color: #f3f3f3;
  user-select: none;
}


.question-container {
  height: calc(100vh - 64px);
  display: flex;
  flex-direction: row;
}

.question-editor {
  min-width: 55%;
}

.question-instruction {
  overflow-y: scroll;
  flex-grow: 1;
  padding-left: 0.5em;
}

.rhs {
  padding-left: 0.8em;
  border-left: solid 1px black;
  min-width: 15em;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
}

</style>

<style>
.question-text pre code {
  color: black;
  width: 100%;
}
</style>