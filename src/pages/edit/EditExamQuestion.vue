<template>
  <div class="fill-height">
    <v-tabs v-model="tab" class="fill-height" @change="updateTab()">
      <v-tab>General</v-tab>
      <v-tab>Description</v-tab>
      <v-tab>Specific</v-tab>
      <v-tabs-items v-model="tab" class="fill-height">

        <!-- Regular Question settings -->
        <v-tab-item eager>
          <v-form model="valid">
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-text-field label="Question UUID" :value="question.uuid" disabled required />
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
          <EditCodingQuestion v-if="question.type == 'coding'" :value="question" @input="updateQuestion"
            :focused="focused && tab == 2" />
          <EditMultiCodingQuestion v-else-if="question.type == 'multicoding'" :value="question" @input="updateQuestion"
            :focused="focused && tab == 2" />
          <!-- <EditSimpleQuestion v-else-if="question.type == 'simple'" :value="question" @input="updateQuestion"
            :focused="focused && tab == 2" /> -->
          <EditBlocklyQuestion v-else-if="question.type == 'blockly'" :value="question" @input="updateQuestion"
            :focused="focused && tab == 2" />
          <!-- <EditSpreadsheetQuestion v-else-if="question.type == 'spreadsheet'" :value="question" @input="updateQuestion"
            :focused="focused && tab == 2" />             -->
          <div v-else>
            The question type '{{question.type}}' is unknown.
          </div>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </div>
</template>

<script>
//import MonacoEditor from 'vue-monaco';
//import VueMarkdownPlus from 'vue-markdown-plus';
import MarkdownDisplay from '@/components/util/MarkdownDisplay';

// import CodeMirror
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/markdown/markdown.js'

import EditCodingQuestion from '@/components/questions/coding/EditCodingQuestion';
import EditMultiCodingQuestion from '@/components/questions/multicoding/EditMultiCodingQuestion';
//import EditSimpleQuestion from '@/components/questions/simple/EditSimpleQuestion';
import EditBlocklyQuestion from '@/components/questions/blockly/EditBlocklyQuestion';
//import EditSpreadsheetQuestion from '@/components/questions/spreadsheet/EditSpreadsheetQuestion';

export default {
  name: 'EditExamQuestion',
  props: [
    'question', 'index', 'focused'
  ],
  components: {
//    MonacoEditor,
//    VueMarkdownPlus,
    MarkdownDisplay,
    EditCodingQuestion,
    EditMultiCodingQuestion,
//    EditSimpleQuestion,
    EditBlocklyQuestion,
//    EditSpreadsheetQuestion,
    codemirror
  },
  data: () => ({
    tab: 0,
    editorOptions: {
        tabSize: 4,
        mode: 'text/x-markdown',
        lineNumbers: true,
        line: true,
        lineWrapping: true,
    },
  }),
  methods: {
    updateName(newVal) {
      const q = {...this.question, name: newVal};
      this.$store.commit('setQuestion', q);
    },
    updateDefaultAnswer(newVal) {
      const q = {...this.question, defaultAnswer: newVal};
      this.$store.commit('setQuestion', q);
    },
    updateDescription(newVal) {
      const q = {...this.question, description: newVal};
      this.$store.commit('setQuestion', q);
    },
    updateQuestion(newVal) {
      const q = {...this.question, ...newVal};
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
};
</script>

<style>
.editor div.CodeMirror {
  height: 75%;
}
</style>