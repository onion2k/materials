<template>
  <div id="app">

    <h1>Three Materials Experiments</h1>

    <Material></Material>
    <Material></Material>
    <Material></Material>

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
