<template>
   <div class="blockly" :id="divId"></div>
</template>

<script>
import * as Blockly from 'blockly';
import {outputCode, envToJS, getSVG} from './blockly_utils.js';
import 'blockly/media/sprites.png';

const MAX_STEPS = 50000;

const STEP_INTERVAL = 150;

export default {
  name: 'BlocklyWorkspace',
  props: ['question', 'focused', 'inputAnswer'],
  mounted() {
    // TODO: the media path is now provided by the backend - find a way to solve this issue in the frontend?
    this.workspace = Blockly.inject(this.divId, {
        toolbox: this.question.toolbox,
        sounds: false,
        media: '/webjars/blockly/media/'
    });
    if (this.inputAnswer && this.inputAnswer.xml) {
      const dom = Blockly.Xml.textToDom(this.inputAnswer.xml);
      Blockly.Xml.domToWorkspace(dom, this.workspace);
    }
    this.workspace.addChangeListener(this.workspaceChanged);
  },
  data: () => ({
    workspace: null,
    workspaceXML: '',
    displayCode: '',
    testingCode: '',
    tracingCode: '',
    runningTrace: false,
    traceWorker: null,
  }),
  methods: {
    workspaceChanged() {
      this.$nextTick(() => {
        const dom = Blockly.Xml.workspaceToDom(this.workspace);
        const xml = Blockly.Xml.domToText(dom);
        const code = {
          display: this.getDisplayCode(),
          trace: this.getTracingCode(),
          test: this.getTestingCode(),
          svg: this.getSVG(),
          xml
        };
        this.$emit('code', code)
      });
    },
    getTestingCode() {
        Blockly.JavaScript.STATEMENT_PREFIX = 'if ($step_count++ > '+this.maxSteps+') throw "Too many steps. Check for infinite loops.";';
        let generated = Blockly.JavaScript.workspaceToCode(this.workspace);
        generated = 'var $step_count = 0;' + generated;
        Blockly.JavaScript.STATEMENT_PREFIX = '';
        return generated;
    },
    getDisplayCode() {
      let rawCode = Blockly.JavaScript.workspaceToCode(this.workspace);
      //rawCode = rawCode.substring(rawCode.indexOf("\n") + 1).trim() + '\n';
      return this.preCode + rawCode;
    },
    getTracingCode() {
      Blockly.JavaScript.STATEMENT_PREFIX = 'await sleep('+STEP_INTERVAL+');if ($step_count++ > '+this.maxSteps+') throw "Too many steps. Check for infinite loops.";highlightBlock(%1);\n';
      let rawCodeHL = Blockly.JavaScript.workspaceToCode(this.workspace);
      rawCodeHL = rawCodeHL.substring(rawCodeHL.indexOf("\n") + 1).trim() + '\n';
      rawCodeHL = rawCodeHL.replace(/\s+function\s+/g, '\nasync function ');
      Blockly.JavaScript.STATEMENT_PREFIX = '';
      //console.log(rawCodeHL);
      return this.preCode
           + rawCodeHL
           + '\nhighlightBlock(\'\');\n'
           + outputCode(this.question.exampleOutput, 'runFinished');
    },
    getSVG() {
      return getSVG(this.workspace);
    },
    highlight(blockId) {
      this.workspace.highlightBlock(blockId);
    },
    clearTrace() {
      this.workspace.highlightBlock('');
      // TODO enable/disable tracing mode?
    }
  },
  computed: {
    maxSteps() {
      if (this.question.maxSteps) {
          return this.question.maxSteps;
      }
      return MAX_STEPS;
    },
    divId() {
      return 'blocklyDiv-'+this.question.uuid;
    },
    preCode() {
      let result = '/*Defining input variables*/\n';
      result += envToJS(this.question.exampleInput);
      result += '\n';
      result += '/*Code generated from blocks*/\n';
      return result;
    }
  },
  watch: {
      focused() {
        this.$nextTick(() => {
            Blockly.svgResize(this.workspace);
            Blockly.resizeSvgContents(this.workspace);
            this.workspace.resize();
            this.workspace.resizeContents();
        });          
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.blockly {
  width: 100%;
  height: 100%;
}
</style>
