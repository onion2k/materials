<template>
    <div class="editor col-sm-3 col-md-4 hidden-xs-down bg-faded sidebar">
        <div class="list-group">
            <div class="list-group-item list-group-item-action justify-content-between">
                Show wireframe
                <input type="checkbox" id="wire" v-model="showwire" v-on:click="updatewire">
            </div>
            <div class="list-group-item justify-content-between">
                <color-picker :value="colors" @input="updateValue"></color-picker>
            </div>
            <div class="list-group-item justify-content-between">
                <span class="align-bottom">Shininess</span>
                <vue-slider ref="slider" v-bind="shiny" v-model="shininess" @input="updateshininess"></vue-slider>
            </div>
            <div class="list-group-item justify-content-between">
                <span class="align-bottom">Color Map</span>
                <vueImageLoader></vueImageLoader>
            </div>

        </div>
    </div>
</template>

<script>

import { Slider } from 'vue-color';
import vueImageLoader from './vueImageLoader.vue';
import vueSlider from 'vue-slider-component';

export default {
  name: 'Editor',
  props: ['materialId', 'materials', 'wire'],
  data: function(){
    return {
        colors: {},
        shininess: 0,
        showwire: this.wire,
        id: this.materialId,
        shiny: { width: '80%', tooltip: 'hover' }
    }
  },
  methods: {
    updateValue: function(color) {
        this.$emit('updatecolor', { 'color': color.hex });
    },
    updateshininess: function() {
        this.$emit('updateshininess', { 'shininess': this.shininess });
    },
    updatewire: function() {
        this.$emit('updatewire', { 'wire': this.showwire });
    },
    change: function(v) {
        this.$emit('change', { 'material': v });
    },
    showSuccess: function(){

    }
  },
  components: {
    'color-picker': Slider,
    vueSlider,
    vueImageLoader
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
