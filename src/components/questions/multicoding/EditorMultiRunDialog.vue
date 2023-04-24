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
  <v-dialog width="80em" v-model="runDialog" scrollable persistent>
    <v-card>
      <v-card-title class="headline" primary-title>
        Run your code
      </v-card-title>
      <v-card-text>
        <v-stepper v-model="runStep">
          <v-stepper-header>
            <v-stepper-step step="1">Choose input type</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="2">Define program input</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="3">Compiling and Running Your Program</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="4">Result and Output</v-stepper-step>
          </v-stepper-header>
        </v-stepper>
        <br />
        <v-container>
          <div v-if="runStep==1">
            <div v-if="question.allowCustomTest && question.testCases.length > 0">
              <div>Select the kind of input that will be send to your program during execution:</div>
              <br />
              <v-radio-group v-model="performCustom">
                <v-radio label="Select a predefined test case" :value="false" />
                <v-radio label="Define your own input in a textfield" :value="true" />
              </v-radio-group>
            </div>
            <div v-else-if="question.allowCustomTest">
              Your program can only be executed with custom input.
            </div>
            <div v-else-if="question.testCases.length > 0">
              Your program can only be executed with predefined testcases.
            </div>          
            <div v-else>
              This question does not allow you to define any input.
            </div>
          </div>
          <div v-if="runStep==2">
            <div v-if="runPredefined">
              <div>Select the standard input that will be send to your program during execution:</div>
              <br />
              <v-tabs v-model="currentTab">
                <v-tab v-for="i in question.testCases.length" :key="'tab-'+i">Testcase {{i}}</v-tab>
                <v-tab-item v-for="i in question.testCases.length" :key="'tab-item-'+i">
                  <div>Your code will be executed with the following input</div>
                  <br />
                  <code class="pre-output"><pre>{{question.testCases[i-1]}}</pre></code>
                </v-tab-item>
              </v-tabs>
            </div>
            <div v-else-if="runCustom">
              <div>Provide the standard input that will be send to your program during execution:</div>
              <br />
              <v-textarea class="input-textarea" v-model="customInput"
              placeholder="Type your input here" :rows="5">
              </v-textarea>
            </div>
            <div v-else>
              Your program will be executed without any input.
            </div>
          </div>
          <div v-if="runStep==3">
            <div>Compiling and running your program</div>
            <v-progress-circular indeterminate></v-progress-circular>
            <v-alert type="warning" v-if="timeoutPopup">
              This seems to take rather long. Try restarting the run action,
              and if the problem persists contact support.
            </v-alert>
          </div>
          <div v-if="runStep==4">
            <div v-if="runError">
              <v-alert type="error">
                An unexpected error occurred while running your code.
                <br />
                {{runError.name}} : {{runError.message}}.
                <br />
                Try again and contact support if the problem persists.
              </v-alert>
            </div>
            <div v-else-if="emptyResponse">
              <v-alert type="error">
                The result of the execution was empty.
                <br />
                This should not happen.
                <br />
                Try again and if the problem persists, contact support.
              </v-alert>
            </div>
            <div v-else-if="output.compile">
              <v-alert v-if="output.compile.exitCode != 0" type="error">
                Your code did not compile succesfully. Please review the following error output.
              </v-alert>
              <v-alert v-else-if="output.compile.stdOut.length" type="warning">
                Your code compiled succesfully, but there were warnings. Please review them.
              </v-alert>
              <v-alert v-else type="info"> 
                Your code compiled succesfully.
              </v-alert>
              <div>
                <code v-if="output.compile.stdOut" class="pre-output"><pre>{{output.compile.stdOut}}</pre></code>
              </div>
            </div>
            <div v-if="output.run">
              <v-alert v-if="output.run.timeout" type="error">
                Your program exceeded the time limit of {{output.run.timeLimit}} seconds.
                Make sure there are no infinite loops in your code.
              </v-alert>
              <v-alert v-else-if="output.run.exitCode != 0 || output.run.stdErr" type="warning">
                Your program finished execution, but did not exit normally.
                Review the error output if available.
              </v-alert>
              <v-alert v-else type="success">
                Your program finished exectution normally.
              </v-alert>
              <div v-if="output.run.stdErr">
                The following errors were reported while running your code:
                <code class="pre-output"><pre>{{output.run.stdErr}}</pre></code>
                <v-divider></v-divider>
              </div>
              <div>The output of your code was as follows:</div>
              <code class="pre-output"><pre>{{output.run.stdOut}}</pre></code>
            </div>
          </div>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if="runStep==1" @click="next()" color="primary">Next</v-btn>
        <v-btn v-if="runStep==3" @click="cancel(true)" color="primary">Restart</v-btn>
        <v-btn v-if="runStep==3" @click="cancel(false)" color="error">Cancel</v-btn>
        <v-btn v-if="runStep==4" @click="openRunDialog()" color="primary">Restart</v-btn>
        <v-btn v-if="runStep==2" @click="run()" color="primary">Run</v-btn>
        <v-btn v-if="runStep==2" @click="back()" color="error">Back</v-btn>
        <v-btn :disabled="running" @click="runDialog = false" color="secondary">Close</v-btn>          
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Axios from 'axios';

const timeoutAfter = 15000;

export default {
  name: 'EditorMultiRunDialog',
  props: [
    'question',
    'code'
  ],
  data: () => ({
    runDialog: false,
    runStep: 1,
    runError: null,
    currentTab: 0,
    running: false,
    output: '',
    customInput: '',
    emptyResponse: false,
    performCustom: false,
    cancelToken: null,
    timeout: null,
    timeoutPopup: false,
    currentId: 0
  }),
  methods: {
    post: function(data) {
      return Axios.post(this.question.runUrl, JSON.stringify(data));
    },
    openRunDialog() {
      this.runError = null;
      this.output = '';
      this.runStep = 1;
      this.runDialog = true;
      this.cancelToken = null;
      this.stopTimeout();
      this.currentId++;
      this.running = false;
    },
    next() {
      this.runStep += 1;
    },
    back() {
      this.runStep -= 1;
    },
    stopTimeout() {
      this.timeoutPopup = false;
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
    },
    triggerTimeout() {
      this.timeoutPopup = true;
    },
    runSuccesful(data, id) {
      if (this.currentId == id) {
        this.emptyResponse = Object.keys(data).length === 0 && data.constructor === Object;
        this.running = false;
        this.output = data;
        this.runStep = 4;
      }
      this.stopTimeout();
    },
    runWithError(err, id) {
      if (this.currentId == id) {
        this.running = false;
        this.runStep = 4;
        this.runError = err;
      }
    },
    run() {
      this.runStep = 3;
      this.running = true;
      this.output = '';
      console.log(this.question.files);
      console.log(this.code);
      let data = {
        mainClass: this.question.mainClass,
        sources: this.question.files.map((f) => ({filename: f.filename, content: this.code[f.filename]})),
        stdIn: this.getInput(),
        token: this.question.runToken
      };
      const id = this.currentId;
      this.post(data)
          .then(resp => {
            this.runSuccesful(resp.data, id);
          })
          .catch(err => {
            this.runWithError(err, id);
          });
      this.timeout = setTimeout(this.triggerTimeout, timeoutAfter);
    },
    cancel(restart) {
      this.stopTimeout();
      if (this.cancelToken) {
        this.cancelToken.cancel('The request was cancelled by the user');
        this.cancelToken = null;
      }
      if (restart) {
        this.openRunDialog();
      }
      else {
        this.runDialog = false;
      }
    },
    getInput() {
      if (!this.question.allowCustomTest && this.question.testCases.length == 0) {
        return '';
      }
      if (this.runCustom) {
        return this.customInput;
      }
      return this.question.testCases[this.currentTab];
    }
  },
  computed: {
    runCustom() {
      return this.question.allowCustomTest &&
        (this.question.testCases.length == 0 || this.performCustom);
    },
    runPredefined() {
      return this.question.testCases.length > 0 &&
        (!this.question.allowCustomTest || !this.performCustom);
    }
  }
};
</script>

<style scoped>
.pre-output {
  width: 100%;
  color: black !important;
}

code.pre-output::before {
  content: "" !important;
  display: none;
}

code.pre-output::after {
  display: none;
}

.input-textarea{
  font-family: Consolas, "Courier New", monospace;
  font-weight: normal;
  font-size: 14px;
  font-feature-settings: "liga" 0, "calt" 0;
  line-height: 19px;
  letter-spacing: 0px;
}
</style>
