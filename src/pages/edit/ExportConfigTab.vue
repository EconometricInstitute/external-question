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
                <h4>Student Export Configuration</h4>
                <v-radio-group v-model="type">
                    <v-radio label="No export" value="none" />
                    <v-radio label="Answer code" value="code" />
                    <v-radio label="JSON file" value="json" />
                    <v-radio label="File Download" value="file" />
                </v-radio-group>
            </v-col>
        </v-row>
        <template v-if="type != 'none'">
            <v-row >
                <v-col>
                    <h4>Interface Configuration</h4>
                    <v-text-field label="Export Button Text" v-model="buttonText" />                    
                    <v-text-field label="Export Dialog Title" v-model="exportTitle" />                    
                </v-col>
            </v-row>
            <v-row >
                <v-col>
                    <h4>Custom Instructions</h4>
                    <v-textarea rows="4" label="Custom Instructions" v-model="instructions" />                    
                </v-col>
            </v-row>                    
            <v-row v-if="type == 'json' || type == 'file'">
                <v-col>
                    <h4>Filename of downloaded file</h4>
                    <v-text-field label="Filename" v-model="filename" />
                </v-col>
            </v-row>
            <v-row v-if="type == 'code'">
                <v-col>
                    <h4>Answer Copy Configuration</h4>
                    <v-text-field label="Text after student copies answer" v-model="copiedText" />
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <h4>Wrap-up Link Configuration</h4>
                    <v-checkbox :value="linkActive" @change="setLinkActive" label="Provide link"></v-checkbox>
                    <v-text-field
                        :disabled="!linkActive"
                        label="URL of link for student to follow"
                        v-model="link"
                        placeholder="https://www.wikipedia.org"
                    />
                    <v-text-field
                        :disabled="!linkActive"
                        label="Link text for link button"
                        v-model="linkText"
                        placeholder="Go to Wikipedia"
                    />
                </v-col>
            </v-row>
        </template>
    </v-container>
</template>

<script>
import { getDefaultExtension } from '@/components/questions';

export default {
    name: 'ExportConfigTab',
    props: [
      'question',
      'value'
    ],
    data: () => ({
        type: 'none',
        buttonText: 'Save Answer',
        exportTitle: 'Save Answer',
        instructions: '',
        filename: 'my-result.answer.json',
        copiedText: 'Your answer was copied to the clipboard!',
        linkActive: false,
        link: '',
        linkText: '',
        loaded: false
    }),
    created() {
        this.loaded = false;
        if (this.value) {
            const value = this.value;
            this.type = value?.type || 'none';
            this.buttonText = value?.buttonText || 'Save Answer';
            this.exportTitle = value?.exportTitle || 'Save Answer';
            this.instructions = value?.instructions || '';
            this.filename = value?.filename || 'my-result.answer.json';
            this.linkActive = value.linkActive ? true : false;
            this.link = value?.link || '';
            this.linkText = value?.linkText || '';
        }
        this.$nextTick(() => this.loaded = true);
    },
    methods: {
        updateFilename() {
            if (this.loaded && this.question?.name) {
                this.filename = this.question.name.replaceAll(/[^A-Za-z0-9_-]/g,'');
                if (this.type == 'file') {
                    this.filename += getDefaultExtension(this.question);
                }
                else {
                    this.filename += '.answer.json';
                }
            }
        },
        setLinkActive(newVal) {
            this.linkActive = newVal;
            console.log(newVal);
        }
    },
    computed: {
        exportConfig() {
            if (this.type == 'none') {
                return null;
            }
            return {
                type: this.type,
                buttonText: this.buttonText,
                exportTitle: this.exportTitle,
                instructions: this.instructions,
                filename: this.filename,
                link: this.linkActive ? this.link : '',
                linkText: this.linkActive ?  this.linkText : ''
            }
        },
        questionName() {
            return this.question?.name;
        }
    },
    watch: {
        type() {
            this.updateFilename();
        },
        questionName() {
            this.updateFilename();
        },
        value() {
            this.loaded = false;
            if (!this.value) {
                this.type = 'none';
            }
            else {
                this.type = this.value.type;
                this.buttonText = this.value.buttonText;
                this.exportTitle = this.value.exportTitle;
                this.instructions = this.value.instructions;
                this.filename = this.value.filename;
                this.copiedText = this.value.copiedText;
                this.useLink = this.value.link && this.value.linkText ? true : false;
                this.link = this.value.link;
                this.linkText = this.value.linkText;
            }
            this.$nextTick(() => this.loaded = true);
        },
        exportConfig() {
            this.$emit('input', this.exportConfig)
        }
    }
  };
</script>