<template>
    <div class="editor col-sm-12 col-md-6 hidden-xs-down bg-faded sidebar">
        Editing {{ materialTypeSelected }}
        <div class="list-group">
            <div class="list-group-item list-group-item-action">
                <div class="btn-group col-xs-12">
                    <button class="btn btn-secondary dropdown-toggle btn-fullwidth text-left" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Geometry Type: {{ geometry }}
                    </button>
                    <div class="dropdown-menu col-xs-12">
                        <button class="dropdown-item" type="button" v-on:click="geoSelector('SphereGeometry')">Sphere</button>
                        <button class="dropdown-item" type="button" v-on:click="geoSelector('BoxGeometry')">Box</button>
                        <button class="dropdown-item" type="button" v-on:click="geoSelector('TorusKnotGeometry')">Torus Knot</button>
                        <button class="dropdown-item" type="button" v-on:click="geoSelector('ConeGeometry')">Cone</button>
                        <button class="dropdown-item" type="button" v-on:click="geoSelector('TorusGeometry')">Torus</button>
                        <button class="dropdown-item" type="button" v-on:click="geoSelector('IcosahedronGeometry')">Icosahedron</button>
                        <button class="dropdown-item" type="button" v-on:click="geoSelector('Flower')">Flower</button>
                        <button class="dropdown-item" type="button" v-on:click="geoSelector('Windmill')">Windmill</button>
                    </div>
                </div>
            </div>
            <div class="list-group-item">
                <materialList></materialList>
            </div>
            <div class="list-group-item list-group-item-action">
                <div class="btn-group col-xs-12">
                    <button class="btn btn-secondary dropdown-toggle btn-fullwidth text-left" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Material Type: {{ materialTypeSelected }}
                    </button>
                    <div class="dropdown-menu col-xs-12">
                        <button class="dropdown-item" type="button" v-for="material in materialTypes" v-on:click="materialSelector(material)" v-bind:class="{ active: material===materialTypeSelected }">{{ material }}</button>
                    </div>
                </div>
            </div>
            <div class="list-group-item list-group-item-action">
                <button class="btn btn-secondary dropdown-toggle btn-fullwidth text-left" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Sidedness:
                </button>
                <div class="dropdown-menu col-xs-12">
                    <button class="dropdown-item" type="button" v-on:click="sidednessSelector('front')">Front</button>
                    <button class="dropdown-item" type="button" v-on:click="sidednessSelector('back')">Back</button>
                    <button class="dropdown-item" type="button" v-on:click="sidednessSelector('double')">Double</button>
                </div>
            </div>
            <div class="list-group-item justify-content-between" v-bind:class="{ hidden: spec.color!==true }">
                <span class="align-bottom">Color</span>
                <colorLoader :color="color"></colorLoader>
            </div>
            <div class="list-group-item justify-content-between" v-bind:class="{ hidden: spec.xrep!==true }">
                <span class="align-bottom">X Repeat</span>
                <vue-slider ref="slider" v-bind="slider" v-model="xrepeat" @input="updatexrepeat"></vue-slider>
            </div>
            <div class="list-group-item justify-content-between" v-bind:class="{ hidden: spec.yrep!==true }">
                <span class="align-bottom">Y Repeat</span>
                <vue-slider ref="slider" v-bind="slider" v-model="yrepeat" @input="updateyrepeat"></vue-slider>
            </div>

            <div class="list-group-item justify-content-between" v-bind:class="{ hidden: spec.xoff!==true }">
                <span class="align-bottom">X Offset</span>
                <vue-slider ref="slider" v-bind="slider" v-model="xoffset" @input="updatexoffset"></vue-slider>
            </div>
            <div class="list-group-item justify-content-between" v-bind:class="{ hidden: spec.yoff!==true }">
                <span class="align-bottom">Y Offset</span>
                <vue-slider ref="slider" v-bind="slider" v-model="yoffset" @input="updateyoffset"></vue-slider>
            </div>

            <div class="list-group-item justify-content-between" v-bind:class="{ hidden: spec.map!==true }">
                <span class="align-bottom">Color Map</span>
                <mapLoader v-bind:data="colorMapData"></mapLoader>
            </div>
            <div class="list-group-item justify-content-between" v-bind:class="{ hidden: spec.alphaMap!==true }">
                <span class="align-bottom">Alpha Map</span>
                <mapLoader v-bind:data="alphaMapData"></mapLoader>
            </div>
            <div class="list-group-item justify-content-between" v-bind:class="{ hidden: spec.bumpMap!==true }">
                <span class="align-bottom">Bump Map</span>
                <mapLoader v-bind:data="bumpMapData"></mapLoader>
            </div>
            <div class="list-group-item justify-content-between" v-bind:class="{ hidden: spec.emissiveMap!==true }">
                <span class="align-bottom">Emissive Map</span>
                <mapLoader v-bind:data="emissiveMapData"></mapLoader>
            </div>
            <div class="list-group-item justify-content-between" v-bind:class="{ hidden: spec.aoMap!==true }">
                <span class="align-bottom">AO Map</span>
                <mapLoader v-bind:data="aoMapData"></mapLoader>
            </div>
            <div class="list-group-item justify-content-between" v-bind:class="{ hidden: spec.normalMap!==true }">
                <span class="align-bottom">Normal Map</span>
                <mapLoader v-bind:data="normalMapData"></mapLoader>
            </div>
            <div class="list-group-item justify-content-between" v-bind:class="{ hidden: spec.displacementMap!==true }">
                <span class="align-bottom">Displacement Map</span>
                <mapLoader v-bind:data="displacementMapData"></mapLoader>
            </div>
            <div class="list-group-item justify-content-between" v-bind:class="{ hidden: spec.lightMap!==true }">
                <span class="align-bottom">Light Map</span>
                <mapLoader v-bind:data="lightMapData"></mapLoader>
            </div>
            <div class="list-group-item justify-content-between" v-bind:class="{ hidden: spec.specularMap!==true }">
                <span class="align-bottom">Specular Map</span>
                <mapLoader v-bind:data="specularMapData"></mapLoader>
            </div>
            <div class="list-group-item justify-content-between" v-bind:class="{ hidden: spec.envMap!==true }">
                <span class="align-bottom">Environment Map</span>
                <mapLoader v-bind:data="envMapData"></mapLoader>
            </div>
            <div class="list-group-item justify-content-between" v-bind:class="{ hidden: spec.shininess!==true }">
                <span class="align-bottom">Shininess</span>
                <vue-slider ref="slider" v-bind="slider" v-model="shininess" @input="updateshininess"></vue-slider>
            </div>
            <div class="list-group-item justify-content-between" v-bind:class="{ hidden: spec.roughness!==true }">
                <span class="align-bottom">Roughness</span>
                <vue-slider ref="slider" v-bind="slider" v-model="roughness" @input="updateroughness"></vue-slider>
            </div>
            <div class="list-group-item justify-content-between" v-bind:class="{ hidden: spec.roughnessMap!==true }">
                <span class="align-bottom">Roughness Map</span>
                <mapLoader v-bind:data="roughnessMapData"></mapLoader>
            </div>
            <div class="list-group-item justify-content-between" v-bind:class="{ hidden: spec.metalness!==true }">
                <span class="align-bottom">Metalness</span>
                <vue-slider ref="slider" v-bind="slider" v-model="metalness" @input="updatemetalness"></vue-slider>
                <p class="explainer">Metalness describes the ratio material\'s ratio between being a dialetric and a metal. This should really be 0 (dialetric) or 1 (metal). Anything in between is rare.</p>
            </div>
            <div class="list-group-item justify-content-between" v-bind:class="{ hidden: spec.metalnessMap!==true }">
                <span class="align-bottom">Metalness Map</span>
                <mapLoader v-bind:data="metalnessMapData"></mapLoader>
            </div>
            <div class="list-group-item justify-content-between" v-bind:class="{ hidden: spec.clearCoat!==true }">
                <span class="align-bottom">Clearcoat</span>
                <vue-slider ref="slider" v-bind="slider" v-model="clearcoat" @input="updateclearcoat"></vue-slider>
            </div>
            <div class="list-group-item justify-content-between" v-bind:class="{ hidden: spec.clearCoatRoughness!==true }">
                <span class="align-bottom">Clearcoard Roughness</span>
                <vue-slider ref="slider" v-bind="slider" v-model="clearcoatRoughness" @input="updateclearcoatroughness"></vue-slider>
            </div>
            <div class="list-group-item justify-content-between" v-bind:class="{ hidden: spec.combine!==true }">
                <button class="btn btn-secondary dropdown-toggle btn-fullwidth text-left" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Combine Op:
                </button>
                <div class="dropdown-menu col-xs-12">
                    <button class="dropdown-item" type="button" v-on:click="combineSelector('multiply')">Multiply</button>
                    <button class="dropdown-item" type="button" v-on:click="combineSelector('mix')">Mix</button>
                    <button class="dropdown-item" type="button" v-on:click="combineSelector('add')">Add</button>
                </div>

            </div>
            <div class="list-group-item justify-content-between" v-bind:class="{ hidden: spec.reflectivity!==true }">
                <span class="align-bottom">Reflectivity</span>
            </div>
            <div class="list-group-item justify-content-between" v-bind:class="{ hidden: spec.refractionRatio!==true }">
                <span class="align-bottom">Refraction Ratio</span>
            </div>

            <div class="list-group-item justify-content-between" v-bind:class="{ hidden: spec.fragmentShader!==true }">
                <span class="align-top">Load Shader</span>
            </div>

            <div class="list-group-item justify-content-between" v-bind:class="{ hidden: spec.uniforms!==true }">
                <span class="align-top">Uniforms</span>
                <textarea name="uniforms">{{ uniforms }}</textarea>
            </div>

            <div class="list-group-item justify-content-between" v-bind:class="{ hidden: spec.fragmentShader!==true }">
                <span class="align-top">Fragment Shader</span>
                <textarea name="fShader">{{ fragmentShader }}</textarea>
            </div>

            <div class="list-group-item justify-content-between" v-bind:class="{ hidden: spec.vertexShader!==true }">
                <span class="align-top">Vertex Shader</span>
                <textarea name="vShader">{{ vertexShader }}</textarea>
            </div>

            <div class="list-group-item list-group-item-action justify-content-between">
                Show wireframe
                <input type="checkbox" id="wire" v-model="showwire" v-on:click="updatewire">
            </div>
            <div class="list-group-item list-group-item-action justify-content-between">
                Show shadows
                <input type="checkbox" id="shadows" v-model="showshadow" v-on:click="updateshadow">
            </div>
        </div>
    </div>
</template>

<script>

import MaterialList from './MaterialList.vue';
import colorLoader from './colorLoader.vue';
import mapLoader from './mapLoader.vue';
import vueSlider from 'vue-slider-component';
import materialSpecs from '../material_defs';

export default {
  name: 'Editor',
  props: ['materials', 'wire', 'shadow', 'materialTypeSelected'],
  data: function(){
    return {
        id: this.materialId,

        editorSpec: {},

        materialTypes: ['MeshBasicMaterial','MeshLambertMaterial','MeshPhongMaterial','MeshStandardMaterial','MeshPhysicalMaterial','MeshToonMaterial','ShaderMaterial'],

        showwire: this.wire,
        showshadow: this.shadow,

        slider: { width: '60%', tooltip: 'hover' },

        colorModal: false,

        alphaMapData: {
            title: 'Alpha Map',
            description: 'Map an image\'s blue channel to the object\s transparency.',
            namespace: 'alphamap'
        },
        bumpMapData: {
            title: 'Bump Map',
            description: 'Map an image\'s green channel as a bumpy texture on the object.',
            namespace: 'bumpmap',
            sliderTitle: 'Scale'
        },
        colorMapData: {
            title: 'Color Map',
            description: 'Map an image\'s color data to the object.',
            namespace: 'colormap'
        },
        emissiveMapData: {
            title: 'Emissive Map',
            description: 'Map an image\'s green channel as the object\s emissive light.',
            namespace: 'emissivemap',
            sliderTitle: 'Intensity'
        },
        aoMapData: {
            title: 'Ambient occlusion Map',
            description: 'Map an image\'s color data as the object\s abmient occlusion.',
            namespace: 'aomap'
        },
        lightMapData: {
            title: 'Light Map',
            description: 'Map an image\'s green channel as the object\s lights.',
            namespace: 'lightmap'
        },
        specularMapData: {
            title: 'Specular Map',
            description: 'Map an image\'s blue channel as the object\s specular reflectivity.',
            namespace: 'specularmap',
            sliderTitle: 'Intensity'
        },
        envMapData: {
            title: 'Environment Map',
            description: '',
            namespace: 'envmap'
        },
        roughnessMapData: {
            title: 'Roughness Map',
            description: '',
            namespace: 'roughnessmap'
        },
        metalnessMapData: {
            title: 'Metal Map',
            description: '',
            namespace: 'metalnessmap'
        },
        normalMapData: {
            title: 'Normal Map',
            description: '',
            namespace: 'normalmap'
        },
        displacementMapData: {
            title: 'Displacement Map',
            description: '',
            namespace: 'displacementmap'
        }
    }
  },
  computed: {
      spec: function() { return materialSpecs[this.materialTypeSelected]; },
      geometry:function(){ return this.$store.state.properties.geometry; },
      xrepeat: function(){ return this.$store.state.properties.repeat.x; },
      yrepeat: function(){ return this.$store.state.properties.repeat.y; },
      xoffset: function(){ return this.$store.state.properties.offset.x; },
      yoffset: function(){ return this.$store.state.properties.offset.y; },
      color: function(){ return this.$store.state.properties.color; },
      shininess: function(){ return this.$store.state.properties.shininess; },
      reflectivity: function(){ return this.$store.state.properties.reflectivity; },
      roughness: function(){ return this.$store.state.properties.roughness; },
      metalness: function(){ return this.$store.state.properties.metalness; },
      clearcoat: function(){ return this.$store.state.properties.clearcoat; },
      clearcoatRoughness: function(){ return this.$store.state.properties.clearcoatRoughness; },

      uniforms: function(){ return this.$store.state.shader.uniforms; },
      fragmentShader: function(){ return this.$store.state.shader.fragmentShader; },
      vertexShader: function(){ return this.$store.state.shader.vertexShader; }

  },
  methods: {
    geoSelector: function(geometry){
        this.$store.commit('properties/updategeometry', { 'geometry': geometry });
    },
    materialSelector: function(material){
        this.$store.commit('properties/updatematerial', { 'material': material });
    },
    sidednessSelector: function(sidedness){
        this.$store.commit('properties/updatesidedness', { 'sidedness': sidedness });
    },
    combineSelector: function(combine){
        this.$store.commit('properties/updatecombine', { 'combine': combine });
    },
    updatexrepeat: function(val) {
        this.$store.commit('properties/updatexrepeat', { 'x': val });
    },
    updateyrepeat: function(val) {
        this.$store.commit('properties/updateyrepeat', { 'y': val });
    },
    updatexoffset: function(val) {
        this.$store.commit('properties/updatexoffset', { 'x': val });
    },
    updateyoffset: function(val) {
        this.$store.commit('properties/updateyoffset', { 'y': val });
    },
    updatecolor: function(color) {
        this.$store.commit('properties/updateColor', { 'r': color.rgba.r, 'g': color.rgba.g, 'b': color.rgba.b });
    },
    updateshininess: function(shininess) {
        this.$store.commit('properties/updateShininess', { 'shininess': shininess });
    },
    updatereflectivity: function(reflectivity) {
        this.$store.commit('properties/updateReflectivity', { 'reflectivity': reflectivity });
    },
    updateclearcoat: function(clearcoat) {
        this.$store.commit('properties/updateClearcoat', { 'clearcoat': clearcoat });
    },
    updateclearcoatroughness: function(clearcoatRoughness) {
        this.$store.commit('properties/updateClearcoatRoughness', { 'clearcoatRoughness': clearcoatRoughness });
    },
    updatemetalness: function(metalness) {
        this.$store.commit('properties/updateMetalness', { 'metalness': metalness });
    },
    updateroughness: function(roughness) {
        this.$store.commit('properties/updateRoughness', { 'roughness': roughness });
    },
    updatewire: function() {
        this.$emit('updatewire', { 'wire': this.showwire });
    },
    updateshadow: function() {
        this.$emit('updateshadows', { 'shadow': this.showshadow });
    },
    showcolors: function(){
        this.colorModal = !this.colorModal;
    }
  },
  components: {
    MaterialList,
    colorLoader,
    vueSlider,
    mapLoader
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.editor {

}

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
.explainer {
    margin-top: 5px;
    font-size: 0.75rem;
    text-align: left;
}
.btn-group, .btn-fullwidth { width: 100%; }
.dropdown-menu { width: 100%; }

#colors {
    position: relative;
    width: 60%;
    height: 30px;
    background-color: #fff;
    border: #bbb dashed 1px;
}

#colorsmodal {
    position: absolute;
    top: -80px;
    right: -10px;
    z-index: 99;
}

.disabled {
    pointer-events: none;
    border-color: #e2e2e2;
    color: #ccc;
    background-color: #f8f8f8;
}

.disabled #colors {
    background-color: #f8f8f8 !important;
}

.hidden {
    display: none;
}

.disabled > .map {
    background-color: #f8f8f8;
}

textarea {
    width: 60%;
    min-height: 200px;
    border: 1px dashed #bbb;
    font-family: courier;
    font-size: 12px;
    padding: 0;
    white-space: pre;
    tab-size: 2; 
}

</style>
