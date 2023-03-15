import Vue from 'vue'
import ExamView from './ExamView.vue'
import vuetify from '@/plugins/vuetify'
import createStore from '@/store'
import { processHashInStore } from '@/util/hashtools.js';

Vue.config.productionTip = false

const store = createStore();

processHashInStore(store);

new Vue({
  vuetify,
  store,
  render: h => h(ExamView)
}).$mount('#app')
