<!--
This file is part of External-Question.

External-Question is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

External-Question is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with External-Question. If not, see https://www.gnu.org/licenses/
-->

<template>
  <v-dialog v-model="visible" width="80em">
    <v-card>
      <v-card-title class="headline" primary-title>
        Import Question
      </v-card-title>
      <v-card-text>
        <v-alert v-if="currentQuestion" color="warning" >
          Importing a question will override any current data. Cancel this import to prevent losing the data of the current question in the editor.
        </v-alert>
        <v-container>
          <v-row>
            <v-col cols="4">
              <template v-if="questionList">
                <h3>Exam consisting of multiple questions detected. Select one question.</h3>
                <v-list class="choice-list overflow-y-auto">
                  <v-list-item-group v-model="choice">
                    <v-list-item two-line v-for="q in questionList" :key="q.uuid" @click="setChoice(q)">
                      <v-list-item-content>
                        <v-list-item-title>{{ q.name }}</v-list-item-title>
                        <v-list-item-subtitle>Question type: {{ q.type }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </template>
              <template v-else-if="questionData">
                <h3>Question imported</h3>
                <h5>Question Name: {{ questionData.name }}</h5>     
                <h5>Question type: {{ questionData.type }}</h5>
                <h5>Question uuid: {{ questionData.uuid }}</h5>
              </template>
              <template v-else>
                The format of the data could not be recognized. Please make sure you import a JSON file with the correct structure.
              </template>
            </v-col>
            <v-col cols="8">
              <div v-if="questionData">
                <h3>Question Preview
                  <span v-if="questionList">(uuid: {{ questionData.uuid }})</span>
                </h3>
                <hr />
                <div class="preview-pane">
                  <MarkdownDisplay :source="questionData.description" />
                </div>
              </div>
              <div v-else>
                <h3>Question Preview Panel (currently no data)</h3>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="yes()" color="primary">Import</v-btn>
        <v-btn @click="no()" color="secondary">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import MarkdownDisplay from '@/components/util/MarkdownDisplay';

export default {
  name: 'ImportDialog',
  components: {
    MarkdownDisplay
  },
  props: ['currentQuestion'],
  data: () => ({
    questionData: null,
    questionList: null,
    choice: null,
    visible: false
  }),
  methods: {
    show(importData) {
      if (importData.questions) {
        this.questionData= null;
        this.questionList = importData.questions;
      }
      else if (importData.uuid && importData.name && importData.type) {
        this.questionData = importData;
        this.questionList = null;
      }
      else {
        // Handle incorrect data
      }
      this.choice = null;
      this.visible = true;
    },
    setChoice(choice) {
      this.questionData = choice;
    },
    yes() {
      this.visible = false;
      this.$store.commit('setQuestion', this.questionData);
    },
    no() {
      this.visible = false;
    }
  },
};
</script>

<style scoped>
.choice-list {
  max-height: 30em;
}
.preview-pane {
  max-height: 30em;
  overflow-y: auto;
}
</style>