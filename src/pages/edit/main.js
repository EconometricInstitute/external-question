import Vue from 'vue'
import Edit from './Edit.vue'
import vuetify from '@/plugins/vuetify'
import store from '@/store'
import { processHashInStore } from '@/util/hashtools.js';

Vue.config.productionTip = false

processHashInStore(store);

new Vue({
  vuetify,
  store,
  render: h => h(Edit)
}).$mount('#app')
