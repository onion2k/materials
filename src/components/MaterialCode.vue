<template>
    <div>
        <div class="text-left hidden" ref="code">

            let geometry = new THREE.{{ geometry }}({{ geometryOptions }});

            let material = new THREE.MeshBasicMaterial({ color: {{ color }}{{ emissiveIntensity ? ', emissiveIntensity: '+emissiveIntensity : '' }} });

                {{ codeColorMap }}

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
        colormap: true,
        geometryOptions: '40, 60, 60'
    }
  },
  mounted: function(){

    this.$refs["highlight"].innerHTML = this.$refs["code"].innerHTML;
    hljs.highlightBlock(this.$refs["highlight"]);

  },
  computed: {
    geometry: function(){
        return this.$store.state.properties.geometry;
    },
    color: function(){
        let color = this.$store.state.properties.color;
        return '0x'+parseInt(rgbHex(color.r,color.g,color.b), 16);
    },
    codeColorMap: function(){
        if (this.$store.state.colormap.texture === undefined) {
            return '// material.map = new THREE.Texture();';
        } else {
            return 'material.map = new THREE.Texture({ '+this.$store.state.colormap.texture+' });';
        }
    },
    emissiveIntensity: function(){
        return this.$store.state.emissivemap.intensity / 100;
    }
  },
  updated: function(){

    this.$refs["highlight"].innerHTML = this.$refs["code"].innerHTML;
    hljs.highlightBlock(this.$refs["highlight"]);

  },
  watch: {
      geometry: function(val){
          switch (val) {
            case "SphereGeometry":
                this.geometryOptions = '40, 60, 60';
                break;
            case "BoxGeometry":
                this.geometryOptions = '60, 60, 60';
                break;
            case "TorusKnotGeometry":
                this.geometryOptions = '30, 10, 100, 16';
                break;
            case "ConeGeometry":
                this.geometryOptions = '30, 60, 32';
                break;
            case "TorusGeometry":
                this.geometryOptions = '40, 10, 16, 100';
                break;
            case "IcosahedronGeometry":
                this.geometryOptions = '50';
                break;
          };
      }
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
/* Base16 Atelier Lakeside Light - Theme */
/* by Bram de Haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/lakeside) */
/* Original Base16 color scheme by Chris Kempson (https://github.com/chriskempson/base16) */

/* Atelier-Lakeside Comment */
.hljs-comment,
.hljs-quote {
  color: #5a7b8c;
}

/* Atelier-Lakeside Red */
.hljs-variable,
.hljs-template-variable,
.hljs-attribute,
.hljs-tag,
.hljs-name,
.hljs-regexp,
.hljs-link,
.hljs-name,
.hljs-selector-id,
.hljs-selector-class {
  color: #d22d72;
}

/* Atelier-Lakeside Orange */
.hljs-number,
.hljs-meta,
.hljs-built_in,
.hljs-builtin-name,
.hljs-literal,
.hljs-type,
.hljs-params {
  color: #935c25;
}

/* Atelier-Lakeside Green */
.hljs-string,
.hljs-symbol,
.hljs-bullet {
  color: #568c3b;
}

/* Atelier-Lakeside Blue */
.hljs-title,
.hljs-section {
  color: #257fad;
}

/* Atelier-Lakeside Purple */
.hljs-keyword,
.hljs-selector-tag {
  color: #6b6bb8;
}

.hljs {
  display: block;
  overflow-x: auto;
  background: #ebf8ff;
  color: #516d7b;
  padding: 0.5em;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-strong {
  font-weight: bold;
}
</style>
