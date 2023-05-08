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
      <VuePivottableUi
        :data="dataset"
        :aggregators="activeAggregators"
      />
    </div>
    <div class="rhs">
      <MarkdownDisplay class="question-text" :source="question.description" />
    </div>
  </div>
</template>

<script>
import MarkdownDisplay from '@/components/util/MarkdownDisplay';
import { VuePivottableUi, PivotUtilities } from 'vue-pivottable'
import 'vue-pivottable/dist/vue-pivottable.css';

import { AGGREGATORS, convertDataset } from './utils.js';

export default {
  name: 'PivotQuestion',
  props: [
    'question', 'focused', 'inputAnswer'
  ],
  components: {
    MarkdownDisplay,
    VuePivottableUi
  },

  methods: {
  },
  watch: {
  },
  data: () => ({
  }),
  computed: {
    dataset() {
      return convertDataset(this.question);
    },
    activeAggregators() {
      const result = {...PivotUtilities.aggregators};
      console.log(this.question);
      if (this.question?.aggregators) {
        const active = this.question?.aggregators.split('');
        for (let i=0; i < active.length; i++) {
          if (active[i] == '0') {
            const name = AGGREGATORS[i];
            delete result[name];
          }
        }
      }
      return result;
    }
  },
};
</script>

<style scoped>
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

.rhs {
  padding-left: 0.8em;
  border-left: solid 1px black;
  min-width: 50em;
  /*max-width: 50em*/
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
}

</style>

<style>
.question-text pre code {
  color: black;
  width: 100%;
}
</style>