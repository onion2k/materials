<template>
  <div class="editor">
    <div>Editor: {{ id }}</div>
      <div v-on:click="change(0)">Toon 1</div>
      <div v-on:click="change(1)">Phong 1</div>
      <div v-on:click="change(2)">Physical 1</div>
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
