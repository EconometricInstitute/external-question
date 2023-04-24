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
      <v-tabs v-model="currentTab" class="question-tabs">
        <v-tab v-for="(file, index) in question.files" :key="'file-'+index" class="question-tab">
          {{file.filename}}
          <v-icon v-if="file.readOnly" dense>mdi-lock-outline</v-icon>
        </v-tab>
      </v-tabs>
      <MonacoEditor v-for="(file,index) in question.files" :key="'file-editor'+index"
                    class="editor" v-model="code[file.filename]" :language="question.lang"
                    ref="editor" :options="editorOptions[index]" v-show="currentTab == index"
                    @change="codeChanged"/>
    </div>
    <div class="rhs">
      <div class="question-instruction">
          <MarkdownDisplay class="question-text" :source="question.description" />
      </div>
      <div class="question-toolbar">
        <v-btn @click.stop="$refs.runDialog.openRunDialog()" v-if="question.runUrl">
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
    <EditorMultiRunDialog :code="code" :question="question" ref="runDialog">
    </EditorMultiRunDialog>

    <ConfirmDialog ref="resetDialog" title="Reset your code" type="warning"
    text="This will delete your current work on (one or all files of) this question and reset the code to the default. Use CTRL+Z if you only want to undo your last edits."
    :buttons="resetButtons" width="60em">
    </ConfirmDialog>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import MonacoEditor from 'vue-monaco';
//import VueMarkdownPlus from 'vue-markdown-plus';
import MarkdownDisplay from '@/components/util/MarkdownDisplay';
import EditorMultiRunDialog from './EditorMultiRunDialog';
import ConfirmDialog from '@/components/util/ConfirmDialog';

export default {
  name: 'MultiCodingQuestion',
  props: [
    'question', 'focused', 'inputAnswer'
  ],
  components: {
    MonacoEditor,
    //VueMarkdownPlus,
    MarkdownDisplay,
    EditorMultiRunDialog,
    ConfirmDialog
  },
  methods: {
    resize() {
      // TODO: this is a way to deal with a resizing bug in Monaco 0.20
      // Perhaps this can be removed in the future
      // See: https://github.com/microsoft/monaco-editor/issues/1878
        // First shrink to an empty editor, then layout automatically
      const editor = this.$refs.editor[this.currentTab].getEditor();
      editor.layout({width: 0, height: 0});
      editor.layout();
    },
    codeChanged() {
      //const result = {};
      //this.question.files.forEach((f,i) => result[f.filename] = this.code[i]);
      this.$emit('input', {...this.code});
    },
    reset(single) {
        if (single) {
          const currentFile = this.question.files[this.currentTab];
          this.$set(this.code, currentFile.filename, currentFile.content);
        }
        else {
          this.question.files.forEach((f) => this.$set(this.code, f.filename, f.content));
        }
    }
  },
  watch: {
    focused(v) {
      if (v) {
        this.resize();
      }
    },
    currentTab() {
      this.$nextTick(this.resize);
    },
  },
  created() {
    // TODO: get rid of this when the question becomes a prop
    if (this.inputAnswer) {
      this.code = this.inputAnswer;
    }
    else {
      const obj = {};
      for (let f of this.question.files) {
        obj[f.filename] = f.content;
      }
      this.code = obj;
    }
    window.addEventListener("resize", this.resize);
  },
  destroyed() {
    window.removeEventListener("resize", this.resize);
  },
  data: () => ({
    currentTab: 0,  
    code: [],
    editorOptionsBase: {
      scrollBeyondLastLine: false,
      minimap: {
        enabled: false
      }
    }
  }),
  computed: {
    editorOptions() {
      return this.question.files.map(file =>
        ({...this.editorOptionsBase,
          readOnly: this.perusal || file.readOnly})
      );
    },
    resetButtons() {
      return [{label: 'Yes (Current File Only)', action: () => this.reset(true), color: 'primary'},
              {label: 'Yes (All Files)', action: () => this.reset(), color: 'primary'}
             ];
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
  flex-grow: 1;
  width: 100%;
  /*height: calc(100% - 48px);*/
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
  flex-grow: 1;
}

.question-tab {
   text-transform: none;
}

.question-tabs {
   flex-grow: 0;
}

.question-editor {
  display: flex;
  flex-direction: column;
  /*flex-grow: 2;*/
  min-width: 55%;
  /*
  overflow: hidden;
  resize: horizontal;
  */
}

.v-tabs {
    flex-grow: 0;
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
  /*max-width: 50em;*/
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
