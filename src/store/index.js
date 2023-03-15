import Vue from 'vue'
import Vuex from 'vuex'

import singletonPlugin from '@/store/singletonPlugin.js';
import persistencePlugin from '@/store/persistencePlugin.js';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    question: null,
    loadError: null,
    hasFocus: true,
    answer: null
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
    },
    setAnswer(state, answer) {
      state.answer = answer;
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
  plugins: [singletonPlugin, persistencePlugin]
})

export default store;
