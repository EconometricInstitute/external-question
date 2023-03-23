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
    }),
    methods: {
        updateFilename() {
            if (this.question?.name) {
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
            if (!this.value) {
                this.type = 'none';
            }
            else {
                this.type = this.value.type;
                this.buttonText = this.value.buttonText;
                this.exportTitle = this.value.exportTitle;
                this.instructions = this.value.instructions;
                this.filename = this.value.filename;
                this.copiedTex = this.value.copiedTex;
                this.useLink = this.value.link && this.value.linkText ? true : false;
                this.link = this.value.link;
                this.linkText = this.value.linkText;

            }
        },
        exportConfig() {
            this.$emit('input', this.exportConfig)
        }
    }
  };
</script>