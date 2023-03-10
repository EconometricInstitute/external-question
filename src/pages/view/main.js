import Vue from 'vue'
import ExamView from './ExamView.vue'
import vuetify from '@/plugins/vuetify'
import store from '@/store'
import { processHashInStore } from '@/util/hashtools.js';

Vue.config.productionTip = false

processHashInStore(store);

new Vue({
  vuetify,
  store,
  render: h => h(ExamView)
}).$mount('#app')
