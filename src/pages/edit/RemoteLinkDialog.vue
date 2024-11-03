<!--
 * This file is part of External-Question.
 * It is a single page web static web-application for advanced exercises related to computer skills.
 * 
 * Copyright (C) 2024 Paul Bouman
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
          
        </v-card-title>
        <v-card-text>
          <div>
            This can be used to create a link that downloads the question content
            from the provided URL.
          </div>
          <v-text-field v-model="url"></v-text-field>
          <v-snackbar v-model="copyBar" centered>
            The question link was copied to the clipboard
            <template v-slot:action="{ attrs }">
                <v-btn color="primary"
                text
                v-bind="attrs"
                @click="copyBar = false">
                    OK
                </v-btn>
            </template>
      </v-snackbar>          
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <v-btn @click="copy()" color="primary">Copy</v-btn>
            <v-btn @click="copyClear()" color="primary">Copy and Clear</v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="close()" color="secondary">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  import { copyText } from '@/util/clipboard.js';
  import { pack } from '@/util/hashtools.js';
  
  export default {
    name: 'RemoteLinkDialog',
    props: [
      'width',
    ],
    methods: {
      show() {
        this.visible = true;
        this.url = '';
      },
      copy() {
        copyText(this.questionLink);
        this.copyBar = 2500;
      },
      copyClear() {
        this.copy();
        this.url = '';
      },
      close() {
        this.visible = false;
      }
    },
    data: () => ({
      visible: false,
      url: '',
      copyBar: 0
    }),
    computed: {
        questionLink() {
            const origin = window.location.origin;
            const pathsplit = window.location.pathname.split('/');
            pathsplit.pop();
            const path = pathsplit.join('/');
            const data = { type: 'redirect', url: this.url };
            const hash = pack(data);
            return origin + path + '/view.html' + '#' + hash;
        }
    }
  };
  </script>