import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    question: null,
    loadError: null
  },
  mutations: {
    setQuestion(state, question) {
      state.question = question;
    },
    setLoadError(state, error) {
      state.loadError = error;
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
  }
})
