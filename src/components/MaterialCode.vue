<template>
    <div>
        <div class="text-left hidden" ref="code">

            let geometry = new THREE.{{ geometry }}({{ geometryOptions }});

            let material = new THREE.MeshBasicMaterial({ color: {{ color }}{{ emissiveIntensity ? ', emissiveIntensity: '+emissiveIntensity : '' }} });

                {{ colorMap }}
                {{ bumpMap }}
                {{ alphaMap }}
                {{ aoMap }}
                {{ emissiveMap }}
                {{ lightMap }}

                {{ specularMap }}
                {{ envMap }}
                {{ roughnessMap }}
                {{ metalnessMap }}

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
    colorMap: function(){
        if (this.$store.state.colormap.texture === undefined) {
            return '// material.map = new THREE.Texture();';
        } else {
            return 'material.map = new THREE.Texture({  });';
        }
    },
    bumpMap: function(){
        if (this.$store.state.bumpmap.texture === undefined) {
            return '// material.bumpMap = new THREE.Texture();';
        } else {
            return 'material.bumpMap = new THREE.Texture({  });';
        }
    },
    alphaMap: function(){
        if (this.$store.state.alphamap.texture === undefined) {
            return '// material.alphaMap = new THREE.Texture();';
        } else {
            return 'material.alphaMap = new THREE.Texture({  });';
        }
    },
    aoMap: function(){
        if (this.$store.state.aomap.texture === undefined) {
            return '// material.aoMap = new THREE.Texture();';
        } else {
            return 'material.aoMap = new THREE.Texture({  });';
        }
    },
    emissiveMap: function(){
        if (this.$store.state.emissivemap.texture === undefined) {
            return '// material.emissiveMap = new THREE.Texture();';
        } else {
            return 'material.emissiveMap = new THREE.Texture({  });';
        }
    },
    lightMap: function(){
        if (this.$store.state.lightmap.texture === undefined) {
            return '// material.lightMap = new THREE.Texture();';
        } else {
            return 'material.lightMap = new THREE.Texture({  });';
        }
    },
    // normalMap: function(){
    //     if (this.$store.state.normalmap.texture === undefined) {
    //         return '// material.normalMap = new THREE.Texture();';
    //     } else {
    //         return 'material.normalMap = new THREE.Texture({  });';
    //     }
    // },
    specularMap: function(){
        if (this.$store.state.specularmap.texture === undefined) {
            return '// material.specularMap = new THREE.Texture();';
        } else {
            return 'material.specularMap = new THREE.Texture({  });';
        }
    },
    envMap: function(){
        if (this.$store.state.envmap.texture === undefined) {
            return '// material.envMap = new THREE.Texture();';
        } else {
            return 'material.envMap = new THREE.Texture({  });';
        }
    },
    roughnessMap: function(){
        if (this.$store.state.roughnessmap.texture === undefined) {
            return '// material.roughnessMap = new THREE.Texture();';
        } else {
            return 'material.roughnessMap = new THREE.Texture({  });';
        }
    },
    metalnessMap: function(){
        if (this.$store.state.metalnessmap.texture === undefined) {
            return '// material.metalnessMap = new THREE.Texture();';
        } else {
            return 'material.metalnessMap = new THREE.Texture({  });';
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
  color: #aabbcc;
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
