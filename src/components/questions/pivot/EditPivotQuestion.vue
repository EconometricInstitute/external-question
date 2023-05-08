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
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Current Dataset ({{ dataset.length }} rows)</v-card-title>
          <v-card-text>
            <v-data-table :calculate-widths="true" :headers="headers" :items="dataset" class="elevation-1" />
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" text @click="importDataset"><v-icon>mdi-import</v-icon> Import Dataset</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Available Aggregators</v-card-title>
          <v-card-text>
            <v-container fluid>
              <v-row>
                <v-col cols="3" v-for="(aggregator,idx) of aggregators" :key="aggregator">
                  <v-checkbox
                    v-model="activeAggregators[idx]"
                    :label="aggregator"
                    :true-value="1"  
                    :false-value="0"
                    @change="changeActiveAggregators"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { AGGREGATORS, convertDataset } from './utils.js';

export default {
  name: 'EditPivotQuestion',
  props: [
    'value', 'focused'
  ],
  data: () => ({
    aggregators: AGGREGATORS,
    activeAggregators: new Array(AGGREGATORS.length).fill(1)
  }),
  methods: {
    importDataset() {
      console.log('This must still be implemented');
    },
    changeActiveAggregators() {
      this.value.aggregators = this.activeAggregators.join('');
      this.$emit('input', this.value);
    }
  },
  computed: {
    headers() {
      const rawHeader = this.value?.dataset?.header;
      const result = [];
      if (rawHeader) {
        for (const col of rawHeader) {
          result.push({text: col, value: col});
        }
      }
      return result;
    },
    dataset() {
      return convertDataset(this.value);
    }
  },
};
</script>

<style scoped>

</style>