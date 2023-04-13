<template>
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
                    :contenteditable="editable"
                    @input="$ev => cellChanged($ev, i-1, j-1)">
                    <template v-if="value.values[i-1]">
                    {{ value.values[i-1][j-1] }}
                    </template>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
  name: 'SpreadsheetTable',
  props: [
    'value', 'editable'
  ],
  methods: {
    getColumnLabel(index) {
      let result = '';
      while(index >= 0) {
        const charCode = (index % 26) + 96;
        result = String.fromCharCode(charCode).toUpperCase() + result;
        index = Math.floor(index / 26) - 1;
      }
      return result;
    },
    cellChanged(event, row, column) {
        console.log(event, row, column);
        this.value.values[row][column] = event.target.innerText;
        this.$emit('input', this.value);
    }
  }
}
</script>

<style scoped>
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


</style>