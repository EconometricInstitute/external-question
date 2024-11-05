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

import { LOCAL_PREFIX } from '../util/hashtools';
import { v4 as uuidv4 } from 'uuid';

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
    answer: null,
    loading: false,
  },
  mutations: {
    setQuestion(state, question) {
      state.loading = false;
      state.question = question;
      
      // TODO: Move window state modification from the store to a plugin?
      document.title = question.name;

      if (question.storeLocal && !window.location.hash.substring(1).startsWith(LOCAL_PREFIX)) {
        const mapKey = 'map_' + question.uuid;
        const localUuid = window.localStorage[mapKey] || uuidv4();
        const questionKey = 'question_'+localUuid;
        window.localStorage[questionKey] = JSON.stringify(question);
        window.localStorage[mapKey] = localUuid;
        window.location.hash = '#' + LOCAL_PREFIX + localUuid;
      }
    },
    setLoadError(state, error) {
      state.loadError = error;
    },
    lostFocus(state) {
      state.hasFocus = false;
    },
    setAnswer(state, answer) {
      state.answer = answer;
    },
    setLoading(state, value) {
      state.loading = value;
    }
  },
  actions: {
    loadExternal(context, url) {
      console.log('Loading question from external URL '+url);
      context.commit('setLoading', true);
        fetch(url)
        .then(resp => {
          if (resp.ok) {
            resp.json()
            .then(json => {
                console.log('Question data retrieved from external source', json);
                context.commit('setQuestion', json);
            })
            .catch(err => {
              console.log(err);
              context.commit('setLoadError', 'Error: the remote data does not look like json data. '+err);
              context.commit('setLoading', false);
            })
          }
          else {
            context.commit('setLoadError', 'Error while loading the remote question question. Response status: '+resp.status+' '+resp.statusText);
            context.commit('setLoading', false);
          }
        })
        .catch(err => {
          console.log(err);
          context.commit('setLoadError', 'Error while performing retrieving remote content. '+err);
          context.commit('setLoading', false);
        })
    }
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
