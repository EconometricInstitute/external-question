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

import { Base64 } from 'js-base64'
import pako from 'pako';

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export function unpack(hashStr) {
    const zippedData = Base64.toUint8Array(hashStr);
    const unzippedData = pako.inflate(zippedData);
    const jsonStr = decoder.decode(unzippedData);
    const container = JSON.parse(jsonStr);
    // TODO: in the future we could add validation to the container
    return { data: container.payload, validated: false };
}

export function pack(object) {
    const container = { payload: object };
    const jsonStr = JSON.stringify(container);
    const unzippedData = encoder.encode(jsonStr);
    const zippedData = pako.deflate(unzippedData);
    const base64Data = Base64.fromUint8Array(zippedData, true);
    return base64Data;
}

export function processHashInStore(store, loadAction='setQuestion', errorAction='setLoadError') {    
    const updateHash = () => {
        const hash = window.location.hash.substring(1);
        if (hash.length > 0) {
          try {
            let unpackResult;
            try {
                unpackResult = unpack(hash);
            }
            catch (err) {
                // If there is an old link, this fallback ensures it still works
                console.log('Error while decoding question data', err);
                console.log('Attempting a fallback to direct decoding of the hash');
                const json = Base64.decode(hash);
                unpackResult = { data: JSON.parse(json), validated: false };
            }
            const question = unpackResult.data;
            // In the future, we could check validation here
            store.commit(loadAction, question);
            document.title = question.name;
          }
          catch (e) {
            console.log(e);
            store.commit(errorAction, e);
          }
        }
    }  
    window.addEventListener('hashchange', updateHash);
    updateHash();
}

