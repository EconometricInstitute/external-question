<template>
  <div class="question-container">
    <div class="question-main">
      <div class="flex-grow-1">
        <BlocklyWorkspace :question="question" :focused="focused" @code="codeChange"
          :inputAnswer="inputAnswer" ref="workspace" />
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
        <v-tab>Input</v-tab>
        <v-tab>Goal</v-tab>
        <v-tab>Output</v-tab>
        <v-tab>Code</v-tab>
        <v-tab>Answer</v-tab>
      </v-tabs>
      <div class="question-iocontent">
        <div v-if="ioTab == 0" class="iotab">
          <h4>This is an example input of one testcase:</h4>
          <div v-html="inputHTML"></div>
        </div>
        <div v-if="ioTab == 1" class="iotab">
          <h4>For the example input, the output of your program should be as follows:</h4>
          <div v-html="goalHTML"></div>
        </div>
        <div v-if="ioTab == 2" class="iotab">
          <div v-if="traceOutput">
            <h4>Your program produced the following output:</h4>
            <div v-html="outputHTML"></div>
          </div>
          <div v-else-if="traceError">
            <h4>Error while running</h4>
            <v-alert type="error">
              The following error occurred while your program was executed:
              <br />
              {{traceError}}
            </v-alert>
          </div>
          <div v-else>
            <h4>This tab will contain the output of your program after you run it.</h4>
          </div> 
        </div>
        <div v-if="ioTab == 3" class="iotab">
            <h4>This is the generated JavaScript code of your program:</h4>
          <pre class="code"><code class="code">{{code.display}}</code></pre>
        </div>
        <div class="iotab" v-if="ioTab == 4">
          <span v-if="testOutput.length == 0">After you submit your code, the answer code appears here</span>
          <div v-if="testOutput.length > 0">
            <strong>Your answer code is:</strong><span class="answercode">{{answerCode}}</span>
            <br />
            This code is based on the following output of your program:
          </div>
          <v-alert v-if="outputErrors" type="error">
            Your program produced an error for at least one testcase.
            This indicates your program is likely incorrect.
          </v-alert>
          <v-alert v-if="outputMissing" type="warning">
            One of the output variables was missing (undefined) for at least one testcase.
            This indicates your program is likely incorrect.
          </v-alert>
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
      </div>
    </div>
  </div>
</template>

<script>
//import VueMarkdownPlus from 'vue-markdown-plus';
import * as md5hex from 'md5-hex';

import MarkdownDisplay from '@/components/util/MarkdownDisplay';
import BlocklyWorkspace from './BlocklyWorkspace';
import {displayEnv, evalScripts, evalInWorker, evalInWorkerTrace, formatValue} from './blockly_utils';

export default {
  name: 'BlocklyQuestion',
  props: [
    'question', 'focused', 'inputAnswer'
  ],
  components: {
    //VueMarkdownPlus,
    MarkdownDisplay,
    BlocklyWorkspace
  },
  data: () => ({
    ioTab: null,
    code: {},
    testOutput: [],
    dirty: true,
    worker: null,
    traceOutput: null,
    traceError: null,
    testCases: null
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
    runTraceCode() {
      if (!this.worker) { 
        this.traceOutput = null;
        this.traceError = null;
        this.ioTab = 3;

        const script = this.code.trace;
        const highlight = this.$refs.workspace.highlight;
        const finishTrace = this.finishTrace;
        const errorTrace = this.errorTrace;
        this.worker = evalInWorkerTrace(script, highlight, finishTrace, errorTrace);
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
      this.ioTab = 2;
      this.stopTraceCode();
    },
    errorTrace(error) {
      this.traceError = error;
      this.ioTab = 2;
      this.stopTraceCode();
    },
    submitCode() {
        this.testOutput = [];
        this.dirty = true;
        const generated = this.code.test || '';
        const solution = generated.substring(generated.indexOf("\n") + 1).trim() + '\n';
        const declr = generated.substring(0, generated.indexOf("\n")).trim() + '\n\n';
        const scripts = [];
        for (const tc of this.testCases) {
          let testCode = Object.entries(tc).map(([k,v]) => k+'='+JSON.stringify(v)).join(';\n')+';\n';
          testCode += declr;
          testCode += solution;
          testCode += this.outputCode;
          scripts.push(testCode);
        }
        evalScripts(scripts)
        .then(result => {
          //console.log(result);
          this.testOutput = result;
          this.dirty = false;
          this.ioTab = 4;
        });
    },
    refreshTestcases() {
      const script = this.question.testCaseScript+';return getTestCases();';
      evalInWorker(script)
      .then(resStr => {
        const res = JSON.parse(resStr);
        if (!res.error) {
          this.testCases = res.data;
        }
        else {
          // TODO: warn the user that there is a problem??
          console.log('Error while generating testCases: '+res.data);
        }
      });
    }
  },
  computed: {
    inputHTML() {
      return displayEnv(this.question.exampleInput);
    },
    goalHTML() {
      return displayEnv(this.question.exampleOutput);
    },
    outputHTML() {
      if (this.traceOutput) {
        return displayEnv(this.traceOutput);
      }
      return '';
    },
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
      if (!this.testOutput || this.testOutput.length == 0) {
        return result;
      }
      for (let i=0; i < this.testCases.length; i++) {
        let op = {error: true, data: 'Program was not executed'};
        if (i in this.testOutput) {
          op = this.testOutput[i];
          for (const outputVar of this.outputOrder) {
            if (op.data[outputVar]) {
              // TODO: pass the question preferences down from the config
              const decimals = this.question.decimals !== undefined ? this.question.decimals : 1;
              op.data[outputVar] = formatValue(op.data[outputVar], decimals, this.question.strictStrings);
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
      return md5hex(answerStr);
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
  height: calc(100vh - 120px);
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