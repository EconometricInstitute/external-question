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
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="secondary" v-bind="attrs" v-on="on"><v-icon>mdi-menu</v-icon> File</v-btn>
        </template>
        <v-list>
          <v-list-item @click="confirmClear" :disabled="question == null"><v-list-item-title>New Question</v-list-item-title></v-list-item>
          <v-list-item @click.stop="importQuestion" ><v-list-item-title>Import JSON File</v-list-item-title></v-list-item>
          <v-list-item @click="exportQuestion" :disabled="question == null"><v-list-item-title>Export JSON File</v-list-item-title></v-list-item>
          <v-list-item @click="remoteLink"><v-list-item-title>Create Remote Link</v-list-item-title></v-list-item>
        </v-list>
      </v-menu>
      <v-spacer></v-spacer>
      <h3>Edit Question</h3>
      <v-spacer></v-spacer>
      <v-btn color="secondary" dark v-if="saveUrl" @click="saveRemote">
        <v-icon>mdi-cloud-upload</v-icon> Save
      </v-btn>
      &nbsp;
      <v-btn color="secondary" dark :disabled="question == null" :href="'view.html#'+questionHash" target="_blank">
        <v-icon>mdi-eye</v-icon> Preview
      </v-btn>
      &nbsp;
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn :disabled="question == null" color="secondary" v-bind="attrs" v-on="on"><v-icon>mdi-export</v-icon> Export</v-btn>
        </template>
        <v-list>
          <v-list-item @click="copyText('en')" :disabled="question == null"><v-list-item-title>Copy Text (EN)</v-list-item-title></v-list-item>
          <v-list-item @click="copyText('nl')" :disabled="question == null"><v-list-item-title>Copy Text (NL)</v-list-item-title></v-list-item>
          <v-list-item @click="copyLink" :disabled="question == null"><v-list-item-title>Copy Link</v-list-item-title></v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-container v-if="question == null">
        <v-row class="d-flex justify-center align-center">
          <v-col cols="4">
            <NewQuestionCard @choice="type => newQuestion(type)"></NewQuestionCard>
          </v-col>
        </v-row>
      </v-container>
      <EditExamQuestion v-else :question="question" :focused="true"></EditExamQuestion>
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
    <RemoteLinkDialog ref="remoteLink" width="35em" />
    <ConfirmDialog ref="clearDialog" title="Create New Question" type="warning" width="35em"
    text="This will clear all current question data and create a new question from scratch"
    :confirm="clearQuestion" />
    <ImportDialog :currentQuestion="question != null" ref="importDialog" />
    <input style="display: none;" type="file" ref="fileInput" accept=".json" @change="importChosen" />
  </v-app>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
// import { Base64 } from 'js-base64';
import { pack } from '@/util/hashtools.js';
//import copyToClipboard from 'copy-to-clipboard';
import { copyHtml, copyText } from '@/util/clipboard.js';

import { mapState } from 'vuex';

import questionTypes from '@/components/questions';

import NewQuestionCard from './NewQuestionCard';
import EditExamQuestion from './EditExamQuestion';
import ImportDialog from './ImportDialog';
import RemoteLinkDialog from './RemoteLinkDialog.vue';

import ConfirmDialog from '@/components/util/ConfirmDialog';

export default {
  name: 'Edit',

  components: {
    NewQuestionCard,
    EditExamQuestion,
    ImportDialog,
    ConfirmDialog,
    RemoteLinkDialog,
  },
  data: () => ({
    snackbar: false,
    snackbarText: ''
  }),
  methods: {
    newQuestion(type) {
      const base = {
        uuid: uuidv4(),
        type,
        description: '# New Question\n\nWrite a description of the question here in Markdown.',
        defaultAnswer: null,
        name: 'New Question',
        showExitButton: false
      };
      const newQuestion = questionTypes[type].initialize(base);
      this.$store.commit('setQuestion', newQuestion);
    },
    confirmClear() {
      this.$refs.clearDialog.show();
    },
    remoteLink() {
      this.$refs.remoteLink.show();
    },
    clearQuestion() {
      this.$store.commit('setQuestion', null);
    },
    importQuestion() {
      this.$refs.fileInput.click();
    },
    importChosen(fileEvent) {
      if (fileEvent.target.files[0]) {
        const file = fileEvent.target.files[0];
        const reader = new FileReader();
        reader.onload = e => {
          try {
            const data = JSON.parse(e.target.result);
            this.$refs.importDialog.show(data);
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
    exportQuestion() {
      const name = this.question.name.replaceAll(/[^a-zA-Z0-9_-]+/g, '_');
      const filename = "question-" + name + ".json";
      const element = document.createElement('a');
      const body = JSON.stringify(this.question);
      element.setAttribute('href', 'data:application/json;charset=utf-8,'
        + encodeURIComponent(body));
      element.setAttribute('download', filename);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

    },
    copyLink() {
      //copyToClipboard(this.questionLink);
      copyText(this.questionLink);
      this.snackbar = true;
      this.snackbarText = 'Link copied to the clipboard. You can paste the link where it is needed.';
    },
    copyText(lang) {
      let text;
      if (lang && lang == 'nl') {
        text = `<p>U dient deze opdracht te maken op <a href="${this.questionLink}" target="_blank">een externe website</a>.`;
      }
      else {
        text = `<p>You have to make this assignment on <a href="${this.questionLink}" target="_blank">an external website</a>.`;
      }
      copyHtml(text);
      //copyToClipboard(text, { format: 'text/html'});
      this.snackbar = true;
      this.snackbarText = 'Text copied to the clipboard. You can paste this text for example into Ans or Canvas.';
    },
    saveRemote() {
      if (this.saveUrl) {
        fetch(this.saveUrl, {
          method: 'POST',
          body: JSON.stringify(this.question)
        })
        .then(resp => {
          // TODO: check if response was okay
          this.snackbar = true;
          if (resp.ok) {
            this.snackbarText = 'Question succesfully stored'
          }
          else {
            this.snackbarText = 'Error while storing the question. Response status: '+resp.status+' '+resp.statusText
          }
        })
        .catch(err => {
          this.snackbar = true;
            this.snackbarText = 'Error while storing the question. '+err;
        })
      }
    }
  },
  computed: {
    ...mapState(['question', 'saveUrl']),
    questionHash() {
      if (this.question == null) {
        return '';
      }
      //return Base64.encode(JSON.stringify(this.question));
      return pack(this.question);
    },
    questionLink() {
      const origin = window.location.origin;
      const pathsplit = window.location.pathname.split('/');
      pathsplit.pop();
      const path = pathsplit.join('/');
      return origin + path + '/view.html' + '#' + this.questionHash;
    }
  }
};
</script>
