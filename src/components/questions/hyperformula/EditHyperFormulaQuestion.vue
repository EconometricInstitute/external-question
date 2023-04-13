<template>
  <div>
    <v-card class="data-card">
      <v-card-title>Spreadsheet Data</v-card-title>
      <v-card-text>
        <v-btn @click="addSheet">Add Sheet</v-btn>
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
              <br />
              <v-btn @click="$event => addRow(sheet)">Add Row</v-btn>
              <v-btn @click="$event => addColumn(sheet)">Add Column</v-btn>
            </v-tab-item>
          </v-tabs-items>
        </template>
        <template v-else>
          Upload a spreadsheet?
        </template>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import SpreadsheetTable from './SpreadsheetTable.vue';

export default {
  name: 'EditHyperFormulaQuestion',
  props: [
    'value', 'focused'
  ],
  components: {
    SpreadsheetTable
  },
  data: () => ({
    currentTab: 0
  }),
  created() {
    console.log(this.value);
  },
  methods: {
    valueChanged() {
      this.$emit('input', this.value);
    },
    addSheet() {
      const sheetName = prompt('Enter a name for the new sheet');
      if (sheetName) {
        this.$set(this.value.sheets, sheetName.trim(), [['']]);
        console.log(this.value);
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
    updateSheet(sheet) {
      this.$set(this.value.sheets[sheet.name], 'values', sheet.values);
      console.log(this.value.sheets[sheet.name]);
      this.$emit('input', this.value);
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
    }
  },
};
</script>

<style scoped>
div.data-card {
  margin: 0.75em;
}
</style>