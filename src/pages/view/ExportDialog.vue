<!--
This file is part of External-Question.

External-Question is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

External-Question is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with External-Question. If not, see https://www.gnu.org/licenses/
-->

<template>
    <v-dialog width="60em" v-model="visible">
        <v-card>
        <v-card-title class="headline" primary-title>
            {{ config.exportTitle }}
        </v-card-title>
        <v-card-text>
            <v-alert type="info">
                {{ text }}
            </v-alert>
            <v-text-field readonly solo dense
                          :value="data"
                          label="Your answer"
                          v-if="config.type == 'code'"
            >
              <template v-slot:prepend-inner>
                  <v-icon @click="copy">mdi-content-copy</v-icon>
              </template>
            </v-text-field>
            <v-alert v-if="this.copied" type="success">
                {{ config.copiedText }}
            </v-alert>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <v-btn @click="download" v-if="config.type =='json' || config.type == 'file'">
                <v-icon>mdi-download</v-icon> Download
            </v-btn>
            <v-btn @click="copy" v-if="config.type == 'code'">
                <v-icon>mdi-content-copy</v-icon> Copy Answer
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn v-if="config.link && config.linkText" :href="link">
                <v-icon>mdi-link-variant</v-icon> {{ config.linkText }}
            </v-btn>
            <v-btn @click="close" color="secondary">Back to Exercise</v-btn>
        </v-card-actions>
        </v-card>
  </v-dialog>
</template>

<script>
import { copyText } from '@/util/clipboard.js';

export default {
  name: 'ExportDialog',
  props: [
    'config',
    'data'
  ],
  methods: {
    show() {
      this.visible = true;
      this.copied = false;
    },
    close() {
      this.visible = false;
    },  
    copy() {
        copyText(this.data);
        this.copied = true;
    },
    download() {
        if (this.data.contentType == 'text') {
            const element = document.createElement('a');
            element.setAttribute('href', 'data:application/data;charset=utf-8,' + encodeURIComponent(this.data.content));
            element.setAttribute('download', this.data.filename);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        }
        if (this.data.contentType == 'blob') {
            const element = document.createElement('a');
            element.href = window.URL.createObjectURL(this.data.content);
            element.download = this.data.filename;
            element.click();
            element.remove();
        }
    }
  },
  data: () => ({
    visible: false,
    copied: false
  }),
  computed: {
    text() {
        if (this.config.instructions && this.config.instructions.trim() != '') {
            return this.config.instructions;
        }
        if (this.config.type == 'code') {
            return 'The final answer code for this question can be found below.';
        }
        else if (this.config.type == 'json') {
            return 'Download your answer data as a .json file for your reference.';
        }
        return 'Download a file containing your answer data for your reference.';
    },
    copiedText() {
        return this.config.copiedText || 'Your answer was copied to the clipboard!';
    }
  }
};
</script>