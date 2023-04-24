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
    <div class="question-main">
      <div class="flex-grow-1">
        <BlocklyWorkspace :question="question" :focused="focused" @code="codeChange"
          :inputAnswer="inputAnswer" :varnames="varnames" ref="workspace" />
      </div>
      <div class="instructions">
        <div class="instruction-div scroll-y">
          <MarkdownDisplay class="instruction-text" :source="question.description" />
        </div>
        <v-toolbar class="run-bar" flat dense>
            <v-spacer />
            <v-toolbar-items>
              <v-btn v-if="!running" @click.stop="runTraceCode()" class="run-toolbar-el">
                <v-icon>mdi-play</v-icon>
                Test
              </v-btn>
              <v-btn v-if="running" @click.stop="stopTraceCode()" class="run-toolbar-el">
                <v-icon>mdi-stop</v-icon>
                Stop
              </v-btn>              
              <v-btn :disabled="running || testCases == null" @click.stop="submitCode()" class="run-toolbar-el">
                <v-icon>mdi-send</v-icon>
                Run
              </v-btn>
              <div v-if="running" class="running-indicator run-toolbar-el">
                <div>
                  <v-progress-circular :indeterminate="true" />
                  <span>Running...</span>
                </div>
              </div>
            </v-toolbar-items>
            <v-spacer />
        </v-toolbar>
      </div>
    </div>
    <div class="question-io">
      <v-tabs class="question-iotabs" background-color="secondary" dark
        v-model="ioTab">
        <v-tabs-slider color="white"></v-tabs-slider>
        <v-tab>Example</v-tab>
        <v-tab>Example Result</v-tab>
        <v-tab>Code</v-tab>
        <v-tab>Answer</v-tab>
      </v-tabs>
      <div class="question-iocontent">
        <div v-if="ioTab == 0" class="iotab">
          <h4>In this tab you can find the input and output for an example testcase</h4>
          <div class="example">
            <div class="exampleInput">
              <h4>Example Input</h4>
              <EnvironmentDisplay :data="question.exampleInput" />
            </div>
            <div class="exampleOutput">
              <h4>Example Output</h4>
              <EnvironmentDisplay :data="question.exampleOutput" />
            </div>
          </div>
        </div>
        <div v-if="ioTab == 1" class="iotab">
          <div v-if="traceError">
            <h4>Error while running</h4>
            <v-alert type="error" class="small-alert">
              The following error occurred while your program was tested:
              <br />
              {{traceError}}
            </v-alert>
          </div>
          <div v-if="traceOutput">
            <v-alert v-if="compareFailed" class="small-alert" type="error">
              One or more output variables do not have the expected outcome for the example test case. <br />
              This indicates there is a mistake in your program.
            </v-alert>
            <v-alert v-else-if="compareSuccess" class="small-alert" type="info" icon="mdi-check">
              The output variables have the correct values for the example test case. <br />
              This does not guarantee your program is correct for all test cases. <br />
              It is your responsibility to make sure the program is correct for all test cases.
            </v-alert>
            <h4>Your program produced the following output:</h4>
            <EnvironmentDisplay :data="traceOutput" :reference="question.exampleOutput" :compare="compareResult" />
          </div>
          <div v-if="!traceOutput && !traceError">
            <h4>This tab will contain the output of your program after you test it.</h4>
          </div> 
        </div>
        <div v-if="ioTab == 2" class="iotab">
          <h4 v-if="!code.display">This tab will contain the Javascript code generated from your program.</h4>          
          <template v-else>
            <h4>This is the generated JavaScript code of your program:</h4>
            <pre class="code"><code class="code">{{code.display}}</code></pre>
          </template>
        </div>
        <div class="iotab" v-if="ioTab == 3">
          <span v-if="testOutput.length == 0">After you run your code, the answer code appears here</span>
          <v-alert v-if="outputErrors" type="error" class="small-alert">
            Your program produced an error for at least one testcase. <br />
            This indicates your program is likely <strong>incorrect</strong>.
          </v-alert>
          <v-alert v-else-if="compareFailed" type="error" class="small-alert">
              The example test case is incorrect. <br />
              This means your answer code is likely <strong>incorrect</strong>.
          </v-alert>
          <v-alert v-else-if="outputMissing" type="warning" class="small-alert">
            One of the output variables was missing (undefined) for at least one testcase.<br />
            This indicates your program is likely <strong>incorrect</strong>.
          </v-alert>
          <AnswerCodeDisplay v-if="testOutput.length > 0" :answerCode="answerCode" />
          <template v-if="testOutput.length > 0">
            <div ref="outputs">
              <h4>The answer code is based on the following output of your program.</h4>
              <p>It is <strong>your responsibility</strong> to make sure that your output is correct for <strong>all testcases</strong>.</p>
              <ul>
                <li v-for="e in outputDisplay" :key="'test-'+e.index">
                  <span>With the following inputs:</span>
                    <span class="blockly-inputvalue" v-for="(key, val) in e.input" :key="'test-input-'+e.index+'-'+val">
                      {{val}} = {{JSON.stringify(key)}}
                    </span>
                  <span v-if="!e.output.error">
                    <span> your program produced the following outputs:</span>
                    <span class="blockly-outputvalue" v-for="(key, val) in e.output.data" :key="'test-output-'+e.index+'-'+val">
                      {{val}} = {{JSON.stringify(key)}}
                    </span>
                  </span>
                  <span v-if="e.output.error">
                    <span> your program produced the following error:</span>
                    <span class="blockly-outputerror">{{e.output.data}}</span>
                  </span>              
                </li>
              </ul>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import VueMarkdownPlus from 'vue-markdown-plus';
import * as md5hex from 'md5-hex';

import MarkdownDisplay from '@/components/util/MarkdownDisplay';
import AnswerCodeDisplay from '@/components/util/AnswerCodeDisplay';

import BlocklyWorkspace from './BlocklyWorkspace';
import EnvironmentDisplay from './EnvironmentDisplay.vue';
import {evalScripts, evalInWorker, evalInWorkerTrace, formatValue, generateFile} from './blockly_utils';

import compare from '@/util/compare.js';

export default {
  name: 'BlocklyQuestion',
  props: [
    'question', 'focused', 'inputAnswer'
  ],
  components: {
    //VueMarkdownPlus,
    MarkdownDisplay,
    AnswerCodeDisplay,
    BlocklyWorkspace,
    EnvironmentDisplay
  },
  data: () => ({
    ioTab: null,
    code: {},
    testOutput: [],
    dirty: true,
    worker: null,
    traceOutput: null,
    traceError: null,
    testCases: null,
  }),
  created() {
    if (this.inputAnswer) {
      this.dirty = this.inputAnswer.dirty;
      this.testOutput = this.inputAnswer.output;
    }
    if (this.question) {
      this.refreshTestcases();
    }
  },
  methods: {
    codeChange(ev) {
      this.code = ev;
    },
    runTraceCode(fast) {
      if (!this.worker) { 
        this.traceOutput = null;
        this.traceError = null;
        this.ioTab = 2;

        const script = (fast ? this.getTestCode() : this.code.trace) || '';
        if (script) {
          if (fast) {
            evalInWorker(script)
              .then(res => {
                const result = JSON.parse(res);
                if (!result.error) {
                  this.traceOutput = result.data;
                }
                else {
                  this.traceError = result.data;
                }
              });            
          }
          else {
            const highlight = this.$refs.workspace.highlight;
            const finishTrace = this.finishTrace;
            const errorTrace = this.errorTrace;
            this.worker = evalInWorkerTrace(script, highlight, finishTrace, errorTrace);
          }
        }
        else {
          this.traceOutput = null;
          this.traceError = 'Can not run an empty program'; 
          this.ioTab = 1;
        }
      }
    },
    stopTraceCode() {
      if (this.worker) {
        this.worker.terminate();
        this.worker = null;
      }
    },
    finishTrace(result) {
      this.traceOutput = result;
      this.ioTab = 1;
      this.stopTraceCode();
    },
    errorTrace(error) {
      this.traceError = error;
      this.ioTab = 1;
      this.stopTraceCode();
    },
    getTestCode(testcase=this.question.exampleInput, solution, declr) {
      const generated = this.code.test || '';
      if (!solution) {
        solution = generated.substring(generated.indexOf("\n") + 1).trim() + '\n';
      }
      if (!declr) {
        declr = generated.substring(0, generated.indexOf("\n")).trim() + '\n\n';
      }
      let testCode = Object.entries(testcase).map(([k,v]) => k+'='+JSON.stringify(v)).join(';\n')+';\n';
      testCode += declr;
      testCode += solution;
      testCode += this.outputCode;
      return testCode;
    },
    submitCode() {
        this.testOutput = [];
        this.runTraceCode(true);
        this.dirty = true;
        const generated = this.code.test || '';
        const solution = generated.substring(generated.indexOf("\n") + 1).trim() + '\n';
        const declr = generated.substring(0, generated.indexOf("\n")).trim() + '\n\n';
        const scripts = [];
        for (const tc of this.testCases) {
          const testCode = this.getTestCode(tc, solution, declr);
          // let testCode = Object.entries(tc).map(([k,v]) => k+'='+JSON.stringify(v)).join(';\n')+';\n';
          // testCode += declr;
          // testCode += solution;
          // testCode += this.outputCode;
          scripts.push(testCode);
        }
        evalScripts(scripts)
        .then(result => {
          this.testOutput = result;
          this.dirty = false;
          this.ioTab = 3;
        });
    },
    refreshTestcases() {
      const script = this.question.testCaseScript+';return getTestCases();';
      evalInWorker(script)
      .then(resStr => {
        const res = JSON.parse(resStr);
        if (!res.error && Array.isArray(res.data)) {
          if (res.data.length > 0 && compare(res.data[0], this.question.exampleInput, 1e-6)) {
            this.testCases = res.data;
          }
          else {
            this.testCases = [this.question.exampleInput, ...res.data];
          }
        }
        else {
          // TODO: warn the user that there is a problem??
          console.log('Error while generating testCases: '+res.data);
        }
      });
    },
    generateFile() {
      // function generateFile(workspace, answer, answerlog, rawCode, exampleIncorrect, hasUndefined) {
      const workspace = this.$refs.workspace.getWorkspace();
      const answerlog = this.$refs.outputs ? this.$refs.outputs.innerHTML : '';
      return generateFile(workspace, this.answerCode, answerlog, this.code.display, this.compareFailed, this.outputMissing )
    }
  },
  computed: {
    outputOrder() {
      const res = [];
      for (const key of Object.keys(this.question.exampleOutput)) {
        res.push(key);
      }
      res.sort();
      return res;
    },
    outputCode() {
      let res = 'const $resultObj = {};\n';
      for (const key of Object.keys(this.question.exampleOutput)) {
        res += '$resultObj.'+key+' = '+key+';\n';
      }
      res += 'return $resultObj;';
      return res;
    },
    // testCases() {
    //   return eval(this.question.testCaseScript+';getTestCases()');
    // },
    outputDisplay() {
      const result = [];
      if (!this.testCases || !this.testOutput || this.testOutput.length == 0) {
        return result;
      }
      for (let i=0; i < this.testCases.length; i++) {
        let op = {error: true, data: 'Program was not executed'};
        if (i in this.testOutput) {
          op = this.testOutput[i];
          for (const outputVar of this.outputOrder) {
            if (op.data[outputVar]) {
              op.data[outputVar] = formatValue(op.data[outputVar], this.decimals, this.question.strictStrings);
            }
          }
        }
        result.push({index: i, input: this.testCases[i], output: op});
      }
      return result;
    },
    outputErrors() {
      if (this.testOutput) {
        for (const out of this.testOutput) {
          if (out.error) {
            return true;
          }
        }
      }
      return false;
    },
    outputMissing() {
      if (this.testOutput) {
        for (const out of this.testOutput) {
          if (!out.error) {
            for (const outputVar of this.outputOrder) {
              if (typeof out.data[outputVar] == 'undefined') {
                return true;
              }
            }
          }
        }
      }
      return false;
    },
    answerCode() {
      const answerLst = [];
      for (const tc of this.outputDisplay) {
        for (const outputVar of this.outputOrder) {
          answerLst.push(outputVar + '=' + tc.output.data[outputVar]);
        }
      }
      const answerStr = answerLst.join('|');
      let answerCode = md5hex(answerStr);
      if (this.question.hashReps && this.question.hashReps > 1) {
        for (let i=1; i < this.question.hashReps; i++) {
          answerCode = md5hex(answerCode + '|' + answerStr);
        }
      }
      if (this.question.hashLength) {
        answerCode = answerCode.substring(0, this.question.hashLength);
      }
      if (this.question.hashPrefix) {
        answerCode = this.question.hashPrefix + answerCode;
      }
      return answerCode;
    },
    fullAnswer() {
      return {
        dirty: this.dirty,
        shortAnswer: this.answerCode,
        xml: this.code.xml,
        svg: this.code.svg,
        output: this.testOutput
      };
    },
    running() {
      return this.worker != null;
    },
    decimals() {
      return this.question.decimals !== undefined ? this.question.decimals : 1;
    }, 
    varnames() {
      if (this.question) {
        const {exampleInput, exampleOutput} = this.question;
        return [...Object.keys(exampleInput), ...Object.keys(exampleOutput)];
      }
      return [];
    },
    compareResult() {
      if (this.traceOutput) {
        const result = {};
        for (const [varname, value] of Object.entries(this.question.exampleOutput)) {
          result[varname] = compare(value, this.traceOutput[varname], this.decimals);
        }
        return result;
      }
      return null;
    },
    compareFailed() {
      if (this.compareResult && Object.keys(this.compareResult).length > 0) {
        return Object.values(this.compareResult).some(x => !x);
      }
      return false;
    },
    compareSuccess() {
      if (this.compareResult && Object.keys(this.compareResult).length > 0) {
        return Object.values(this.compareResult).every(x => x);
      }
      return false;
    }    
  },
  watch: {
    fullAnswer() {
      this.$emit('input', this.fullAnswer);
    },
    question() {
      this.refreshTestcases();
    }
  }
};
</script>

<style scoped>
.question-container {
  height: calc(100vh - 64px);
}

.question-main {
  height: 66.6%;
  display: flex;
  flex-direction: row;
}

.question-io {
  height: 33.3%;
  width: 100%;
}

.question-iotabs {
  width: 100%;
  height: 48px;
}

.question-iocontent {
  height: calc(100% - 48px);
  overflow-y: scroll;
}

.iotab {
  padding: 0.5em;
}

.example {
  display: flex;
  flex-wrap: wrap;
}

.example>div {
  border: gray 1px solid;
  margin: 3px;
  padding: 3px;
}

.instructions {
  min-width: 25em;
  max-width: 40em;
  width: 25%;
  height: calc(100% - 48px);
}

.instruction-div {
  height: 100%;
  overflow-y: scroll;
}

.instruction-text {
  display: inline-block;
}

.run-bar {
  margin-bottom: 5px;
  height: 5em;
}

.scroll {
  overflow: scroll;
}

.answercode-box {
  max-width: 34em;
  font-family: monospace;
  margin-top: 0.5em;
}

.code {
  color: black;
  width: 100%;
}

.code::after {
  content: none !important;
}

.adjust-md code::before {
  content: "" !important
}

.adjust-md code::after {
  display: none;
}

.adjust-md code {
  box-shadow: none !important;
  color: black !important;
}

.adjust-md pre {
  margin-bottom: 16px;
}

.answercode {
  font-family: monospace;
  font-size: 105%;
}

.scroll-y {
  overflow-y: scroll;
}



.running-indicator {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.run-toolbar-el {
  margin-left: 1em;
}

.small-alert {
  max-width: 50em;
}
</style>

<style>
.blockly-varname {
	font-family: monospace;
	font-weight: bold;
	font-size: 130%;
	background-color: whitesmoke;
}

.blockly-string {
	font-family: monospace;
	color: darkgreen;
	font-size: 110%;
}

.blockly-number {
	font-family: monospace;
	color: royalblue;
	font-size: 120%;
}

.blockly-boolean {
	font-family: monospace;
	font-weight: bold;
	color: darkmagenta;
	font-size: 120%;	
}

.blockly-inputs, .blockly-outputs {
  border-style: dotted;
  border-width: 1px;
  padding-left: 5px;
  padding-right: 5px;
}

.blockly-inputvalue, .blockly-outputvalue {
  font-family: monospace;
  font-size: 105%;
}

.blockly-outputerror {
  margin-left: 0.8em;
  font-family: monospace;
  font-size: 105%;
  color: red;
}

table.blockly-table {
  border-collapse: collapse;
	margin: 8px;
}

table.blockly-table, tr.blockly-table, td.blockly-table {
	border: 1px solid black;
}

td.blockly-table-index {
  text-align: center;
}

td.blockly-table-value {
  padding: 0 0.2em 0 0.2em;
}

</style>