<template>
    <div class="editor col-sm-3 col-md-4 hidden-xs-down bg-faded sidebar">
        <h1>Material Examples</h1>
        <div class="list-group">

            <div class="list-group-item list-group-item-action justify-content-between">
                Show wireframe
                <input type="checkbox" id="wire" v-model="showwire" v-on:click="updatewire">
            </div>
            <div class="list-group-item justify-content-center">
                <color-picker :value="colors" @input="updateValue"></color-picker>
            </div>

            <a v-for="(material, index) in materials" href="#" v-on:click="change(index)" class="list-group-item list-group-item-action">{{ material.name }}</a>

        </div>
    </div>
</template>

<script>

import { Sketch } from 'vue-color';

export default {
  name: 'Editor',
  props: ['materialId', 'materials', 'wire'],
  data: function(){
    return {
        colors: {},
        showwire: this.wire,
        id: this.materialId
    }
  },
  methods: {
    updateValue: function(color) {
        this.$emit('updatecolor', { 'color': color.hex });
    },
    updatewire: function() {
        this.$emit('updatewire', { 'wire': this.showwire });
    },
    change: function(v) {
        this.$emit('change', { 'material': v });
    }
  },
  components: {
    'color-picker': Sketch
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
