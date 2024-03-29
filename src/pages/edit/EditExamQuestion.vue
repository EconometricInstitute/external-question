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
  <div class="fill-height">
    <v-tabs v-model="tab" class="fill-height" @change="updateTab()">
      <v-tab>General</v-tab>
      <v-tab>Description</v-tab>
      <v-tab>Specific</v-tab>
      <v-tab>Wrap-up</v-tab>
      <v-tabs-items v-model="tab" class="fill-height">

        <!-- Regular Question settings -->
        <v-tab-item eager>
          <v-form model="valid">
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-text-field label="Question UUID" :value="question.uuid" disabled required />
                  <v-checkbox v-model="uuidFixed" label="UUID Fixed" />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-text-field label="Question Type" :value="question.type" disabled required />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-text-field label="Question Name" :value="question.name" required @input="updateName"/>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-checkbox v-model="question.showExitButton" label="Show exit button" />
                </v-col>
              </v-row>              
            </v-container>
          </v-form>
        </v-tab-item>

        <!-- Question Description -->
        <v-tab-item class="fill-height">
        <v-container class="fill-height">
          <v-row class="fill-height">
            <v-col cols="6" class="fill-height">
              <codemirror class="fill-height editor" ref="editor" :value="question.description" :options="editorOptions" @input="updateDescription"/>
            </v-col>
            <v-col cols="6" style="fill-height">
              <MarkdownDisplay :source="question.description" />
            </v-col>
          </v-row>
        </v-container>
        </v-tab-item>

        <!-- Question Type Specific -->
        <v-tab-item eager class="fill-height">
          <v-container v-if="unknownType">
            <v-row>
              <v-col>
                  <v-alert type="error">
                    <h3>Unknown question type: {{ question.type }}</h3>
                </v-alert>
              </v-col>
            </v-row>
          </v-container>          
          <component v-else
                 :is="question.type"
                 :value="question"
                 :focused="tab == 2"
                 @input="updateQuestion"
                 ref="main"
          ></component>
        </v-tab-item>
        <v-tab-item eager class="fill-height">
          <ExportConfigTab v-model="question.exportConfig" :question="question" />
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
//import MonacoEditor from 'vue-monaco';
//import VueMarkdownPlus from 'vue-markdown-plus';
import MarkdownDisplay from '@/components/util/MarkdownDisplay';

// import CodeMirror
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/markdown/markdown.js'

import { types } from '@/components/questions';
const questionEditors = Object.fromEntries(Object.entries(types).map(([key, value]) => [key, value.edit]))

import ExportConfigTab from './ExportConfigTab.vue';

export default {
  name: 'EditExamQuestion',
  props: [
    'question', 'index', 'focused'
  ],
  components: {
    MarkdownDisplay,
    ExportConfigTab,
    codemirror,
    ...questionEditors
  },
  data: () => ({
    tab: 0,
    uuidFixed: false,
    editorOptions: {
        tabSize: 4,
        mode: 'text/x-markdown',
        lineNumbers: true,
        line: true,
        lineWrapping: true,
    },
  }),
  methods: {
    updateUuid(q) {
      if (!this.uuidFixed) {
        q.uuid = uuidv4();
      }
    },
    updateName(newVal) {
      const q = {...this.question, name: newVal};
      this.updateUuid(q);
      this.$store.commit('setQuestion', q);
      document.title = newVal;
    },
    updateDefaultAnswer(newVal) {
      const q = {...this.question, defaultAnswer: newVal};
      this.updateUuid(q);
      this.$store.commit('setQuestion', q);
    },
    updateDescription(newVal) {
      const q = {...this.question, description: newVal};
      this.updateUuid(q);
      this.$store.commit('setQuestion', q);
    },
    updateQuestion(newVal) {
      const q = {...this.question, ...newVal};
      this.updateUuid(q);
      this.$store.commit('setQuestion', q);
    },
    updateTab() {
      this.$nextTick(() => {
        console.log('hi!', this.$refs);
        console.log(Object.keys(this.$refs));
        if (this.$refs.editor) {
          console.log(this.$refs.editor);
          this.$refs.editor.refresh();
          // this.$refs.editor.setSize('100%', '100%');
        }
      })
    }
  },
  computed: {
    unknownType() {
      return !types[this.question.type];
    },
  }
};
</script>

<style>
.editor div.CodeMirror {
  height: 75%;
}
</style>