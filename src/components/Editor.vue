<template>
  <div class="editor">
    <ul>
        <li v-for="(material, index) in materials">
            <a href="#" v-on:click="change(index)">{{ material.name }}</a>
        </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'Editor',
  props: ['materialId', 'materials'],
  data: function(){
    return { 
        id: this.materialId
    }
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
ul {
    list-style: none;
    padding: 0;
    margin: 0;
}
li {
    text-align: left;
}
a {
    color: #ffffff;
    text-decoration: none;
}
</style>
