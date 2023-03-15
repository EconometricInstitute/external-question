<template>
  <v-dialog :width="width" v-model="visible">
    <v-card>
      <v-card-title class="headline" primary-title>
        {{title}}
      </v-card-title>
      <v-card-text>
        <v-alert :type="type">
          <MarkdownDisplay :source="text" />
        </v-alert>
        <div>
          Are you sure you want to continue?
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if="confirm" @click="yes()" color="primary">Yes</v-btn>
        <template v-if="buttons">
          <v-btn v-for="(b,i) in buttons" :key="i" :color="b.color" @click="yes(i)">{{b.label}}</v-btn>
        </template>
        <v-btn @click="no()" color="secondary">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import MarkdownDisplay from '@/components/util/MarkdownDisplay.vue';

export default {
  name: 'ConfirmDialog',
  components: { MarkdownDisplay },
  props: [
    'width',
    'title',
    'type',
    'text',
    'confirm',
    'buttons'
  ],
  methods: {
    show() {
      this.visible = true;
    },
    yes(i) {
      this.visible = false;
      if (i || i === 0) {
        this.buttons[i].action();
      }
      else {
        this.confirm();
      }
    },
    no() {
      this.visible = false;
    }
  },
  data: () => ({
    visible: false
  }),
};
</script>