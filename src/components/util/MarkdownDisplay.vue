<template>
  <div class="adjust-md" ref="renderDiv" v-html="rendered" />
</template>

<script>
import Prism from "prismjs";

// CSS files
import "prismjs/themes/prism.css";  

// Languages
import 'prismjs/components/prism-c.min';
import 'prismjs/components/prism-cpp.min';
import 'prismjs/components/prism-java.min';
import 'prismjs/components/prism-javascript.min';
import 'prismjs/components/prism-json.min';
import 'prismjs/components/prism-python.min';
import 'prismjs/components/prism-r.min';


import markdownIt from 'markdown-it';
import 'katex/dist/katex.min.css';
import 'katex/dist/katex';
import autorender from 'katex/dist/contrib/auto-render';

const KATEX_OPTIONS = {
  delimiters: [
    {left: "$$", right: "$$", display: true},
    {left: "$", right: "$", display: false},
    {left: "\\(", right: "\\)", display: false},
    {left: "\\[", right: "\\]", display: true}
  ]
};

// Support code blocks
const MDI = markdownIt({
  highlight(str, lang) {
    if (lang) {
      const l = lang.replaceAll('{','').replaceAll('}','');
      
      if (l in Prism.languages) {
        try {
          return '<pre class="language-'+l+'"><code>' +
                Prism.highlight(str, Prism.languages[l], l) +
                '</code></pre>';
        } catch(__) { /* Deliberately empty */ }
      }
    }
    return '<pre class="language-none"><code>' + MDI.utils.escapeHtml(str) + '</code></pre>';
  }
});

// Make sure links open in a new tab
var defaultRender = MDI.renderer.rules.link_open || function(tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options);
};

MDI.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  // If you are sure other plugins can't add `target` - drop check below
  var aIndex = tokens[idx].attrIndex('target');

  if (aIndex < 0) {
    tokens[idx].attrPush(['target', '_blank']); // add new attribute
  } else {
    tokens[idx].attrs[aIndex][1] = '_blank';    // replace value of existing attr
  }

  // pass token to default renderer.
  return defaultRender(tokens, idx, options, env, self);
};

// Manipulate image display if necessary...
// MDI.renderer.rules.image = function (tokens, idx, options, env, self) {
//   console.log('Image!!');

//   return defaultRender(tokens, idx, options, env, self);
// }

export default {
  name: 'MarkdownDisplay',
  props: [
    'source'
  ],
  mounted() {
    this.update();
  },
  data: () => ({
  }),
  methods: {
    update() {
      const el = this.$refs.renderDiv;
      autorender(el, KATEX_OPTIONS);
      Prism.highlightAll();
    }
  },
  computed: {
    rendered() {
      return MDI.render(this.source);
    }
  },
  watch: {
    source() {
      this.$nextTick(this.update);
    }
  }
};
</script>

<style>
.adjust-md p:last-child {
  margin-bottom: 0;
}

.adjust-md code::before {
  content: "" !important;
  display: none;
}

.adjust-md code::after {
  display: none;
}

.adjust-md code {
  box-shadow: none !important;
  color: black !important;
}

.adjust-md.question-text pre[class*="language-"] {
  padding: 0.25em !important;
  margin-right: 0.5em;
}

.adjust-md pre[class*="language-"] code span.token.operator {
  background: rgba(0,0,0,0);
}

.adjust-md pre code {
  display: inline-block !important;
  width: 100%;
  padding: 0px;
}

.adjust-md pre {
  padding: 0px;
}

.adjust-md ul, .adjust-md ol, .adjust-md pre {
  margin-bottom: 16px;
}

.adjust-md img {
  max-width: 100%;
}

</style>