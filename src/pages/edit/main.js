import Vue from 'vue'
import Edit from './Edit.vue'
import vuetify from '@/plugins/vuetify'
import createStore from '@/store'
import { processHashInStore } from '@/util/hashtools.js';

Vue.config.productionTip = false

const store = createStore([]);

processHashInStore(store);

new Vue({
  vuetify,
  store,
  render: h => h(Edit)
}).$mount('#app')
