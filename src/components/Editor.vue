<template>
  <div class="editor">
    <div>Editor: {{ id }}</div>
    <a v-on:click="change('toon1')">Toon 1</a>
    <a v-on:click="change('phong1')">Phong 1</a>
    <a v-on:click="change('physical1')">Physical 1</a>
  </div>
</template>

<script>

export default {
  name: 'Editor',
  props: ['materialId'],
  data: function(){
      return { id: this.materialId }
  },
  methods: {
    change: function(v) {
        this.$emit('change', { 'material': v });
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
