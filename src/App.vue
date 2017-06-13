<template>
  <div id="app">

    <h1>Three Material Viewer</h1>

    <Material :material="this.material"></Material>

  </div>
</template>

<script>

import {
    MeshPhongMaterial, 
    FlatShading
} from '../node_modules/three/build/three.module';

import Material from './components/Material.vue';

export default {
  name: 'app',
  data () {
    return {
        material: new MeshPhongMaterial({ color: 0xff00ff, shininess: 0, shading: FlatShading })
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
