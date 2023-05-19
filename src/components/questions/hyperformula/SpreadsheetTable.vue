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
  <div class="spreadsheet-wrapper">
    <v-text-field v-if="editable" :disabled="currentLocked" outlined dense
      class="edit-field"
      :value="currentValue"
      @input="updateValue"
      @keydown="keydown"
      ref="editfield"
    >
      <template v-slot:prepend-inner>
        <v-chip label disabled class="address-chip" small>{{ currentAddress }}</v-chip>
      </template>
    </v-text-field>
    <div :style="tableStyle">
      <table class="spreadsheet">
          <thead>
              <tr>
              <th scope="col" class="spreadsheet-triangle-cell"><div class="spreadsheet-triangle"></div></th>
              <th scope="col" class="column-label" v-for="j of value.dimensions.width" :key="'col-'+j">{{ getColumnLabel(j) }}</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="i of value.dimensions.height" :key="'row-'+i">
                  <th scope="row">{{ i }}</th>
                  <td v-for="j of value.dimensions.width"
                      :key="'cell-'+i+'-'+j"
                      @click="setCurrent(i-1, j-1)"
                      :class="getStyleClasses(i-1, j-1)">
                      <template v-if="value.values[i-1]">
                      {{ value.values[i-1][j-1] }}
                      </template>
                  </td>
              </tr>
          </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpreadsheetTable',
  props: [
    'value', 'editable', 'locked', 'max-height'
  ],
  data:() => ({
    currentCell: null
  }),
  methods: {
    keydown(event) {
      if (this.currentCell && event.ctrlKey) {
        const cur = this.currentCell;
        if (event.key == 'ArrowLeft') {
          if (cur.col >= 1) {
            cur.col--;
          }
        }
        else if (event.key == 'ArrowRight') {
          if (cur.col < this.value.dimensions.width - 1) {
            cur.col++;
          }          
        }
        else if (event.key == 'ArrowUp') {
          if (cur.row >= 1) {
            cur.row--;
          }
        }
        else if (event.key == 'ArrowDown') {
          if (cur.row < this.value.dimensions.height - 1) {
            cur.row++;
          }          
        }
        else if (event.key == 'Delete' || event.key == 'BackSpace') {
          this.updateValue('');
        }
      }
    },
    setCurrent(row, col) {
      if (!this.editable) {
        return;
      }
      this.currentCell = {row, col};
      this.$nextTick(() => 
        this.$refs.editfield.focus()
      );
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
    determineTypeClass(value) {
        if (value === null || value === undefined) {
            return { 'value-blank' : true };
        }
        if (typeof value === 'number') {
            return { 'value-number' : true };
        }
        if (typeof value === 'boolean') {
            return { 'value-boolean' : true };
        }
        if (typeof value === 'string' && value.startsWith('=')) {
            return { 'formula' : true };
        }
        return { 'value-text' : true };
    },
    getStyleClasses(row, col) {
      const style = this.determineTypeClass(this.value.values[row][col]);
      if (this.currentCell && this.currentCell.row == row && this.currentCell.col == col) {
        style['selected'] = true;
      }
      return style;
    },
    updateValue(value) {
      if (!this.currentCell) {
        return;
      }
      const { row, col } = this.currentCell;
      let processed = value.trim();
      if (processed.length > 0 && !isNaN(processed)) {
          processed = parseFloat(value);
      }
      else if (processed == 'true' || processed == 'false') {
          processed = processed == 'true' ? true : false;
      }
      this.value.values[row][col] = processed;
      // It seems too costly that the full spreadsheet is updated when a single cell changes,
      // but for now this has to do
      this.$emit('input', this.value);
    },
  },
  watch: {
    value(newValue) {
      if (this.currentCell && newValue && newValue.dimensions) {
        const cur = this.currentCell;
        const dim = newValue.dimensions;
        if (cur.row >= dim.height || cur.col >= dim.width) {
          this.currentCell = null;
        }
      }
    }
  },
  computed: {
    currentLocked() {
      if (!this.currentCell) {
        return true;
      }
      return false;
    },
    currentAddress() {
      if (this.currentCell != null) {
        return this.getColumnLabel(this.currentCell.col + 1) + (this.currentCell.row + 1);
      }
      return '';
    },
    currentValue() {
      if (!this.currentCell) {
        return '';
      }
      const values = this.value.values;
      return values[this.currentCell.row][this.currentCell.col];
    },
    tableStyle() {
      if (this.maxHeight) {
        console.log('height!');
        return { 'max-height' : this.maxHeight, 'overflow-y' : 'scroll' };
      }
      return {};
    }
  }
}
</script>

<style scoped>
div.edit-field {
  margin-top: 20px;
}
.address-chip {
  margin-right: 0.5em;
  padding: 0 2em 0 2em;
  text-align: center;
}
div.spreadsheet-wrapper {
  overflow: auto;
  width: 100%;
  padding-top: 0.5em;
}

table.spreadsheet td.selected {
  border: 2px solid black !important;
}

td.value-number {
    text-align: right;
    color: cornflowerblue;
}

td.value-boolean {
    font-variant-caps: small-caps;
    font-weight: bold;
    color: purple;
}

td.value-text {
    color: darkolivegreen;
}

td.formula {
    font-family: 'Monaco', 'Courier New', Courier, monospace;
    color: #333;
    max-width: 10em;
    overflow: hidden;
    text-overflow: ellipsis;
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


</style>