<template>
  <div>

    <v-card class="config-card">
      <v-card-title>
        Question configuration
      </v-card-title>
      <v-card-text>
        <v-checkbox label="Show question description as spreadsheet tab" v-model="value.descriptionAsTab" />
      </v-card-text>
    </v-card>

    <v-card class="data-card">
      <v-card-title>
        Spreadsheet Data
      </v-card-title>
      <v-toolbar class="elevation-0">
        <v-btn @click="addSheet" color="primary"><v-icon>mdi-plus</v-icon> Sheet</v-btn>
      </v-toolbar>
      <v-card-text>
        <template v-if="value.sheets">
          <v-tabs v-model="currentTab">
            <v-tab v-for="sheet of wrappedSheets" :key="'tab-'+sheet.name">
              <v-icon dense>mdi-table</v-icon>
              &nbsp;
              {{ sheet.name }}
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="currentTab">
            <v-tab-item v-for="sheet of wrappedSheets" :key="'content-'+sheet.name">
              <SpreadsheetTable :value="sheet" @input="updateSheet" editable="true" />
              <v-toolbar class="elevation-0">
                <v-btn color="primary" @click="$event => addRow(sheet)"><v-icon>mdi-plus</v-icon> Row</v-btn>
                <v-btn color="primary" @click="$event => addColumn(sheet)"><v-icon>mdi-plus</v-icon> Column</v-btn>
                &nbsp;
                <v-btn color="error" @click="$event => removeRow(sheet)"><v-icon>mdi-delete</v-icon> Row</v-btn>
                <v-btn color="error" @click="$event => removeColumn(sheet)"><v-icon>mdi-delete</v-icon> Column</v-btn>
                &nbsp;
                <v-btn color="primary" @click="$event => moveSheet(sheet, true)"><v-icon>mdi-content-copy</v-icon> Sheet</v-btn>
                <v-btn color="warning" @click="$event => moveSheet(sheet)"><v-icon>mdi-rename-box</v-icon> Sheet</v-btn>
                <v-btn color="error" :disabled="wrappedSheets.length <= 1" @click="$event => removeSheet(sheet)"><v-icon>mdi-delete</v-icon> Sheet</v-btn>
              </v-toolbar>
            </v-tab-item>
          </v-tabs-items>
        </template>
      </v-card-text>
    </v-card>

    <EditTasks class="tasks-card" v-model="value.tasks" :sheetnames="sheetnames" />

    <EditAnswerSpec class="answer-card" v-model="value.answerSpec" :currentSheet="currentSheetName" />
  </div>
</template>

<script>
import EditTasks from './EditTasks';
import EditAnswerSpec from './EditAnswerSpec.vue'

import SpreadsheetTable from './SpreadsheetTable.vue';


export default {
  name: 'EditHyperFormulaQuestion',
  props: [
    'value', 'focused'
  ],
  components: {
    SpreadsheetTable,
    EditAnswerSpec,
    EditTasks
  },
  data: () => ({
    currentTab: 0,
    truncateOptions: [ {text: 'Retain full values', value: false}, {text: 'Truncate from start', value: 'start'}, {text: 'Truncate from end', value: 'end'}],
    caseOptions: [ {text: 'Retain case', value: false}, {text: 'Convert to upper-case', value: 'upper'}, {text: 'Convert to lower-case', value: 'lower'}]
  }),
  methods: {
    valueChanged() {
      this.$emit('input', this.value);
    },
    addSheet() {
      const sheetName = prompt('Enter a name for the new sheet');
      if (sheetName && sheetName.trim()) {
        this.$set(this.value.sheets, sheetName.trim(), [['']]);
      }
    },
    addColumn(sheet) {
      for (const row of sheet.values) {
        row.push('');
      }
    },
    addRow(sheet) {
      const newRow = Array(sheet.dimensions.width).fill('');
      sheet.values.push(newRow);
    },
    removeColumn(sheet) {
      for (const row of sheet.values) {
        if (row.length > 0) {
          row.splice(row.length - 1, 1);
        }
      }
    },
    removeRow(sheet) {
      if (sheet.values.length > 0) {
        sheet.values.splice(sheet.values.length - 1, 1);
      }
    },
    moveSheet(sheet, copy) {
      const sheetName = prompt(copy ? 'Enter a name for the copy' : 'Enter a new name for the sheet');
      if (sheetName && sheetName.trim()) {
        const oldName = sheet.name;
        const newName = sheetName.trim();
        if (copy) {
          const copy = [];
          for (const row of sheet.values) {
            copy.push([...row]);
          }
          sheet.values = copy;
        }
        else {
          this.removeSheet(sheet);
          // Als rename references in the tasks
          for (const task of this.value.tasks) {
            if (task.targetSheetName == oldName) {
              task.targetSheetName = newName;
            }
          }
        }
        this.$set(this.value.sheets, sheetName.trim(), sheet.values);
      }
    },
    removeSheet(sheet) {
      this.$delete(this.value.sheets, sheet.name);
    },
    updateSheet(sheet) {
      this.$set(this.value.sheets[sheet.name], 'values', sheet.values);
      this.$emit('input', this.value);
    },
    addTask() {
      const tasks = this.value.tasks;
      tasks.push(
        { title: `Task ${tasks.length + 1}`,
          description: 'Write a formula for cell `A1` that does something useful',
          targetSheetName: this.sheetnames[this.currentTab],
          targetCell: 'A1',
          defaultFormula: '',
          copyTo: []
        }       
      )
    },
    deleteTask(index) {
      if (this.value && this.value.tasks) {
        this.value.tasks.splice(index, 1);
      }
    },
    addCopyTo(task) {
      if (task && task.copyTo) {
        task.copyTo.push('A1');
      }
    },
    addAnswerElement() {
      if (this.value && this.value?.answerSpec?.entries) {
        this.value.answerSpec.entries.push({
          type: 'cell-value',
          source: this.sheetnames[this.currentTab] + '!A1',
          formula: '=' + this.sheetnames[this.currentTab] + '!A1',
          decimals: 2,
          iterations: 1,
          truncate: false,
          truncateLength: 1,
          case: false,
          trim: true
        });
      }
    },
    deleteAnswerElement(index) {
      this.value.answerSpec.entries.splice(index, 1);
    }    
  },
  computed: {
    wrappedSheets() {
      const result = [];
      if (this.value && this.value.sheets) {
        for (const [key, value] of Object.entries(this.value.sheets)) {
          result.push({
            name: key,
            dimensions: { height: value.length, width: value[0] ? value[0].length : 0},
            values: value
          })
        }
      }
      return result;
    },
    sheetnames() {
      if (this.value && this.value.sheets) {
        return [...Object.keys(this.value.sheets)];
      }
      return [];
    },
    currentSheetName() {
      return this.sheetnames[this.currentTab];
    }
  },
};
</script>

<style scoped>
div.answer-entry-card:not(:first-child) {
  margin-left: 1em;
}

.separator-field {
  max-width: 15em;
}
div.task-cards {
  display: flex;
}
div.task-card {
  margin-bottom: 1em;
  max-width: 50em;
  flex-grow: 1;
}
div.task-card:not(:first-child) {
  margin-left: 1em;
}

div.data-card, div.tasks-card, div.answer-card, div.config-card {
  margin: 0.75em;
}
</style>