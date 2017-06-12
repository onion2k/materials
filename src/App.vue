<template>
  <div id="app">

    <h1>Three Materials Experiments</h1>

    <Material color=0xff0000></Material>
    <Material color=0x00ff00></Material>
    <Material color=0x0000ff></Material>

  </div>
</template>

<script>

import Material from './components/Material.vue';

export default {
  name: 'app',
  data () {
    return {

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
