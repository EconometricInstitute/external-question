<!--
This file is part of External-Question.

External-Question is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

External-Question is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with External-Question. If not, see https://www.gnu.org/licenses/
-->

<template>
  <v-card>
    <v-card-title class="headline" primary-title>
      New Question
    </v-card-title>
    <v-card-text>
      <h3>Choose a question type</h3>
      <!-- <v-radio-group v-model="type">
          <v-radio v-for="t in types" :key="'newQuestion-'+t" :value="t"
              :label="t" />
      </v-radio-group> -->
      <v-list>
        <v-list-item-group v-model="type">
          <v-list-item two-line v-for="t in types" :key="t">
            <v-list-item-content>
              <v-list-item-title>{{ t }}</v-list-item-title>
              <v-list-item-subtitle>{{  questionTypes[t].description }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn @click="addQuestion()" color="primary" :disabled="type == null">Create</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
import questionTypes from '@/components/questions';

export default {
  name: 'EditExamNewQuestionDialog',
  methods: {
    addQuestion() {
      this.$emit('choice', this.types[this.type]);
    }
  },
  data: () => ({
    type: null,
    types: Object.keys(questionTypes),
    questionTypes
  }),
};
</script>