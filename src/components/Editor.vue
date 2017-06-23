<template>
    <div class="editor col-sm-3 col-md-4 hidden-xs-down bg-faded sidebar">
        <div class="list-group">
            <div class="list-group-item list-group-item-action justify-content-between">
                <div class="btn-group col-xs-12">
                    <button class="btn btn-secondary dropdown-toggle btn-fullwidth" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Material Type: {{ materialTypeSelected }}
                    </button>
                    <div class="dropdown-menu col-xs-12">
                        <button class="dropdown-item" type="button" v-for="material in materialTypes">{{ material }}</button>
                    </div>
                </div>
            </div>
            <div class="list-group-item justify-content-between">
                <span class="align-bottom">Shininess</span>
                <vue-slider ref="slider" v-bind="shiny" v-model="shininess" @input="updateshininess"></vue-slider>
            </div>
            <div class="list-group-item justify-content-between">
                <span class="align-bottom">Color</span>
                <color-picker :value="colors" @input="updateValue"></color-picker>
            </div>
            <div class="list-group-item justify-content-between">
                <span class="align-bottom">Color Map</span>
                <vueImageLoader v-on:imageLoaded="colorMap"></vueImageLoader>
            </div>
            <div class="list-group-item justify-content-between">
                <span class="align-bottom">Bump Map</span>
                <vueImageLoader v-on:imageLoaded="bumpMap"></vueImageLoader>
            </div>
            <div class="list-group-item justify-content-between">
                <span class="align-bottom">Alpha Map</span>
                <vueImageLoader v-on:imageLoaded="alphaMap"></vueImageLoader>
            </div>
            <div class="list-group-item justify-content-between">
                <span class="align-bottom">Emissive Map</span>
                <vueImageLoader v-on:imageLoaded="emissiveMap"></vueImageLoader>
            </div>
            <div class="list-group-item justify-content-between">
                <span class="align-bottom">Intensity</span>
                <vue-slider ref="slider" v-bind="intense" v-model="intensity" @input="updateintensity"></vue-slider>
            </div>
            <div class="list-group-item list-group-item-action justify-content-between">
                Show wireframe
                <input type="checkbox" id="wire" v-model="showwire" v-on:click="updatewire">
            </div>
        </div>
    </div>
</template>

<script>

import { Sketch } from 'vue-color';
import vueImageLoader from './vueImageLoader.vue';
import vueSlider from 'vue-slider-component';

export default {
  name: 'Editor',
  props: ['materialId', 'materials', 'wire'],
  data: function(){
    return {
        colors: {},
        shininess: 0,
        intensity: 0,
        showwire: this.wire,
        id: this.materialId,
        shiny: { width: '80%', tooltip: 'hover' },
        intense: { width: '80%', tooltip: 'hover' },
        materialTypes: ['Basic','Lambert','Phone','Standard','Physical','Toon','Shader'],
        materialTypeSelected: 'Basic'
    }
  },
  methods: {
    updateValue: function(color) {
        this.$emit('updatecolor', { 'r': color.rgba.r, 'g': color.rgba.g, 'b': color.rgba.b });
    },
    updateshininess: function() {
        this.$emit('updateshininess', { 'shininess': this.shininess });
    },
    updateintensity: function() {
        this.$emit('updateintensity', { 'intensity': this.intensity });
    },
    updatewire: function() {
        this.$emit('updatewire', { 'wire': this.showwire });
    },
    change: function(v) {
        this.$emit('change', { 'material': v });
    },
    colorMap: function(image){
        this.$emit('colorMap', image);
    },
    bumpMap: function(image){
        this.$emit('bumpMap', image);
    },
    alphaMap: function(image){
        this.$emit('alphaMap', image);
    },
    emissiveMap: function(image){
        this.$emit('emissiveMap', image);
    }
  },
  components: {
    'color-picker': Sketch,
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

.btn-group, .btn-fullwidth { width: 100%; }
.dropdown-menu { width: 100%; }
</style>
