<template>
  <v-form model="valid">
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-select label="Language" :items="languages" v-model="value.lang" required @input="valueChanged"/>
        </v-col>
      </v-row>
      <v-row cols="12">
          <v-col cols="12">
              <v-subheader>Files</v-subheader>
              <v-divider />
          </v-col>
      </v-row>
      <v-row>
          <v-col v-for="(file,index) in value.files" :key="'file-'+index">
              <v-card style="min-width: 35em" >
                  <v-card-text>
                      <v-text-field label="Filename" v-model="file.filename" required @input="valueChanged">
                      </v-text-field>
                      <v-textarea label="Default contents" v-model="file.content" required @input="valueChanged"/>
                  </v-card-text>
                  <v-card-actions>
                      <v-btn color="error" @click="removeFile(index)"><v-icon>mdi-delete</v-icon> Delete File</v-btn>            
                      <v-switch style="margin-left: 1em"
                                v-model="file.readOnly" inset dense
                                      :append-icon="file.readOnly ? 'mdi-lock-outline' : 'mdi-pencil'"
                                      :label="file.readOnly ? 'Read-Only' : 'Editable'">
                      </v-switch>
                  </v-card-actions>
              </v-card>
          </v-col>
      </v-row>
      <v-col cols="6">
          <v-btn color="primary" @click="addFile()">Add File</v-btn>
      </v-col>
        <v-row cols="12">
            <v-col cols="12">
                <v-subheader>Documentation</v-subheader>
                <v-divider />
            </v-col>
        </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field label="Reference URL" v-model="value.referenceUrl" @input="valueChanged"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
        <v-subheader>Runtime Configuration</v-subheader>
        <v-divider />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field label="Runner URL" v-model="value.runUrl" @input="valueChanged"/>
        </v-col>
        <v-col cols="6">
          <v-text-field label="Runner Token" v-model="value.runToken" @input="valueChanged"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <!-- TODO: this should be something more clever like a list editor -->
          <v-textarea rows="6" label="Testcases (as json)" :value="testCasesString" @input="updateTestCases" required />
        </v-col>
        <v-col cols="6">
          <v-text-field label="Main class" v-model="value.mainClass" required @input="valueChanged"/>
          <br />
          <v-select label="Allow custom test?" :items="[true, false]" 
            v-model="value.allowCustomTest" @input="valueChanged"/>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>

const LANGUAGES = ['c', 'cpp', 'csharp', 'css', 'html', 'java', 'javascript',
                   'julia', 'kotlin', 'markdown', 'pascal', 'python', 'r',
                   'ruby', 'rust', 'scala', 'sql', 'typescript', 'xml'];

const DEFAULT_PROPS = () => ({
      lang: 'java',
      files: [
          { 
            filename: 'Main.java', 
            content: `public class Main { \n \n }`
          }
      ],
      mainClass: 'Main',
      runUrl: '',
      runToken: '',
      testCases: [],
      allowCustomTest: true,
      referenceUrl: 'https://docs.oracle.com/javase/8/docs/api/index.html', 
    });

export default {
  name: 'EditMultiCodingQuestion',
  props: [
    'value', 'focused'
  ],
  created() {
    this.injectValues();
  },
  data: () => ({
    languages: LANGUAGES,
  }),
  methods: {
      injectValues() {
        const keys = Object.keys(this.value);
        for (let [key,val] of Object.entries(DEFAULT_PROPS())) {
          if (!keys.includes(key)) {
            this.value[key] = val;
          }
        }
      },
      addFile() {
          this.value.files.push({
              filename: '',
              content: '',
          });
          this.$emit('input', this.value);
      },
      removeFile(idx) {
          this.value.files.splice(idx, 1);
          this.$emit('input', this.value);
      },
    valueChanged() {
      this.$emit('input', this.value);
    },
    updateTestCases(value) {
      try {
        this.value.testCases = JSON.parse(value);
        this.$emit('input', this.value);
      }
      catch (err) {
        // TODO: do something with this error?
      }
    }
  },
  computed: {
    testCasesString() {
      return JSON.stringify(this.value.testCases);
    }
  },
};
</script>

<style scoped>
.editor {
  width: 100%;
  height: 100%;
}
.instructions {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.question-text {
  flex-grow: 1;
  overflow-y: auto;
}
</style>

<style>
.question-text pre code {
  color: black;
  width: 100%;
}
</style>
