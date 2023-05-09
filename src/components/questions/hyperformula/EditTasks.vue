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
    <v-card>
      <v-card-title>
        Tasks
      </v-card-title>
      <v-toolbar class="elevation-0">
        <v-btn @click="addTask" color="primary"><v-icon>mdi-plus</v-icon> Task</v-btn>
      </v-toolbar>
      <v-card-text v-if="value" class="d-flex">
        <v-card v-for="(task, index) in value" :key="'task-'+index" class="task-card">
          <v-card-title>Task {{ index + 1}}
            <v-spacer />
            <v-btn color="error" text @click="deleteTask(index)"><v-icon>mdi-delete</v-icon> Task</v-btn>
          </v-card-title>
          <v-card-text>
            <v-text-field outlined v-model="task.title" label="Title of the task" />
            <v-textarea outlined v-model="task.description" label="Description of task (markdown is supported)" />
            <v-select outlined :items="sheetnames" v-model="task.targetSheetName" label="Target sheet" />
            <v-text-field outlined v-model="task.targetCell" label="Target cell"/>
            <v-text-field outlined v-model="task.defaultFormula" label="Default formula provided to student" />
            <h4 v-if="task.copyTo && task.copyTo.length > 0">Formula will be copied to the following cells/ranges</h4>
            <h4 v-else>Formula not copied to other cells/ranges</h4>
            <br />
            <v-text-field outlined v-for="(_, copyIndex) in task.copyTo" label="Cell / Range" :key="'copyTo'+copyIndex" v-model="task.copyTo[copyIndex]">
                <template v-slot:append>
                    <v-icon color="error" @click="deleteCopyTo(index, copyIndex)">mdi-delete</v-icon>
                </template>
            </v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" text @click="addCopyTo(task)"><v-icon>mdi-plus</v-icon> Copy To</v-btn>
          </v-card-actions>
        </v-card>
      </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'EditAnswerSpec',
    props: [
        'value', 'sheetnames'
    ],
    methods: {
        addTask() {
            const tasks = this.value;
            tasks.push(
                { title: `Task ${tasks.length + 1}`,
                description: 'Write a formula for cell `A1` that does something useful',
                targetSheetName: this.sheetnames[this.currentTab],
                targetCell: 'A1',
                defaultFormula: '=0',
                copyTo: []
            });
        },
        deleteTask(index) {
            if (this.value) {
                this.value.splice(index, 1);
            }
        },
        addCopyTo(task) {
            if (task && task.copyTo) {
                task.copyTo.push('A1');
            }
        },
        deleteCopyTo(index, copyIndex) {
            this.value[index].copyTo.splice(copyIndex, 1);
        }
    },
    watch: {
        value() {
            this.$emit('input', this.value);
        }
    },
};
</script>

<style scoped>
div.task-card {
  margin-bottom: 1em;
  max-width: 50em;
  flex-grow: 1;
}
div.task-card:not(:first-child) {
  margin-left: 1em;
}

</style>