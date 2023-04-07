
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
