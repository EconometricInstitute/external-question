<template>
    <v-overlay :value="!hasFocus" :opacity="0.95">
        <v-card>
            <v-card-title>Multiple Tabs</v-card-title>
            <v-card-text>
                You opened this question in another tab.
                <br />
                Please continue working for the other tab, or reload this tab.
            </v-card-text>
            <v-card-actions>
                <v-btn class="margin-center" color="primary" @click="requestFocus">
                    <v-icon>mdi-refresh</v-icon>
                    Reload this tab
                </v-btn>
            </v-card-actions>
        </v-card>

        <!-- <v-container class="time-overlay">
            <v-row justify="center">
                <v-col cols="6">
                <div class="display-1">You opened this question in another tab.</div>
                <div>Please continue working for the other tab, or reload this tab.</div>
                <br />
                <v-btn class="margin-center" color="primary" @click="requestFocus">
                    <v-icon>mdi-refresh</v-icon>
                    Reload this tab
                </v-btn>
                </v-col>
            </v-row>
        </v-container> -->
    </v-overlay>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'SingletonOverlay',

  methods: {
    requestFocus() {
      window.location.reload();
    }
  },

  computed: {
    ...mapState(['hasFocus']),
  }
};
</script>

<style scoped>

</style>