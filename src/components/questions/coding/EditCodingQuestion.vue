<template>
  <v-form model="valid">
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-select label="Language" :items="languages" v-model="value.lang" required @input="valueChanged" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field label="Filename" v-model="value.filename" required @input="valueChanged"/>
        </v-col>
        <v-col cols="6">
          <v-text-field label="Reference URL" v-model="value.referenceUrl" @input="valueChanged"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-textarea rows="6" label="Default answer" v-model="value.defaultAnswer" required @input="valueChanged"/>
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
          <v-textarea rows="6" label="Testcases (as json)" :value="testCasesString" required @input="updateTestCases"/>
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

export default {
  name: 'EditCodingQuestion',
  props: [
    'value', 'focused'
  ],
  data: () => ({
    languages: LANGUAGES
  }),
  methods: {
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