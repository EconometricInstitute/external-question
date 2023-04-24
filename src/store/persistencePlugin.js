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

function getKey(state) {
    return `answer_${state.question.uuid}`;
}

function storeData(state) {
    const key = getKey(state);
    const value = JSON.stringify(state.answer);
    window.localStorage[key] = value;
}

function readData(state) {
    const key = getKey(state);
    const value = window.localStorage[key];
    if (value) {
        return JSON.parse(value);
    }
    return null;
}

const plugin = store => {
    store.subscribe((mutation, state) => {
        if (mutation.type == 'setQuestion' && state.question.uuid) {
            // Load answer from localStorage
            const answer = readData(state);
            if (answer) {
                store.commit('setAnswer', answer);
            }
        }
        if (mutation.type == 'setAnswer' && state.question.uuid) {
            // Save answer to localStorage
            storeData(state);
        }
    })
};

export default plugin;