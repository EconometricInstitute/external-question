<template>
    <div>
        <h4>The following answer code was computed. Click <v-icon @click="copyAnswerCode">mdi-content-copy</v-icon> to copy it to the clipboard</h4>
        <v-text-field class="answercode-box"
                        readonly solo dense
                        :value="answerCode"
        >
            <template v-slot:prepend-inner>
                <v-icon @click="copyAnswerCode">mdi-content-copy</v-icon>
            </template>
        </v-text-field>
        <v-snackbar v-model="copyBar" centered>
            The answer code was copied to the clipboard
            <template v-slot:action="{ attrs }">
                <v-btn color="primary"
                text
                v-bind="attrs"
                @click="copyBar = false">
                    OK
                </v-btn>
            </template>
      </v-snackbar>

    </div>
</template>
<script>
import { copyText } from '@/util/clipboard.js';

export default {
    props: ['answerCode'],
    data: () => ({
        copyBar: false
    }),
    methods: {
        copyAnswerCode() {
            copyText(this.answerCode);
            this.copyBar = true;
        },
    }
}
</script>
<style scoped>

</style>