<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <h3>{{ questionName }}</h3>
      <v-spacer></v-spacer>
      <v-btn color="error" @click="restart">
        <v-icon>mdi-restart</v-icon>
        Restart
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
  </v-app>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import SingletonOverlay from '@/components/SingletonOverlay.vue';
import ConfirmDialog from '@/components/util/ConfirmDialog.vue'

import types from '@/components/questions';
const questionComponents = Object.fromEntries(Object.entries(types).map(([key, value]) => [key, value.view]))

export default {
  name: 'ExamView',

  components: {
    ...questionComponents,
    SingletonOverlay,
    ConfirmDialog
  },

  data: () => ({
    //
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
    }
  },

  computed: {
    ...mapState(['question', 'loadError', 'answer']),
    ...mapGetters(['questionName', 'questionType']),
    unknownType() {
      return !types[this.questionType];
    }
  }
};
</script>
