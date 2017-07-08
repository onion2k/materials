<template>
    <div>
        <div class="text-left hidden" ref="code">

            let geometry = new THREE.BoxGeometry(5, 5, 5);

            let material = new THREE.MeshBasicMaterial({ color: {{ color }}{{ emissiveIntensity ? ', emissiveIntensity: '+emissiveIntensity : '' }} });

                material.map = new THREE.Texture();

                material.bumpMap = new THREE.Texture();

                material.alphaMap = new THREE.Texture();

                material.occlusionMap = new THREE.Texture();

                // material.emissiveMap = new THREE.Texture();

                material.lightMap = new THREE.Texture();

                material.normalMap = new THREE.Texture();

                material.specularMap = new THREE.Texture();

                material.envMap = new THREE.Texture();

            let mesh = new THREE.Mesh(geometry, material);

        </div>
        <div class="text-left javascript" ref="highlight">
        </div>
    </div>
</template>

<script>

import rgbHex from 'rgb-hex';
import hljs from '../lib/highlight.custom';

export default {
  name: 'MaterialCode',
  props: [],
  data: function(){
    return {

    }
  },
  mounted: function(){

  },
  computed: {
    geometry: function(){

    },
    color: function(){
        let color = this.$store.state.properties.color;
        return '0x'+parseInt(rgbHex(color.r,color.g,color.b), 16);
    },
    emissiveIntensity: function(){
        return this.$store.state.emissivemap.intensity / 100;
    }
  },
  updated: function(){

      console.log(this.$refs["code"].innerHTML)

    this.$refs["highlight"].innerHTML = this.$refs["code"].innerHTML;
    hljs.highlightBlock(this.$refs["highlight"]);

  },
  methods: {

  },
  components: {

  }
}

</script>

<style>
    div.hidden {
        display: none;
    }

    div.javascript {
        padding: 0;
        font-family: Courier;
        font-size: 12px;
        white-space: pre;
    }

/* http://jmblog.github.com/color-themes-for-google-code-highlightjs */

/* Tomorrow Comment */
.hljs-comment,
.hljs-quote {
  color: #8e908c;
}

/* Tomorrow Red */
.hljs-variable,
.hljs-template-variable,
.hljs-tag,
.hljs-name,
.hljs-selector-id,
.hljs-selector-class,
.hljs-regexp,
.hljs-deletion {
  color: #c82829;
}

/* Tomorrow Orange */
.hljs-number,
.hljs-built_in,
.hljs-builtin-name,
.hljs-literal,
.hljs-type,
.hljs-params,
.hljs-meta,
.hljs-link {
  color: #f5871f;
}

/* Tomorrow Yellow */
.hljs-attribute {
  color: #eab700;
}

/* Tomorrow Green */
.hljs-string,
.hljs-symbol,
.hljs-bullet,
.hljs-addition {
  color: #718c00;
}

/* Tomorrow Blue */
.hljs-title,
.hljs-section {
  color: #4271ae;
}

/* Tomorrow Purple */
.hljs-keyword,
.hljs-selector-tag {
  color: #8959a8;
}

.hljs {
  display: block;
  overflow-x: auto;
  background: white;
  color: #4d4d4c;
  padding: 0.5em;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-strong {
  font-weight: bold;
}

</style>
