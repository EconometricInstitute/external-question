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

export function copyHtml(html) {
    // TODO: in the future it is probably better to use the proper Clipboard API
    const el = document.createElement('div');
    el.innerHTML = html;
    document.body.appendChild(el);
    const range = document.createRange();
    range.selectNode(el);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    try {
        document.execCommand('copy');
    }
    catch (err) {
        console.log('Failed to copy the contents to the clipboard', err);
    }
    selection.removeAllRanges();
    document.body.removeChild(el);
}

export function copyText(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    }
    else {
        const el = document.createElement('textarea');
        el.value = text;
        el.style.display = 'none';
        document.body.appendChild(el);
        el.focus();
        el.select();
        try {
            document.execCommand('copy');
        }
        catch (err) {
            console.log('Failed to copy the contents to the clipboard', err);
        }
        document.body.removeChild(el);
    }
}
