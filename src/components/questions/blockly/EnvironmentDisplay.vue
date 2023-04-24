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
    <div class="displayEnv">
        <ul v-if="data">
            <li v-for="[varname, value] of Object.entries(data)" :key="varname">
                <div class="variable">
                    <template v-if="compare">
                        <v-icon v-if="compare[varname]" color="success">mdi-check</v-icon>
                        <v-icon v-else color="error">mdi-alert-circle</v-icon>
                    </template>
                    A variable with name <code class="varname">{{ varname }}</code>
                    which holds
                    <ValueDisplay :data="value" />
                    <template v-if="compare && !compare[varname]">
                        but for which the expected value is
                        <ValueDisplay :data="reference[varname]" />
                    </template>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import ValueDisplay from './ValueDisplay.vue';

export default {
    name: 'EnvironmentDisplay',
    props: [
      'data',
      'reference',
      'compare'
    ],
    components: {
      ValueDisplay
    },
  };
</script>
  
<style scoped>
.varname {
	font-family: monospace;
	font-weight: bold;
	font-size: 130%;
	background-color: whitesmoke;
    padding: 0;
    display: inline;
}
</style>