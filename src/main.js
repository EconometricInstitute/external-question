/*
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
 */

import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'
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
  render: h => h(App)
}).$mount('#app')
