<template>
  <div id="app">

    <h1>Three Material Builder</h1>

    <Material :material="this.material"></Material>
    <Editor   :material="this.material"></Editor>

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

export default {
  name: 'app',
  data () {
    return {

        material: new MeshToonMaterial({ color: 0xff00ff })

        //material: new MeshPhysicalMaterial({ color: 0xff00ff, roughness: 0.5, metalness: 0.5, clearCoat: 0.1, shading: SmoothShading })
        //material: new MeshPhysicalMaterial({ color: 0xff00ff, roughness: 0.5, metalness: 0.5, shading: SmoothShading })
        //material: new MeshPhysicalMaterial({ color: 0xff00ff, roughness: 0.1, metalness: 0.1, shading: SmoothShading })
        //material: new MeshPhongMaterial({ color: 0xff00ff, shininess: 100, shading: SmoothShading })
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
