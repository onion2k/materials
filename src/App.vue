<template>
    <div id="app">
        <Material :materialId="this.materialId" :material="this.material" :wire="this.wire"></Material>
        <Editor   :materialId="this.materialId" :materials="this.materials" v-on:change="change"></Editor>
    </div>
</template>

<script>

import {
    MeshPhysicalMaterial,
    MeshPhongMaterial,
    MeshLambertMaterial,
    MeshToonMaterial,
    ShaderMaterial,
    SmoothShading,
    FlatShading
} from '../node_modules/three/build/three.module';

import Material from './components/Material.vue';
import Editor from './components/Editor.vue';

let materials = [
    new MeshToonMaterial({      name:'Toon 1', color: 0xff00ff }),
    new MeshToonMaterial({      name:'Toon 2', color: 0xff00ff, shininess: 50, shading: SmoothShading }),
    new MeshToonMaterial({      name:'Toon Flat', color: 0xff00ff, shading: FlatShading }),

    new MeshPhysicalMaterial({  name:'Physical Bronze', color: 0xff8800, roughness: 0.5, metalness: 0.5, clearCoat: 0.1, reflectivity: 0.6, shading: SmoothShading }),
    new MeshPhysicalMaterial({  name:'Physical Silver', color: 0xc0c0c0, roughness: 0.5, metalness: 0.3, clearCoat: 0, reflectivity: 0.8, shading: SmoothShading }),
    new MeshPhysicalMaterial({  name:'Physical Gold!', color: 0xffd700, roughness: 0.2, metalness: 0.2, clearCoat: 0, reflectivity: 0.8, shading: SmoothShading }),
    new MeshPhysicalMaterial({  name:'Physical 2', color: 0xffffff, roughness: 1.0, metalness: 0, clearCoat: 0.1, shading: SmoothShading }),
    new MeshPhysicalMaterial({  name:'Physical Uncoated', color: 0xffffff, roughness: 0, metalness: 0, clearCoat: 0, clearCoatRoughness: 0, shading: SmoothShading }),
    new MeshPhysicalMaterial({  name:'Physical Coated', color: 0xffffff, roughness: 0, metalness: 0, clearCoat: 1.0, clearCoatRoughness: 0, shading: SmoothShading }),
    new MeshPhysicalMaterial({  name:'Physical Rough Coated', color: 0xffffff, roughness: 0, metalness: 0, clearCoat: 1.0, clearCoatRoughness: 1.0, shading: SmoothShading }),    
    new MeshPhysicalMaterial({  name:'Physical 3', color: 0xff00ff, roughness: 0.5, metalness: 0.5, shading: SmoothShading }),
    new MeshPhysicalMaterial({  name:'Physical 4', color: 0xff00ff, roughness: 0.1, metalness: 0.1, shading: SmoothShading }),

    new MeshLambertMaterial({     name:'Lambert 1', color: 0xff00ff, shading: SmoothShading }),
    new MeshLambertMaterial({     name:'Lambert Flat', color: 0xff00ff, shading: FlatShading }),

    new MeshPhongMaterial({     name:'Phong 1', color: 0xff00ff, shininess: 0, shading: SmoothShading }),
    new MeshPhongMaterial({     name:'Phong 2', color: 0xff00ff, shininess: 50, shading: SmoothShading }),
    new MeshPhongMaterial({     name:'Phong 3', color: 0xff00ff, shininess: 100, shading: SmoothShading }),
    new MeshPhongMaterial({     name:'Phong Flat', color: 0xff00ff, shininess: 0, shading: FlatShading })
];

export default {
  name: 'app',
  data () {
    return {
        materialId: 0,
        material: materials[0],
        materials: materials,
        wire: false
    }
  },
  methods: {
    change: function(payload) {
        this.material = materials[payload.material];
    }
  },
  components: {
    Material,
    Editor
  }
}

</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.material {
  float: left;
  width: 75%;
}
.editor {
  float: left;
  width: 25%;
}
</style>
