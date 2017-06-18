<template>
  <div class="editor">
    <ul>
        <li v-for="(material, index) in materials">
            <a href="#" v-on:click="change(index)">{{ material.name }}</a>
        </li>
    </ul>
    <label>
        <input type="checkbox" id="wire" v-model="showwire" v-on:click="updatewire">
    </label>
  </div>
</template>

<script>

export default {
  name: 'Editor',
  props: ['materialId', 'materials', 'wire'],
  data: function(){
    return {
        showwire: this.wire,
        id: this.materialId
    }
  },
  methods: {
    updatewire: function() {
        this.$emit('updatewire', { 'wire': this.showwire });
    },
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
    text-decoration: none;
}
</style>
