<template>
    <div>
        <div ref="code" class="hidden">{{ concat(preloader) }}
let rendererWidth = 800;
let aspect = 0.75;

let renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false
});
renderer.setSize(rendererWidth, rendererWidth*aspect);
document.body.appendChild(renderer.domElement);

let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(65, rendererWidth/(rendererWidth*aspect), 1, 10000);
    camera.position.set(0, 75, 75);
    camera.lookAt(new THREE.Vector3(0,0,0));
    scene.add(camera);

let light = new THREE.SpotLight(0xffffff, 1.0);
    light.position.set(100, 200, 75);
    light.lookAt(new THREE.Vector3(0,0,0));
    scene.add(light);

let geometry = new THREE.{{ geometry }}({{ geometryOptions }});
let material = new THREE.{{ material }}({
    {{ color }}{{ emissiveIntensity }}{{ colorMap }}{{ bumpMap }}{{ alphaMap }}{{ aoMap }}{{ emissiveMap }}{{ lightMap }}{{ specularMap }}{{ envMap }}{{ roughnessMap }}{{ metalnessMap }}});
let mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

function animate() {

    requestAnimationFrame(animate);
    mesh.rotation.y += 0.01;
    render();

}

function render() {
    renderer.render(scene, camera);
}

animate();

</div>
    <div class="text-left javascript" ref="highlight"></div>

    <form action="https://codepen.io/pen/define" method="POST" target="_blank">
        <input name="data" type="hidden" v-bind:value="codepen">
        <input type="submit" value="Create Pen">
    </form>
  
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
        codepen: '',
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
    material: function(){
        return this.$store.state.properties.material;
    },
    color: function(){
        let color = this.$store.state.properties.color;
        return 'color: '+parseInt(rgbHex(color.r,color.g,color.b), 16)+',\n';
    },
    preloader: function(){
        return [this.colorMapPreloader, this.bumpMapPreloader, this.alphaMapPreloader];
    },
    colorMapPreloader: function(){
        return this.$store.getters['colormap/texturePreloader'];
    },
    colorMap: function(){
        if (this.$store.state.colormap.texture !== undefined) {
            return '    map: colormapTexture,\n';
        }
        return '';
    },
    bumpMapPreloader: function(){
        if (this.$store.state.bumpmap.texture !== undefined) {
            return metaPreloader('bumpmap', this.$store.state.bumpmap.image, 2, 2);
        }
        return '';
    },
    bumpMap: function(){
        if (this.$store.state.bumpmap.texture !== undefined) {
            return '    bumpMap: bumpmapTexture,\n';
        }
        return '';
    },
    alphaMapPreloader: function(){
        if (this.$store.state.alphamap.texture !== undefined) {
            return metaPreloader('alphamap', this.$store.state.alphamap.image, 2, 2);
        }
        return '';
    },
    alphaMap: function(){
        if (this.$store.state.alphamap.texture === undefined) {
            return '';
        } else {
            return '    alphaMap: new THREE.Texture({  }),\n';
        }
    },
    aoMapPreloader: function(){
        if (this.$store.state.aomap.texture !== undefined) {
            return metaPreloader('aomap', this.$store.state.aomap.image, 2, 2);
        }
        return '';
    },
    aoMap: function(){
        if (this.$store.state.aomap.texture !== undefined) {
            return '    aoMap: new THREE.Texture({  }),\n';
        }
        return '';
    },
    emissiveMapPreloader: function(){
        if (this.$store.state.emissivemap.texture !== undefined) {
            return metaPreloader('emissivemap', this.$store.state.emissivemap.image, 2, 2);
        }
        return '';
    },
    emissiveMap: function(){
        if (this.$store.state.emissivemap.texture !== undefined) {
            return '    emissiveMap: new THREE.Texture({  }),\n';
        }
        return '';
    },
    lightMapPreloader: function(){
        if (this.$store.state.lightmap.texture !== undefined) {
            return metaPreloader('lightmap', this.$store.state.lightmap.image, 2, 2);
        }
        return '';
    },
    lightMap: function(){
        if (this.$store.state.lightmap.texture !== undefined) {
            return '    lightMap: new THREE.Texture({  }),\n';
        }
        return '';
    },
    // normalMapPreloader: function(){
    //     if (this.$store.state.normalmap.texture !== undefined) {
    //         return metaPreloader('normalmap', this.$store.state.normalmap.image, 2, 2);
    //     }
    //     return '';
    // },
    // normalMap: function(){
    //     if (this.$store.state.normalmap.texture !== undefined) {
    //         return 'material.normalMap = new THREE.Texture({  });';
    //     }
    //     return '';
    // },
    specularMapPreloader: function(){
        let m = this.$store.state.specularmap;
        if (m.texture !== undefined) {
            return metaPreloader('specularmap', m.image, m.repeat.x, m.repeat.y);
        }
        return '';
    },
    specularMap: function(){
        if (this.$store.state.specularmap.texture !== undefined) {
            return '    specularMap: new THREE.Texture({  }),\n';
        }
        return '';
    },
    envMapPreloader: function(){
        if (this.$store.state.envmap.texture !== undefined) {
            return metaPreloader('envmap', this.$store.state.envmap.image, 2, 2);
        }
        return '';
    },
    envMap: function(){
        if (this.$store.state.envmap.texture !== undefined) {
            return '    envMap: new THREE.Texture({  }),\n';
        }
        return '';
    },
    roughnessMapPreloader: function(){
        if (this.$store.state.roughnessmap.texture !== undefined) {
            return metaPreloader('roughnessmap', this.$store.state.roughnessmap.image, 2, 2);
        }
        return '';
    },
    roughnessMap: function(){
        if (this.$store.state.roughnessmap.texture !== undefined) {
            return '    roughnessMap: new THREE.Texture({  }),\n';
        }
        return '';
    },
    metalnessMapPreloader: function(){
        if (this.$store.state.metalnessmap.texture !== undefined) {
            return metaPreloader('metalnessmap', this.$store.state.metalnessmap.image, 2, 2);
        }
        return '';
    },
    metalnessMap: function(){
        if (this.$store.state.metalnessmap.texture !== undefined) {
            return '    metalnessMap: new THREE.Texture({  }),\n';
        }
        return '';
    },
    emissiveIntensity: function(){
        if (this.$store.state.emissivemap.intensity == 0) {
            return '';
        } else {
            return '    emissiveIntensity: '+this.$store.state.emissivemap.intensity / 100+',\n';
        }
    }
  },
  updated: function(){

    this.$refs["highlight"].innerHTML = this.$refs["code"].innerHTML;
    hljs.highlightBlock(this.$refs["highlight"]);

    let pen = {
        title                 : "New Material!",
        description           : "A material design with MaterialCode",
        parent                : 16330082,
        tags                  : ["MaterialCode", "three.js"],
        editors               : "001", 
        layout                : "left", 
        js                    : this.$refs["code"].innerHTML,
        js_external           : "https://cdnjs.cloudflare.com/ajax/libs/three.js/86/three.min.js"
    }

    var payload = JSON.stringify(pen).replace(/"/g, "&quot;").replace(/'/g, "&apos;");

    this.codepen = payload;

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
    concat (arr) { return arr.join('\n'); }
  },
  components: {

  }
}

function metaPreloader(prefix, image, xRep, yRep){

    let str = 'var '+prefix+'SrcImage = document.createElement( \'img\' );\n\
    '+prefix+'SrcImage.src = \''+image+'\';\n\n\
var '+prefix+'Texture = new THREE.Texture( '+prefix+'SrcImage );\n\
    '+prefix+'Texture.wrapS = '+prefix+'Texture.wrapT = THREE.RepeatWrapping;\n\
    '+prefix+'Texture.repeat.set( '+xRep+', '+yRep+' );\n\
    '+prefix+'Texture.generateMipmaps = false;\n\
    '+prefix+'Texture.minFilter = THREE.LinearFilter;\n\
    '+prefix+'Texture.magFilter = THREE.LinearFilter;\n\
    '+prefix+'Texture.needsUpdate = true;\n\n';

    return str;

}

</script>

<style>
    div.hidden {
        display: none;
    }

    div.javascript {
        padding: 15px;
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
