//import * as Blockly from 'blockly';
import 'blockly';

const RAW_CSS = `.blocklySvg {background-color: #fff;outline: none;overflow: hidden;display: block;}.blocklyWidgetDiv {display: none;position: absolute;z-index: 99999;}.injectionDiv {height: 100%;position: relative;}.blocklyNonSelectable {user-select: none;-moz-user-select: none;-webkit-user-select: none;-ms-user-select: none;}.blocklyTooltipDiv {background-color: #ffffc7;border: 1px solid #ddc;box-shadow: 4px 4px 20px 1px rgba(0,0,0,.15);color: #000;display: none;font-family: sans-serif;font-size: 9pt;opacity: 0.9;padding: 2px;position: absolute;z-index: 100000;}.blocklyResizeSE {cursor: se-resize;fill: #aaa;}.blocklyResizeSW {cursor: sw-resize;fill: #aaa;}.blocklyResizeLine {stroke: #888;stroke-width: 1;}.blocklyHighlightedConnectionPath {fill: none;stroke: #fc3;stroke-width: 4px;}.blocklyPathLight {fill: none;stroke-linecap: round;stroke-width: 1;}.blocklySelected&gt;.blocklyPath {stroke: #fc3;stroke-width: 3px;}.blocklySelected&gt;.blocklyPathLight {display: none;}.blocklyDragging&gt;.blocklyPath,.blocklyDragging&gt;.blocklyPathLight {fill-opacity: .8;stroke-opacity: .8;}.blocklyDragging&gt;.blocklyPathDark {display: none;}.blocklyDisabled&gt;.blocklyPath {fill-opacity: .5;stroke-opacity: .5;}.blocklyDisabled&gt;.blocklyPathLight,.blocklyDisabled&gt;.blocklyPathDark {display: none;}.blocklyText {cursor: default;fill: #fff;font-family: sans-serif;font-size: 11pt;}.blocklyNonEditableText&gt;text {pointer-events: none;}.blocklyNonEditableText&gt;rect,.blocklyEditableText&gt;rect {fill: #fff;fill-opacity: .6;}.blocklyNonEditableText&gt;text,.blocklyEditableText&gt;text {fill: #000;}.blocklyEditableText:hover&gt;rect {stroke: #fff;stroke-width: 2;}.blocklyBubbleText {fill: #000;}.blocklyFlyoutButton {fill: #888;cursor: default}.blocklyFlyoutButton:hover {fill: #ccc;}.blocklySvg text {user-select: none;-moz-user-select: none;-webkit-user-select: none;cursor: inherit;}.blocklyHidden {display: none;}.blocklyFieldDropdown:not(.blocklyHidden) {display: block;}.blocklyIconGroup {cursor: default;}.blocklyIconGroup:not(:hover),.blocklyIconGroupReadonly {opacity: .6;}.blocklyIconShape {fill: #00f;stroke: #fff;stroke-width: 1px;}.blocklyIconSymbol {fill: #fff;}.blocklyMinimalBody {margin: 0;padding: 0;}.blocklyCommentTextarea {background-color: #ffc;border: 0;margin: 0;padding: 2px;resize: none;}.blocklyHtmlInput {border: none;border-radius: 4px;font-family: sans-serif;height: 100%;margin: 0;outline: none;padding: 0 1px;width: 100%}.blocklyMainBackground {stroke-width: 1;stroke: #c6c6c6;}.blocklyMutatorBackground {fill: #fff;stroke: #ddd;stroke-width: 1;}.blocklyFlyoutBackground {fill: #ddd;fill-opacity: .8;}.blocklyScrollbarBackground {opacity: 0;}.blocklyScrollbarHandle {fill: #ccc;}.blocklyScrollbarBackground:hover+.blocklyScrollbarHandle,.blocklyScrollbarHandle:hover {fill: #bbb;}.blocklyZoom&gt;image {opacity: .4;}.blocklyZoom&gt;image:hover {opacity: .6;}.blocklyZoom&gt;image:active {opacity: .8;}.blocklyFlyout .blocklyScrollbarHandle {fill: #bbb;}.blocklyFlyout .blocklyScrollbarBackground:hover+.blocklyScrollbarHandle,.blocklyFlyout .blocklyScrollbarHandle:hover {fill: #aaa;}.blocklyInvalidInput {background: #faa;}.blocklyAngleCircle {stroke: #444;stroke-width: 1;fill: #ddd;fill-opacity: .8;}.blocklyAngleMarks {stroke: #444;stroke-width: 1;}.blocklyAngleGauge {fill: #f88;fill-opacity: .8;}.blocklyAngleLine {stroke: #f00;stroke-width: 2;stroke-linecap: round;}.blocklyContextMenu {border-radius: 4px;}.blocklyDropdownMenu {padding: 0 !important;}.blocklyWidgetDiv .goog-option-selected .goog-menuitem-checkbox,.blocklyWidgetDiv .goog-option-selected .goog-menuitem-icon {background: url(&lt;&lt;&lt;PATH&gt;&gt;&gt;/sprites.png) no-repeat -48px -16px !important;}.blocklyToolboxDiv {background-color: #ddd;overflow-x: visible;overflow-y: auto;position: absolute;}.blocklyTreeRoot {padding: 4px 0;}.blocklyTreeRoot:focus {outline: none;}.blocklyTreeRow {height: 22px;line-height: 22px;margin-bottom: 3px;padding-right: 8px;white-space: nowrap;}.blocklyHorizontalTree {float: left;margin: 1px 5px 8px 0;}.blocklyHorizontalTreeRtl {float: right;margin: 1px 0 8px 5px;}.blocklyToolboxDiv[dir="RTL"] .blocklyTreeRow {margin-left: 8px;}.blocklyTreeRow:not(.blocklyTreeSelected):hover {background-color: #e4e4e4;}.blocklyTreeSeparator {border-bottom: solid #e5e5e5 1px;height: 0;margin: 5px 0;}.blocklyTreeSeparatorHorizontal {border-right: solid #e5e5e5 1px;width: 0;padding: 5px 0;margin: 0 5px;}.blocklyTreeIcon {background-image: url(&lt;&lt;&lt;PATH&gt;&gt;&gt;/sprites.png);height: 16px;vertical-align: middle;width: 16px;}.blocklyTreeIconClosedLtr {background-position: -32px -1px;}.blocklyTreeIconClosedRtl {background-position: 0px -1px;}.blocklyTreeIconOpen {background-position: -16px -1px;}.blocklyTreeSelected&gt;.blocklyTreeIconClosedLtr {background-position: -32px -17px;}.blocklyTreeSelected&gt;.blocklyTreeIconClosedRtl {background-position: 0px -17px;}.blocklyTreeSelected&gt;.blocklyTreeIconOpen {background-position: -16px -17px;}.blocklyTreeIconNone,.blocklyTreeSelected&gt;.blocklyTreeIconNone {background-position: -48px -1px;}.blocklyTreeLabel {cursor: default;font-family: sans-serif;font-size: 16px;padding: 0 3px;vertical-align: middle;}.blocklyTreeSelected .blocklyTreeLabel {color: #fff;}.blocklyWidgetDiv .goog-palette {outline: none;cursor: default;}.blocklyWidgetDiv .goog-palette-table {border: 1px solid #666;border-collapse: collapse;}.blocklyWidgetDiv .goog-palette-cell {height: 13px;width: 15px;margin: 0;border: 0;text-align: center;vertical-align: middle;border-right: 1px solid #666;font-size: 1px;}.blocklyWidgetDiv .goog-palette-colorswatch {position: relative;height: 13px;width: 15px;border: 1px solid #666;}.blocklyWidgetDiv .goog-palette-cell-hover .goog-palette-colorswatch {border: 1px solid #FFF;}.blocklyWidgetDiv .goog-palette-cell-selected .goog-palette-colorswatch {border: 1px solid #000;color: #fff;}.blocklyWidgetDiv .goog-menu {background: #fff;border-color: #ccc #666 #666 #ccc;border-style: solid;border-width: 1px;cursor: default;font: normal 13px Arial, sans-serif;margin: 0;outline: none;padding: 4px 0;position: absolute;overflow-y: auto;overflow-x: hidden;max-height: 100%;z-index: 20000;}.blocklyWidgetDiv .goog-menuitem {color: #000;font: normal 13px Arial, sans-serif;list-style: none;margin: 0;padding: 4px 7em 4px 28px;white-space: nowrap;}.blocklyWidgetDiv .goog-menuitem.goog-menuitem-rtl {padding-left: 7em;padding-right: 28px;}.blocklyWidgetDiv .goog-menu-nocheckbox .goog-menuitem,.blocklyWidgetDiv .goog-menu-noicon .goog-menuitem {padding-left: 12px;}.blocklyWidgetDiv .goog-menu-noaccel .goog-menuitem {padding-right: 20px;}.blocklyWidgetDiv .goog-menuitem-content {color: #000;font: normal 13px Arial, sans-serif;}.blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-accel,.blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-content {color: #ccc !important;}.blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-icon {opacity: 0.3;-moz-opacity: 0.3;filter: alpha(opacity=30);}.blocklyWidgetDiv .goog-menuitem-highlight,.blocklyWidgetDiv .goog-menuitem-hover {background-color: #d6e9f8;border-color: #d6e9f8;border-style: dotted;border-width: 1px 0;padding-bottom: 3px;padding-top: 3px;}.blocklyWidgetDiv .goog-menuitem-checkbox,.blocklyWidgetDiv .goog-menuitem-icon {background-repeat: no-repeat;height: 16px;left: 6px;position: absolute;right: auto;vertical-align: middle;width: 16px;}.blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-checkbox,.blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-icon {left: auto;right: 6px;}.blocklyWidgetDiv .goog-option-selected .goog-menuitem-checkbox,.blocklyWidgetDiv .goog-option-selected .goog-menuitem-icon {background: url(//ssl.gstatic.com/editor/editortoolbar.png) no-repeat -512px 0;}.blocklyWidgetDiv .goog-menuitem-accel {color: #999;direction: ltr;left: auto;padding: 0 6px;position: absolute;right: 0;text-align: right;}.blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-accel {left: 0;right: auto;text-align: left;}.blocklyWidgetDiv .goog-menuitem-mnemonic-hint {text-decoration: underline;}.blocklyWidgetDiv .goog-menuitem-mnemonic-separator {color: #999;font-size: 12px;padding-left: 4px;}.blocklyWidgetDiv .goog-menuseparator {border-top: 1px solid #ccc;margin: 4px 0;padding: 0;}`;

function outputCode(data, outputFunction='returnOutput')
{
    let res = `${outputFunction}({\n`;
    for (const key of Object.keys(data)) {
        res += `${key},\n`
    }
    res += '})';
    return res;
}

function envToJS(data)
{
    let res = '';
    for (const key of Object.keys(data))
    {
        res += 'let '+key+' = ';
        res += JSON.stringify(data[key]);
        res += ';\n';
    }
    return res;
}

function getSVG(workspace) {
    workspace.highlightBlock('');

    const canvas = workspace.svgBlockCanvas_.cloneNode(true);
    canvas.removeAttribute("transform");
  
    const css = `<defs><style type="text/css" xmlns="http://www.w3.org/1999/xhtml"><![CDATA[${RAW_CSS}]]></style></defs>`;
    const bboxElement = document.getElementsByClassName("blocklyBlockCanvas")[0];
    const bbox = bboxElement.getBBox();
    const content = new XMLSerializer().serializeToString(canvas);
  
    const xml = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${
      bbox.width}" height="${bbox.height}" viewBox=" ${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}">${css}">${content}</svg>
    `;

    return xml;

    /*
    const cp = workspace.svgBlockCanvas_.cloneNode(true);
    cp.removeAttribute("width");
    cp.removeAttribute("height");
    cp.removeAttribute("transform");
    //It is important to create this element in the SVG namespace rather than the XHTML namespace
    const styleElem = document.createElementNS("http://www.w3.org/2000/svg", "style");
    styleElem.textContent = Blockly.Css.CONTENT.join('');
    cp.insertBefore(styleElem, cp.firstChild);
    
    //Creates a complete SVG document with the correct bounds (it is necessary to get the viewbox right, in the case of negative offsets)
    const bbox = workspace.svgBlockCanvas_.getBBox();
    let xml = new XMLSerializer().serializeToString(cp);
    
    xml = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="'+bbox.width+'" height="'+bbox.height+'" viewBox="' + bbox.x + ' ' + bbox.y + ' '  + bbox.width + ' ' + bbox.height + '"><rect width="100%" height="100%" fill="white"></rect>'+xml+'</svg>';
    return xml;
    */
}

// function displayEnv(data)
// {
//     let res = '<ul>'
//     for (var i in data)
//     {
//         res += '<li><div>A variable with name <span class="blockly-varname">'+i+'</span> which holds ';
//         res += makehtml(data[i]);
//         res += '</div></li>';
//     }
//     res += '</ul>';
//     return res;
// }

// function makehtml(data)
// {
//     if (typeof data == 'string')
//     {
//         return 'a string "<span class="blockly-string">'+data+'</span>"';
//     }
//     else if (typeof data == 'number')
//     {
//         return 'a number <span class="blockly-number">'+data+'</span>';
//     }
//     else if (typeof data == 'boolean')
//     {
//         return 'a boolean <span class="blockly-boolean">'+data+'</span>';
//     }
//     else if (Array.isArray(data))
//     {
//         let row1 = '';
//         let row2 = '';
//         for (let i=0; i < data.length; i++)
//         {
//             row1 += '<td class="blockly-table blockly-table-index">'+(i+1)+'</td>';
//             row2 += '<td class="blockly-table blockly-table-value">'+makehtml(data[i])+'</td>';
//         }
//         let res = 'a list <table class="blockly-table"><tr class="blockly-table"><td class="blockly-table">Position</td>';
//         res += row1;
//         res += '</tr><tr class="blockly-table"><td class="blockly-table">Value</td>'+row2+'</tr></table>';
//         return res;
//     }
//     else if (typeof data == 'function')
//     {
//         return 'a function';
//     }
//     else
//     {
//         let row1 = '';
//         let row2 = '';
//         for (const i of Object.keys(data))
//         {
//             row1 += '<td class="blockly-table">'+i+'</td>';
//             row2 += '<td class="blockly-table blockly-table-value">'+makehtml(data[i])+'</td>';
//         }
//         let res = 'an object <table class="blockly-table"><tr class="blockly-table"><td class="blockly-table">Property</td>';
//         res += row1;
//         res += '</tr><tr class="blockly-table"><td class="blockly-table">Value</td>';
//         res += row2;
//         res += '</tr></table>';
//         return res;
//     }
// }

const workerScript =
`
onmessage = function(msg) {
    const payload = msg.data;
    const script = payload.script;
    const id = payload.id;
    try {
        const f = new Function(script);
        const data = f();
        postMessage(JSON.stringify({error: false, id, data}));
    }
    catch(err) {
        postMessage(JSON.stringify({error: true, id, data: ''+err}));
    }
};
`;
const workerScriptURL = URL.createObjectURL(new Blob([workerScript], {type: 'text/javascript'}));


async function evalScripts(scripts) {
    const worker = new Worker(workerScriptURL);
    const result = new Array(scripts.length);
    const promises = new Array(scripts.length);
    const resolves = new Array(scripts.length);
    for (let t=0; t < scripts.length; t++) {
        const promise = new Promise((resolve) => {
            resolves[t] = resolve;
        });
        promises[t] = promise;
    }

    worker.onmessage = (msg) => {
        const payload = JSON.parse(msg.data);
        result[payload.id] = payload;
        resolves[payload.id]();
    };

    let index = 0;
    for (const script of scripts) {
        worker.postMessage({script, id: index++});
    }
    return new Promise((resolve) => {
        Promise.all(promises)
               .then(() => {
                   worker.terminate();
                   resolve(result);
               });
    });
}

async function evalInWorker(script) {    
    const worker = new Worker(workerScriptURL);
    const result = new Promise((resolve, reject) => {
        worker.onmessage = (resp) => {
            if (resp.error) {
                reject(resp.data);
            }
            else {
                resolve(resp.data);
            }
            worker.terminate();
        }
    });
    worker.postMessage({script, id: 0});
    return result;
}

const TRACE_FUNCTIONS = `
function highlightBlock(block) {
  postMessage({type: 'highlight', block});
}
function runFinished(result) {
  postMessage({type: 'finish', result});
}
function runError(err) {
  postMessage({type: 'error', error: err});
}
async function sleep(ms) {
  await new Promise(r => setTimeout(r, ms));;
}
`;

function evalInWorkerTrace(script, highlightCallback, finishCallback, errorCallback) {
    const fullScript = TRACE_FUNCTIONS 
                     + '$step_count=0;\nasync function run() {\ntry {\n'
                     + script 
                     + '}\ncatch (err) {\n   runError(err);\n}};\nrun();';
    const scriptUrl = URL.createObjectURL(new Blob([fullScript], {type: 'text/javascript'}));
    const worker = new Worker(scriptUrl);
    worker.onmessage = (msg) => {
        const type = msg.data.type;
        if (type == 'highlight') {
            highlightCallback(msg.data.block);
        }
        else if (type == 'finish') {
            finishCallback(msg.data.result);
            worker.terminate();
        }
        else if (type == 'error') {
            errorCallback(msg.data.error);
            worker.terminate();
        }
    };
    return worker;
}

function formatValue(value, fixedLength=0, strictStrings=false) {
    if (typeof(value) == 'number') {
            return value.toFixed(fixedLength);
    }
    else if (!strictStrings && typeof(value) == 'string') {
       var simple = value.toLowerCase();
       simple = simple.replace(/\s+/g, ''); // ignore spacing
       simple = simple.replace(/"/g,''); // get rid of accidental accents
       return simple;
    }
    else if (Array.isArray(value)) {
            var mapped = [];
            for (var i=0; i < value.length; i++) {
                    mapped.push(formatValue(value[i]));
            }
            return '[' + mapped.join(',') + ']';
    }
    return value;
}

export {
    outputCode,
    envToJS,
    getSVG,
    // makehtml,
    // displayEnv,
    evalInWorker,
    evalInWorkerTrace,
    evalScripts,
    formatValue
};