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
      <h3>{{ questionName }}</h3>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <MultiCodingQuestion v-if="questionType == 'multicoding'" :question="question" :focused="true"></MultiCodingQuestion>
      <CodingQuestion v-else-if="questionType == 'coding'" :question="question" :focused="true"></CodingQuestion>
      <BlocklyQuestion v-else-if="questionType == 'blockly'" :question="question" :focused="true"></BlocklyQuestion>
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
import BlocklyQuestion from '@/components/questions/blockly/BlocklyQuestion';

export default {
  name: 'App',

  components: {
    CodingQuestion,
    MultiCodingQuestion,
    BlocklyQuestion
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
