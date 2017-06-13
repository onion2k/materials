<template>
  <div id="app">

    <h1>Three Material Viewer</h1>

    <Material :material="this.material"></Material>

  </div>
</template>

<script>

import {
    MeshPhysicalMaterial,
    MeshPhongMaterial,
    SmoothShading,
    FlatShading
} from '../node_modules/three/build/three.module';

import Material from './components/Material.vue';

export default {
  name: 'app',
  data () {
    return {
        //material: new MeshPhongMaterial({ color: 0xff00ff, shininess: 5, shading: FlatShading })
        material: new MeshPhysicalMaterial({ color: 0xff00ff, roughness: 25, shading: FlatShading })
    }
  },
  components: {
    Material
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
</style>
