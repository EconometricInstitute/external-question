import Vue from 'vue'
import ExamView from './ExamView.vue'
import vuetify from '@/plugins/vuetify'
import store from '@/store'
import { Base64 } from 'js-base64'

Vue.config.productionTip = false

function updateHash() {
  const hash = window.location.hash.substring(1);
  if (hash.length > 0) {
    try {
      const json = Base64.decode(hash);
      const question = JSON.parse(json);
      store.commit('setQuestion', question);
    }
    catch (e) {
      console.log(e);
      store.commit('setLoadError', e);
    }
  }
}

window.addEventListener('hashchange', updateHash);
updateHash();

new Vue({
  vuetify,
  store,
  render: h => h(ExamView)
}).$mount('#app')
