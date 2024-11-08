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
  <v-form model="valid">
    <v-container>
      <v-row>
        <v-col class="editPanel" cols="6">
          <h4>Example Input</h4>
          <v-alert type="error" v-if="inputError">Unable to parse JSON. Question not updated. Fix this!<br />{{inputError}}</v-alert>
          <v-alert type="success" v-else>JSON succesfully parsed</v-alert>
          <codemirror class="small-editor" ref="editor1" :value="exampleInputStr" :options="jsonOptions" @input="updateInput"/>
        </v-col>
        <v-col class="editPanel" cols="6">
          <h4>Example Goal</h4>
          <v-alert type="error" v-if="outputError">Unabled to parse JSON. Question not updated. Fix this!<br />{{outputError}}</v-alert>
          <v-alert type="success" v-else>JSON succesfully parsed</v-alert>
          <codemirror class="small-editor" ref="editor2" :value="exampleOutputStr" :options="jsonOptions" @input="updateOutput"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="editPanel" cols="6">
          <h4>Testcase Script</h4>
          <codemirror class="editor" ref="editor3" :value="value.testCaseScript" :options="jsOptions" @input="updateTestCases"/>
        </v-col>
        <v-col class="editPanel" cols="6">
          <h4>Toolbox XML</h4>
          <codemirror class="editor" ref="editor4" :value="value.toolbox" :options="xmlOptions" @input="updateToolbox"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <h4>Answer code settings</h4>
          <v-slider v-model.number="value.decimals" min="0" step="1" max="8" ticks thumb-label 
            :label="'Number of decimals to compare in numbers '+value.decimals" />
          <v-checkbox v-model="value.strictString" label="Perform strict comparison of strings (correct spacing and case are required)" />
          <v-text-field class="short-field" label="Answer code prefix" v-model="value.hashPrefix" @input="updateHashPrefix"/>
          <v-text-field class="short-field" label="Answer code repetitions" v-model="value.hashReps" min="1" type="number" @input="updateHashReps"/>
          <v-text-field class="short-field" label="Answer code length" v-model="value.hashLength" min="1" type="number" @input="updateHashLength"/>
          <v-checkbox v-model="value.autoDownload" label="Automatically download a copy of the answer file upon submitting" />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>

// import CodeMirror
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/xml/xml.js'

export default {
  name: 'EditBlocklyQuestion',
  props: [
    'value', 'focused'
  ],
  components: {
    codemirror
  },
  data: () => ({
    inputError: null,
    outputError: null,
    loaded: false,
    exampleInputStr: null,
    exampleOutputStr: null,
    updating: false,
    jsonOptions: {
      tabSize: 4,
      mode: 'application/json',
      lineNumbers: true,
      line: true,
      lineWrapping: true
    },
    xmlOptions: {
      tabSize: 4,
      mode: 'application/xml',
      lineNumbers: true,
      line: true,
      lineWrapping: true
    },
    jsOptions: {
      tabSize: 4,
      mode: 'application/javascript',
      lineNumbers: true,
      line: true,
      lineWrapping: true
    }
  }),
  created() {
    this.loaded = true;
    this.exampleInputStr = JSON.stringify(this.value.exampleInput, null, '\t');
    this.exampleOutputStr = JSON.stringify(this.value.exampleOutput, null, '\t');
  },
  methods: {
    valueChanged() {
      this.$emit('input', this.value);
    },
    updateInput(value) {
      this.inputError = null;
      try {
        this.value.exampleInput = JSON.parse(value);
        this.updating = true;
        this.$nextTick(() => {
          this.updating = false;
        });
        this.$emit('input', this.value);
      }
      catch (err) {
        this.inputError = err.message;
      }
    },
    updateOutput(value) {
      this.outputError = null;
      try {
        this.value.exampleOutput = JSON.parse(value);
        this.updating = true;
        this.$nextTick(() => {
          this.updating = false;
        });
        this.$emit('input', this.value);
      }
      catch (err) {
        this.outputError = err.message;
      }
    },
    stringifyIO() {
      if (this.updating) {
        return;
      }
      if (this.value.exampleInput) {
        this.exampleInputStr = JSON.stringify(this.value.exampleInput, null, 3);
      }
      if (this.value.exampleOutput) {
        this.exampleOutputStr = JSON.stringify(this.value.exampleOutput, null, 3);
      }
    },
    updateTestCases(value) {
      this.value.testCaseScript = value;
      this.$emit('input', this.value);
    },
    updateToolbox(value) {
      this.value.toolbox = value;
      this.$emit('input', this.value);
    },
    updateHashReps(value) {
      this.value.hashReps = value;
      this.$emit('input', this.value);
    },
    updateHashLength(value) {
      this.value.hashLength = value;
      this.$emit('input', this.value);
    },
    updateHashPrefix(value) {
      this.value.hashPrefix = value;
      this.$emit('input', this.value);
    },    
    refreshAll() {
      this.$refs.editor1.refresh();
      this.$refs.editor2.refresh();
      this.$refs.editor3.refresh();
      this.$refs.editor4.refresh();
    }
  },
  watch: {
    focused() {
      this.$nextTick(this.refreshAll);
    },
    value: {
      deep: true,
      handler() {
        this.stringifyIO();
      }
    }
  }
};
</script>

<style scoped>
.small-editor {
  height: 8em;
}

.editor {
  height: 25em;
}

.editPanel {
  height: 28em;
}

.short-field {
  max-width: 20em;
}
</style>