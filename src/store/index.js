import Vue from 'vue'
import Vuex from 'vuex'

import singletonPlugin from '@/store/singletonPlugin.js';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    question: null,
    loadError: null,
    hasFocus: true,
  },
  mutations: {
    setQuestion(state, question) {
      state.question = question;
    },
    setLoadError(state, error) {
      state.loadError = error;
    },
    lostFocus(state) {
      state.hasFocus = false;
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {  
    questionName(state) {
      if (state.question) {
        return state.question.name;
      }
      return 'No Question Data';
    },
    questionType(state) {
      if (state.question) {
        return state.question.type;
      }
      return null;
    }
  },
  plugins: [singletonPlugin]
})

export default store;
