import Vue from 'vue'
import Index from './Index.vue'
import vuetify from '@/plugins/vuetify'
import store from '@/store'

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  render: h => h(Index)
}).$mount('#app')
