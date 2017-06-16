<template>
  <div id="app">

    <h1>Three Material Builder</h1>

    <Material :materialId="this.materialId" :material="this.material"></Material>
    <Editor   :materialId="this.materialId" :materials="this.materials" v-on:change="change"></Editor>

  </div>
</template>

<script>

import {
    MeshPhysicalMaterial,
    MeshPhongMaterial,
    MeshToonMaterial,
    ShaderMaterial,
    SmoothShading,
    FlatShading
} from '../node_modules/three/build/three.module';

import Material from './components/Material.vue';
import Editor from './components/Editor.vue';

let materials = [
    new MeshToonMaterial({ name:'Toon 1', color: 0xff00ff }),
    new MeshToonMaterial({ name:'Toon 2', color: 0xff00ff, shininess: 50, shading: SmoothShading }),
    new MeshPhysicalMaterial({ name:'Physical 1', color: 0xff00ff, roughness: 0.5, metalness: 0.5, clearCoat: 0.1, shading: SmoothShading }),
    new MeshPhysicalMaterial({ name:'Physical 2', color: 0xff00ff, roughness: 0.5, metalness: 0.5, shading: SmoothShading }),
    new MeshPhysicalMaterial({ name:'Physical 3', color: 0xff00ff, roughness: 0.1, metalness: 0.1, shading: SmoothShading }),
    new MeshPhongMaterial({ name:'Phong 1', color: 0xff00ff, shininess: 100, shading: SmoothShading })
];

export default {
  name: 'app',
  data () {
    return {
        materialId: 0,
        material: materials[0],
        materials: materials
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
