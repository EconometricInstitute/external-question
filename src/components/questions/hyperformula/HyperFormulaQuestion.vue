<template>
  <div class="question-container">
    <div class="question-editor" v-if="sheets">
      <v-tabs v-model="currentTab" class="question-tabs">
        <v-tab>
          <v-icon dense>mdi-file-document</v-icon> &nbsp; Description
        </v-tab>
        <v-tab v-for="sheet of sheets" :key="sheet.name" class="question-tab">
          <v-icon dense>mdi-table</v-icon>
          &nbsp;
          {{ sheet.name }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="currentTab">
        <v-tab-item>
          <MarkdownDisplay class="question-text" :source="question.description" />
        </v-tab-item>
        <v-tab-item v-for="sheet of sheets" :key="sheet.name">
          <div class="spreadsheet-wrapper">
            <table class="spreadsheet">
                <thead>
                  <tr>
                    <th scope="col" class="spreadsheet-triangle-cell"><div class="spreadsheet-triangle"></div></th>
                    <th scope="col" class="column-label" v-for="j of sheet.dimensions.width" :key="'col-'+j">{{ getColumnLabel(j) }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="i of sheet.dimensions.height" :key="'row-'+i">
                    <th scope="row">{{ i }}</th>
                    <td v-for="j of sheet.dimensions.width" :key="'cell-'+i+'-'+j">
                      <span v-if="sheet.values[i-1]">
                        {{ sheet.values[i-1][j-1] }}
                      </span>
                    </td>
                  </tr>
                </tbody>
            </table>
          </div>
          <!-- {{ sheet }}
          <br />
          {{  question  }} -->
        </v-tab-item>
      </v-tabs-items>
    </div>
    <div class="rhs">
      <div class="question-instruction">
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
          <v-card class="answer-card" v-if="question?.answerSpec">
            <v-card-title>Final Answer</v-card-title>
            <v-card-text>
              <p>The following answer code was computed. Click <v-icon @click="copyAnswerCode">mdi-content-copy</v-icon> to copy it to the clipboard.</p>
              <v-text-field class="answercode-box"
                            readonly solo dense
                            :value="answerCode"
              >
                <template v-slot:prepend-inner>
                    <v-icon @click="copyAnswerCode">mdi-content-copy</v-icon>
                </template>
              </v-text-field>
              <v-snackbar v-model="copyBar" centered>
                The answer code was copied to the clipboard
                <template v-slot:action="{ attrs }">
                  <v-btn color="primary"
                  text
                  v-bind="attrs"
                  @click="copyBar = false">
                  OK
                  </v-btn>
                </template>
              </v-snackbar>
            </v-card-text>
          </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import { HyperFormula } from 'hyperformula';
import MarkdownDisplay from '@/components/util/MarkdownDisplay';

import { copyText } from '@/util/clipboard.js';

export default {
  name: 'HyperFormulaQuestion',
  props: [
    'question', 'focused', 'inputAnswer'
  ],
  components: {
    MarkdownDisplay,
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
      if (!answerSpec) {
        this.answerCode = '';
      }
      const wb = this.workbook;
      const parts = [];
      for (const spec of answerSpec.entries) {
        const address = spec.cell ? wb.simpleCellAddressFromString(spec.cell, -1) : undefined;
        if (spec.type == 'cell-formula') {
          if (wb.doesCellHaveFormula(address)) {
            let formula = wb.getCellFormula(address);
            parts.push(formula);
          }
          else {
            parts.push('#NO_FORMULA!');
          }
        }
        else if (spec.type == 'cell-value') {
          const value = wb.getCellValue(address);
          if (value && value.type && value.value) {
            parts.push(value.value);
          }
          else {
            if (!value) {
              parts.push('#NO_VALUE;');
            }
            else {
              parts.push(value);
            }
          }
        }
      }
      this.answerCode = parts.join(answerSpec.separator);
    },
    getColumnLabel(index) {
      let result = '';
      while(index >= 0) {
        const charCode = (index % 26) + 96;
        result = String.fromCharCode(charCode).toUpperCase() + result;
        index = Math.floor(index / 26) - 1;
      }
      return result;
    },
    copyAnswerCode() {
      copyText(this.answerCode);
      this.copyBar = true;
    }
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
    copyBar: false,
    answerCode: ''
  }),
};
</script>

<style scoped>
div.task-card, div.answer-card {
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