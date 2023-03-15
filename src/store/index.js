import Vue from 'vue'
import Vuex from 'vuex'

import singletonPlugin from '@/store/singletonPlugin.js';
import persistencePlugin from '@/store/persistencePlugin.js';

const pluginsAvailable = {
  singleton: singletonPlugin,
  persistence: persistencePlugin
}

Vue.use(Vuex)

const baseStore = {
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
};

function createStore(enablePlugins = ['singleton', 'persistence']) {
  const plugins = [];
  for (const p of enablePlugins) {
    const plugin = pluginsAvailable[p];
    if (plugin) {
      plugins.push(plugin)
    }
    else {
      throw "Plugin key '"+p+"' is unknown. Can not create VueX store.";
    }
  }  
  return new Vuex.Store({...baseStore, plugins});
}

export default createStore;
