<!--
This file is part of External-Question.

External-Question is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

External-Question is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with External-Question. If not, see https://www.gnu.org/licenses/
-->

<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-btn v-if="devModeActive" class="mx-2" fab dark small color="secondary" :href="editUrl" target="_blank">
        <v-icon dark>mdi-pencil</v-icon>
      </v-btn>
      <h3>{{ questionName }}</h3>
      <v-spacer></v-spacer>
      <v-btn color="error" @click="restart">
        <v-icon>mdi-restart</v-icon>
        Restart
      </v-btn>
      <v-btn v-if="question.exportConfig" :disable="!exportData" class="margin-left" color="secondary" @click="save">
        <v-icon>mdi-export</v-icon>
        {{ question.exportConfig.buttonText }}
      </v-btn>
      <v-btn v-if="question.showExitButton" class="margin-left" color="error" @click="exit">
        <v-icon>mdi-export</v-icon>
        Exit
      </v-btn>      
    </v-app-bar>

    <v-main>
      <v-container v-if="unknownType">
        <v-row>
          <v-col>
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
    <ExportDialog v-if="question.exportConfig" :config="question.exportConfig" :data="this.exportData" ref="exportDialog" />
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
    exportData: null
  }),

  methods: {
    setAnswer(ans) {
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
    }
  },

  computed: {
    ...mapState(['question', 'loadError', 'answer']),
    ...mapGetters(['questionName', 'questionType']),
    unknownType() {
      return !types[this.questionType];
    },
    devModeActive() {
      if (window?.localStorage?.DEV_MODE_ACTIVE) {
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