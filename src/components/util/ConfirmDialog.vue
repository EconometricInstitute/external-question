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
  <v-dialog :width="width" v-model="visible">
    <v-card>
      <v-card-title class="headline" primary-title>
        {{title}}
      </v-card-title>
      <v-card-text>
        <v-alert :type="type">
          <MarkdownDisplay :source="text" />
        </v-alert>
        <div>
          Are you sure you want to continue?
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if="confirm" @click="yes()" color="primary">Yes</v-btn>
        <template v-if="buttons">
          <v-btn v-for="(b,i) in buttons" :key="i" :color="b.color" @click="yes(i)">{{b.label}}</v-btn>
        </template>
        <v-btn @click="no()" color="secondary">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import MarkdownDisplay from '@/components/util/MarkdownDisplay.vue';

export default {
  name: 'ConfirmDialog',
  components: { MarkdownDisplay },
  props: [
    'width',
    'title',
    'type',
    'text',
    'confirm',
    'buttons'
  ],
  methods: {
    show() {
      this.visible = true;
    },
    yes(i) {
      this.visible = false;
      if (i || i === 0) {
        this.buttons[i].action();
      }
      else {
        this.confirm();
      }
    },
    no() {
      this.visible = false;
    }
  },
  data: () => ({
    visible: false
  }),
};
</script>