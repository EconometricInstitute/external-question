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
    <span class="value-display">
        <template v-if="data === undefined || data === null">
            <span class="missing-value">no value</span>
        </template>
        <template v-else-if="typeof data == 'string'">
            the string "<span class="string-value">{{ data }}</span>"
        </template>
        <template v-else-if="typeof data == 'number'">
            the number <span class="number-value">{{ data }}</span>
        </template>
        <template v-else-if="typeof data == 'boolean'">
            the boolean <span class="boolean-value">{{ data }}</span>
        </template>
        <template v-else-if="Array.isArray(data)">
            the list
            <table class="array-value">
                <tr>
                    <th class="array-value-header" scope="row">Position</th>
                    <td class="array-value-index" v-for="(_, index) in data" :key="'pos-'+index">
                        {{ index }}
                    </td>
                </tr>
                <tr>
                    <th class="array-value-header" scope="row">Value</th>
                    <td class="array-value-entry" v-for="(value, index) in data" :key="'value-'+index">
                        <ValueDisplay :data="value" />
                    </td>
                </tr>
            </table>
        </template>
        <template v-else-if="typeof data == 'function'">
            a function
        </template>
        <template v-else>
            an object
            <table class="object-value">
                <tr>
                    <th class="object-value-header" scope="row">Property</th>
                    <td class="object-value-key" v-for="key in Object.keys(data)" :key="'prop-'+key">
                        {{ key }}
                    </td>
                </tr>
                <tr>
                    <th class="object-value-header" scope="row">Value</th>
                    <td class="object-value-entry" v-for="[key, value] in Object.entries(data)" :key="'value-'+key">
                        <ValueDisplay :data="value" />
                    </td>
                </tr>
            </table>
        </template>
    </span>
</template>

<script>
export default {
    name: 'ValueDisplay',
    props: [
      'data'
    ],
    components: {
        ValueDisplay: this
    },
  };
</script>

<style scoped>
.value-display span, .value-display div{
    padding: 0;
}

.missing-value {
    font-family: monospace;
    color: #ff5252;
    font-weight: bolder;
    font-size: 120%;
}

.string-value {
	font-family: monospace;
	color: darkgreen;
	font-size: 110%;
}

.number-value {
	font-family: monospace;
	color: royalblue;
	font-size: 120%;
}

.boolean-value {
	font-family: monospace;
	font-weight: bold;
	color: darkmagenta;
	font-size: 120%;	
}

table.array-value, table.object-value {
  border-collapse: collapse;
  margin: 8px;
}

table.array-value, table.array-value tr, table.array-value td,
table.object-value, table.object-value tr, table.object-value td {
	border: 1px solid black;
}

.array-value-header, .object-value-header {
	font-weight: bold;
    padding-left: 0.5em;
    padding-right: 0.5em;
}

td.array-value-index, td.object-value-key {
  text-align: center;
}

td.array-value-entry, td.object-value-entry {
  padding: 0 0.2em 0 0.2em;
}
</style>