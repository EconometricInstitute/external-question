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
