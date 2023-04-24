<!--
This file is part of External-Question.

External-Question is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

External-Question is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with External-Question. If not, see https://www.gnu.org/licenses/
-->

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