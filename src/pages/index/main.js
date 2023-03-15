import Vue from 'vue'
import Index from './Index.vue'
import vuetify from '@/plugins/vuetify'
import createStore from '@/store'

const store = createStore([]);

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  render: h => h(Index)
}).$mount('#app')
