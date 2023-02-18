import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'

Vue.config.productionTip = false

function updateHash() {
  const hash = window.location.hash.substring(1);
  if (hash.length > 0) {
    try {
      const json = window.atob(hash);
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
  render: h => h(App)
}).$mount('#app')
