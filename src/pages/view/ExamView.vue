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
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <template v-if="devModeActive">
        <v-btn class="mx-2" fab dark small color="secondary" :href="editUrl" target="_blank">
          <v-icon dark>mdi-pencil</v-icon>
        </v-btn>
        <v-btn v-if="devModeActive" class="mx-2" fab dark small color="secondary" @click="exportCurrentAnswer" >
          <v-icon dark>mdi-download</v-icon>
        </v-btn>
        <v-btn v-if="devModeActive" class="mx-2" fab dark small color="secondary" @click="importCurrentAnswer">
          <v-icon dark>mdi-import</v-icon>
        </v-btn>
        &nbsp;
      </template>    
      <h3>{{ questionName }}</h3>
      <v-spacer></v-spacer>
      <v-btn color="error" @click="restart">
        <v-icon>mdi-restart</v-icon>
        Restart
      </v-btn>
      <v-btn v-if="question?.exportConfig" :disable="!exportData" class="margin-left" color="secondary" @click="save">
        <v-icon>mdi-export</v-icon>
        {{ question?.exportConfig.buttonText }}
      </v-btn>
      <v-btn v-if="question?.showExitButton" class="margin-left" color="error" @click="exit">
        <v-icon>mdi-export</v-icon>
        Exit
      </v-btn>      
    </v-app-bar>

    <v-main>
      <v-container v-if="unknownType">
        <v-row>
          <v-col v-if="!loading">
            <v-alert color="error">
              <template v-if="loadError">
                <h3>Error while loading data</h3>
                <p>{{ loadError }}</p>  
              </template>
              <template v-else-if="questionType">
                <h3>Unknown question type: {{ questionType }}</h3>
              </template>
              <template v-else>
                <h3>No question data to display</h3>
              </template>
            </v-alert>
          </v-col>
          <v-col v-else>
            <v-progress-circular size="3em" color="primary" indeterminate />
            Loading question data
          </v-col>
        </v-row>
      </v-container>
      <component v-else
                 :is="questionType"
                 :question="question"
                 :focused="true"
                 :inputAnswer="answer"
                 @input="setAnswer"
                 ref="main"
      ></component>
      <v-snackbar centered v-model="snackbar" :timeout="3000">
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="primary"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>      
    </v-main>
    <SingletonOverlay />
    <ConfirmDialog
      ref="restart"
      :text="'This will clear your current answer and restart the question. \n\n You will lose all current work on this question.'"
      width="40em"
      type="error"
      :confirm="restartConfirmed"
    />
    <ConfirmDialog
      ref="exit"
      :text="'This will close this browser window. You have to reopen the link to this exercise to be able to return.\n\nAre you sure?'"
      width="40em"
      type="error"
      :confirm="exitConfirmed"
    />
    <ConfirmDialog
      v-if="devModeActive"
      ref="loadAnswer"
      :text="`The imported answer is for a different question with name ${loadAnswerQuestionName}. Importing it is at your own risk.\n\nAre you sure?`"
      width="40em"
      type="warning"
      :confirm="confirmLoadAnswer"
    />        
    <ExportDialog v-if="question?.exportConfig" :config="question?.exportConfig" :data="this.exportData" ref="exportDialog" />
    <input v-if="devModeActive" style="display: none;" type="file" ref="fileInputAnswer" :accept="question?.type+'.answer.json'" @change="importChosenAnswer" />    
  </v-app>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import SingletonOverlay from '@/components/SingletonOverlay.vue';
import ConfirmDialog from '@/components/util/ConfirmDialog.vue'
import ExportDialog from './ExportDialog.vue';

import { types, exportAnswer } from '@/components/questions';
const questionComponents = Object.fromEntries(Object.entries(types).map(([key, value]) => [key, value.view]))

export default {
  name: 'ExamView',

  components: {
    ...questionComponents,
    SingletonOverlay,
    ConfirmDialog,
    ExportDialog
  },

  data: () => ({
    exportData: null,
    snackbar: false,
    snackbarText: '',
    loadAnswer: null,
    loadAnswerQuestionName: '',
  }),
  methods: {
    setAnswer(ans) {
      //console.log(ans);
      this.$store.commit('setAnswer', ans);
    },
    restart() {
      this.$refs.restart.show();
    },
    restartConfirmed() {
      this.$store.commit('setAnswer', null);
      window.location.reload();
    },
    exit() {
      this.$refs.exit.show();
    },
    exitConfirmed() {
      window.close();
    },
    save() {
      exportAnswer(this.question, this.answer, this.$refs.main)
      .then(result => {
        this.exportData = result;
        this.$refs.exportDialog.show();
      })
      .catch(err => {
        // TODO: expose the error to the user
        console.log(err);
      })
    },
    exportCurrentAnswer() {
        const data = JSON.stringify({answer: this.answer, uuid: this.question.uuid, type: this.question.type, name: this.question.name});
        const element = document.createElement('a');
        const now = new Date();
        const filename =  this.question.name.replaceAll(/[^a-zA-Z0-9_-]+/g, '_')
          + '-' + `${now.getFullYear()}_${now.getMonth()}_${now.getDay()}_${now.getHours()}_${now.getMinutes()}`
          + '.' + this.question.type + '.answer.json';
        element.setAttribute('href', 'data:application/data;charset=utf-8,' + encodeURIComponent(data));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    },
    importCurrentAnswer() {
      this.loadAnswer = null;
      this.$refs.fileInputAnswer.click();
    },
    importChosenAnswer(fileEvent) {
      if (fileEvent.target.files[0]) {
        const file = fileEvent.target.files[0];
        const reader = new FileReader();
        reader.onload = e => {
          try {
            const data = JSON.parse(e.target.result);
            if (!data.answer) {
              this.snackbar = true;
              this.snackbarText = 'The imported file does not contain a proper answer. Make sure you open the correct file.\n';
              return;
            }
            this.loadAnswer = data.answer;
            if (data.uuid == this.question.uuid) {
              this.confirmLoadAnswer();
            }
            else if (data.type == this.question.type) {
              this.loadAnswer = data.answer;
              this.$refs.loadAnswer.show();
            }
            else {
              this.snackbar = true;
              this.snackbarText = 'The imported file contains an answer for a different question type. The answers are not compatible.\n';
            }
          }
          catch(err) {
            console.log(err);
            this.snackbar = true;
            this.snackbarText = 'An error occurred while importing the file.\n'+err;
          }
        }
        reader.readAsText(file);
      }
    },
    confirmLoadAnswer() {
      this.setAnswer(this.loadAnswer);
      window.location.reload();
    }
  },
  computed: {
    ...mapState(['question', 'loadError', 'answer', 'loading']),
    ...mapGetters(['questionName', 'questionType']),
    unknownType() {
      return !types[this.questionType];
    },
    devModeActive() {
      if (!(this.question?.examMode) && window?.localStorage?.DEV_MODE_ACTIVE) {
        return true;
      }
      return false;
    },
    editUrl() {
      const loc = window.location;
      const path = loc.pathname;
      const altPath = path.substring(0, path.length - 9) + 'edit.html';
      return `${loc.protocol}//${loc.host}${altPath}${loc.search}${loc.hash}`;
    }
  }
};
</script>

<style scoped>
  .margin-left {
    margin-left: 0.5em;
  }
</style>