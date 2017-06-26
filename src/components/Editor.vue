<template>
    <div class="editor col-sm-12 col-md-6 hidden-xs-down bg-faded sidebar">
        <div class="list-group">
            <div class="list-group-item list-group-item-action justify-content-between">
                <div class="btn-group col-xs-12">
                    <button class="btn btn-secondary dropdown-toggle btn-fullwidth" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Material Type: {{ materialTypeSelected }}
                    </button>
                    <div class="dropdown-menu col-xs-12">
                        <button class="dropdown-item" type="button" v-for="material in materialTypes" v-on:click="materialSelector(material)" v-bind:class="{ active: material===materialTypeSelected }">{{ material }}</button>
                    </div>
                </div>
            </div>
            <div class="list-group-item justify-content-between">
                <span class="align-bottom">Shininess</span>
                <vue-slider ref="slider" v-bind="shiny" v-model="shininess" @input="updateshininess"></vue-slider>
            </div>
            <div class="list-group-item justify-content-between">
                <span class="align-bottom">Color</span>
                <div v-bind:style="color" id="colors" v-on:click.self="showcolors">
                    <div v-if="colormodal" id="colorsmodal">
                        <color-picker :value="colors" @input="updateValue"></color-picker>
                    </div>
                </div>
            </div>
            <div class="list-group-item justify-content-between">
                <span class="align-bottom">Color Map</span>
                <mapLoader v-on:imageLoaded="colorMap" v-bind:data="colorMapData"></mapLoader>
            </div>
            <div class="list-group-item justify-content-between">
                <span class="align-bottom">Bump Map</span>
                <mapLoader v-on:imageLoaded="bumpMap" v-bind:data="bumpMapData"></mapLoader>
            </div>
            <div class="list-group-item justify-content-between">
                <span class="align-bottom">Alpha Map</span>
                <mapLoader v-on:imageLoaded="alphaMap" v-bind:data="alphaMapData"></mapLoader>
            </div>
            <div class="list-group-item justify-content-between">
                <span class="align-bottom">Emissive Map</span>
                <mapLoader v-on:imageLoaded="emissiveMap" v-bind:data="emissiveMapData"></mapLoader>
            </div>
            <div class="list-group-item justify-content-between">
                <span class="align-bottom">AO Map</span>
                <mapLoader v-on:imageLoaded="occlusionMap" v-bind:data="occlusionMapData"></mapLoader>
            </div>
            <div class="list-group-item justify-content-between">
                <span class="align-bottom">Light Map</span>
                <mapLoader v-on:imageLoaded="lightMap" v-bind:data="lightMapData"></mapLoader>
            </div>
            <div class="list-group-item justify-content-between">
                <span class="align-bottom">Specular Map</span>
                <mapLoader v-on:imageLoaded="specularMap" v-bind:data="specularMapData"></mapLoader>
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
import mapLoader from './mapLoader.vue';
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
        shiny: { width: '60%', tooltip: 'hover' },
        materialTypes: ['Basic','Lambert','Phong','Standard','Physical','Toon','Shader'],
        materialTypeSelected: 'Basic',
        colormodal: false,
        color: { 'background-color': '#fff' },
        colorMapData: {
            title: 'Color Map',
            description: 'Map an image\'s color data to the object.'
        },
        bumpMapData: {
            title: 'Bump Map',
            description: 'Map an image\'s green channel as a bumpy texture on the object.'
        },
        alphaMapData: {
            title: 'Alpha Map',
            description: 'Map an image\'s blue channel to the object\s transparency.'
        },
        emissiveMapData: {
            title: 'Emissive Map',
            description: 'Map an image\'s green channel as the object\s emissive light.',
            sliderUpdateEvent: 'updateEmissiveIntensity',
            sliderValue: 50
        },
        occlusionMapData: {
            title: 'Ambient occlusion Map',
            description: 'Map an image\'s color data as the object\s abmient occlusion.'
        },
        lightMapData: {
            title: 'Light Map',
            description: 'Map an image\'s green channel as the object\s lights.'
        },
        specularMapData: {
            title: 'Specular Map',
            description: 'Map an image\'s blue channel as the object\s specular reflectivity.'
        }
    }
  },
  methods: {
    materialSelector: function(material){
        this.materialTypeSelected = material;
    },
    updateValue: function(color) {
        this.color = { 'background-color': color.hex };
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
    occlusionMap: function(image){
        this.$emit('occlusionMap', image);
    },
    emissiveMap: function(image){
        this.$emit('emissiveMap', image);
    },
    lightMap: function(image){
        this.$emit('lightMap', image);
    },
    specularMap: function(image){
        this.$emit('specularMap', image);
    },
    showcolors: function(){
        this.colormodal = !this.colormodal;
    }
  },
  components: {
    'color-picker': Sketch,
    vueSlider,
    mapLoader
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

#colors {
    position: relative;
    width: 60%;
    height: 30px;
    background-color: #ff0;
    border: #bbb dashed 1px;
}
#colorsmodal {
    position: absolute;
    top: -80px;
    right: -10px;
    z-index: 99;
}
</style>
