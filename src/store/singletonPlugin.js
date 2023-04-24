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

const bc = new BroadcastChannel('singleton-focus');    

const plugin = store => {
    console.log('Activating singleton plugin')
    bc.onmessage = (msg) => {
        const data = msg.data;
        if (data.type == 'lostFocus'
            && store.state.question?.uuid
            && store.state.question.uuid == data.uuid) {
                store.commit('lostFocus');
                console.log('Focus lost');
        }
    };

    store.subscribe((mutation, state) => {
        if (mutation.type == 'setQuestion' && state.question.uuid) {
            bc.postMessage({type: 'lostFocus', uuid: state.question.uuid});
        }
    })
}

export default plugin;