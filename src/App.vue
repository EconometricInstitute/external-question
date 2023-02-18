<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <h3>{{ questionName }}</h3>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <MultiCodingQuestion v-if="questionType == 'multicoding'" :question="question" :focused="true"></MultiCodingQuestion>
      <CodingQuestion v-else-if="questionType == 'coding'" :question="question" :focused="true"></CodingQuestion>
      <v-container v-else>
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
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import CodingQuestion from '@/components/questions/coding/CodingQuestion';
import MultiCodingQuestion from '@/components/questions/multicoding/MultiCodingQuestion'

export default {
  name: 'App',

  components: {
    CodingQuestion,
    MultiCodingQuestion
  },

  data: () => ({
    //
  }),

  computed: {
    ...mapState(['question', 'loadError']),
    ...mapGetters(['questionName', 'questionType'])
  }
};
</script>
