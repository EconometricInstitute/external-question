<template>
    <v-card>
      <v-card-title>
        Answer Definition
      </v-card-title>
      <v-card-text>
        <h4>Answer Elements</h4>
      </v-card-text>
      <v-toolbar class="elevation-0">
        <v-btn color="primary" @click="addAnswerElement()"><v-icon>mdi-plus</v-icon> Element</v-btn>
      </v-toolbar>
      <v-card-text class="d-flex">
        <v-card class="answer-entry-card" v-for="(entry, index) in value.entries" :key="'entry-'+index">
          <v-card-title>
            Element {{ index + 1 }}
            <v-spacer />
            <v-btn color="error" text @click="deleteAnswerElement(index)"><v-icon>mdi-delete</v-icon> Element</v-btn>
          </v-card-title>
          <v-card-text>
            <h4>Type of answer element</h4>
            <v-radio-group v-model="entry.type" row label="">
              <v-radio label="Cell values" value="range-values" />
              <v-radio label="Cell formulas" value="range-formulas" />
              <v-radio label="Hash of values" value="range-hash" />
              <v-radio label="Formula" value="formula" />
            </v-radio-group>
            <h4>Answer element details</h4>
            <br />
            <v-text-field outlined v-if="entry.type != 'formula'" v-model="entry.source" label="Cell/Range to extract" />
            <v-text-field outlined v-if="entry.type == 'formula'" v-model="entry.formula" label="Formula to compute" />
            <v-text-field outlined v-if="entry.type != 'range-formulas'" label="Number of decimals for numeric values" type="number" min="0" max="8" v-model="entry.decimals" />
            <v-select outlined :items="caseOptions" v-model="entry.case" label="Convert case of answer code?" />
            <template v-if="entry.type == 'range-hash'">
                <h4>Hash function details</h4>
                <br />
                <v-text-field outlined label="Number of hash iterations" type="number" min="1" max="50" v-model="entry.iterations" />
                <v-text-field outlined label="Length of final answer code" type="number" min="1" max="32" v-model="entry.hashLength" />
            </template>
            <template v-if="entry.type != 'range-formulas'">
                <h4>String value details</h4>
                <br />
                <v-select outlined :items="truncateOptions" v-model="entry.truncate" label="Truncate long values?"/>
                <v-text-field outlined v-if="entry.truncate" label="Truncate to number of characters" type="number" min="1" max="50" v-model="entry.truncateLength" />
                <v-checkbox label="Remove leading and trailing whitespace" v-model="entry.trim" />
            </template>
          </v-card-text>
        </v-card>
      </v-card-text>
      <v-card-text>
        <div class="d-flex flex-column">
          <h4>Separators</h4>
          &nbsp;
          <v-text-field outlined class="separator-field" label="Element separator" v-model="value.entrySeparator" />
          &nbsp;
          <v-text-field outlined class="separator-field" label="Value separator" v-model="value.valueSeparator" />
          &nbsp;
          <v-text-field outlined class="separator-field" label="Hash separator" v-model="value.hashSeparator" />
        </div>
      </v-card-text>
    </v-card>
</template>

<script>
export default {
  name: 'EditAnswerSpec',
  props: [
    'value', 'currentSheet'
  ],
  data: () => ({
    truncateOptions: [ {text: 'Retain full values', value: false}, {text: 'Truncate from start', value: 'start'}, {text: 'Truncate from end', value: 'end'}],
    caseOptions: [ {text: 'Retain case', value: false}, {text: 'Convert to upper-case', value: 'upper'}, {text: 'Convert to lower-case', value: 'lower'}]
  }),
  methods: {
    valueChanged() {
      this.$emit('input', this.value);
    },
    addAnswerElement() {
      if (this.value && this.value?.entries) {
        this.value.entries.push({
          type: 'range-values',
          source: this.currentSheet + '!A1',
          formula: '=' + this.currentSheet + '!A1',
          decimals: 2,
          iterations: 1,
          hashLength: 8,
          truncate: false,
          truncateLength: 1,
          case: false,
          trim: true
        });
      }
    },
    deleteAnswerElement(index) {
      this.value.entries.splice(index, 1);
    }    
  },
    watch: {
        value() {
            this.$emit('input', this.value);
        }
    },
};
</script>

<style scoped>
.separator-field {
  max-width: 15em;
}

div.answer-entry-card:not(:first-child) {
  margin-left: 1em;
}
</style>