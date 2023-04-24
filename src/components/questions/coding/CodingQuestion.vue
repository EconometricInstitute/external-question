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
    <div class="question-editor">
        <MonacoEditor class="editor" v-model="code" :language="question.lang"
        ref="editor" :options="editorOptions"/>
    </div>
    <div class="rhs">
      <div class="question-instruction">
          <MarkdownDisplay class="question-text" :source="question.description" />
      </div>
      <div class="question-toolbar">
        <v-btn @click.stop="$refs.runDialog.openRunDialog()" v-if="question.runUrl && !perusal">
          <v-icon>mdi-play</v-icon>
          Run
        </v-btn>
        <v-btn @click.stop="$refs.resetDialog.show()" v-if="!perusal">
          <v-icon>mdi-replay</v-icon>
          Reset
        </v-btn>
        <v-btn :href="question.referenceUrl" target="_blank" v-if="question.referenceUrl">
          <v-icon>mdi-book-open</v-icon>
          References
        </v-btn>
      </div>
    </div>
    <EditorRunDialog :code="code" :question="question" ref="runDialog">
    </EditorRunDialog>

    <ConfirmDialog ref="resetDialog" title="Reset your code" type="warning"
    text="This will delete your current work on this question and reset the code to the default. Use CTRL+Z to undo your last edits."
    :confirm="() => this.code = this.question.defaultAnswer" width="60em">
    </ConfirmDialog>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import MonacoEditor from 'vue-monaco';
//import VueMarkdownPlus from 'vue-markdown-plus';
import MarkdownDisplay from '@/components/util/MarkdownDisplay';
import EditorRunDialog from './EditorRunDialog';
import ConfirmDialog from '@/components/util/ConfirmDialog';

export default {
  name: 'CodingQuestion',
  props: [
    'question', 'focused', 'inputAnswer'
  ],
  components: {
    MonacoEditor,
    //VueMarkdownPlus,
    MarkdownDisplay,
    EditorRunDialog,
    ConfirmDialog
  },

  methods: {
    resize() {
      // TODO: this is a way to deal with a resizing bug in Monaco 0.20
      // Perhaps this can be removed in the future
      // See: https://github.com/microsoft/monaco-editor/issues/1878
      const editor = this.$refs.editor.getEditor();
      // First shrink to an empty editor, then layout automatically
      editor.layout({width: 0, height: 0});
      editor.layout();
    }
  },
  watch: {
    code(val,oldVal) {
      if (val != oldVal) {
        this.$emit('input', val);
      }
    },
    focused(v) {
      if (v) {
        this.resize();
      }
    },
    perusal(newVal) {
      this.editorOptions.readOnly = newVal;
    }
  },
  created() {
    // TODO: get rid of this when the question becomes a prop
    if (this.inputAnswer) {
      this.code = this.inputAnswer;
    }
    else if (this.question.defaultCode) {
      this.code = this.question.defaultCode;
    } else if (this.question.defaultAnswer) {
      this.code = this.question.defaultAnswer;
    }
    window.addEventListener("resize", this.resize);
  },
  destroyed() {
    window.removeEventListener("resize", this.resize);
  },
  data: () => ({
    code: "",
    editorOptionsBase: {
      scrollBeyondLastLine: false,
      minimap: {
        enabled: false
      },
    }
  }),
  computed: {
    editorOptions() {
      return {...this.editorOptionsBase, readOnly: this.perusal}
    },
    ...mapState(['perusal'])
  },
  /*
  computed: {
    question() {
      return {
        description: '# This is a question\n\nHello, this is some code\n```java\n\nSystem.out.println("Hoi");\nfor (int k=0; k < 3; k++) {}\n```\n\nCool toch?\n',
        filename: 'Test.java',
        defaultCode: 'public class Test {\n\tpublic static void main(String [] args) {\n\t\tSystem.out.println("Hello, world!");\n\t}\n}',
        lang: 'java',
        runUrl: 'http://localhost:8081/api/compileAndRun',
        runToken: '',
        mainClass: 'Test',
        testCases: ['Some test', 'Some other test'],
        allowCustomTest: true
      }
    }
  }
  */
};
</script>

<style scoped>
.editor {
  width: 100%;
  height: 100%;
}
.instructions {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.question-container {
  height: calc(100vh - 120px);
  display: flex;
  flex-direction: row;
}

.question-editor {
  /*flex-grow: 1;*/
  min-width: 55%;
  /*
  overflow: hidden;
  resize: horizontal;
  */
}

.question-instruction {
  overflow-y: scroll;
  flex-grow: 1;
  padding-left: 0.5em;
}

.question-toolbar {
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 9px;
}

.rhs {
  padding-left: 0.8em;
  border-left: solid 1px black;
  min-width: 15em;
  /*max-width: 50em*/
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
}


/*

// This is the css grid approach

.question-container {
  height: calc(100vh - 120px);
  width: 100%;
  display: grid;
  grid-template-columns: auto 40em;
  grid-template-rows: auto 5em;
  grid-template-areas:
     "editor instruction"
     "editor toolbar";
}

.question-editor {
  grid-area: editor;
}

.question-instruction {
  grid-area: instruction;
  overflow-y: scroll;
}

.question-toolbar {
  grid-area: toolbar;
}

*/

</style>

<style>
.question-text pre code {
  color: black;
  width: 100%;
}
</style>