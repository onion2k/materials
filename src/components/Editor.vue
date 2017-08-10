<template>
    <div class="editor col-sm-12 col-md-6 hidden-xs-down bg-faded sidebar">
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
                <p class="explainer">Select an object to render. THREE.js's object types are included, and a couple of meshes that are loaded from JSON files.</p>
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
                <p class="explainer">The material type is the shader that's used to render the material. Different materials have different capabilities. MeshLambertMaterial is fast, MeshPhysicalMaterial is the highest quality, and MeshPhongMaterial sits in the middle.</p>
                <p class="explainer">ShaderMaterial is special. To use it you need to write a WebGL/GLSL shader that a GPU renders. GLSL is *much* harder to work with but it can do some very clever things. There are a few example shaders included.</p>
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
                <p class="explainer">Sidededness determines which sides of the object's features are drawn. Front is typical. Back turns the object 'inside out'. Both is useful for transparent objects.</p>
            </div>
            <div class="list-group-item justify-content-between" v-bind:class="{ hidden: spec.color!==true }">
                <span class="align-bottom">Color</span>
                <colorLoader :color="color"></colorLoader>
                <p class="explainer">The material's base color. Other textures in the material are multiplied by this color.</p>
            </div>
            <div class="list-group-item justify-content-between" v-bind:class="{ hidden: spec.xrep!==true }">
                <span class="align-bottom">X Repeat</span>
                <vue-slider ref="slider" v-bind="slider" :value="xrepeat" @input="updatexrepeat"></vue-slider>
                <p class="explainer">The number of times the material is repeated across the x axis of the object's surface. <br/>NOTE: Currently in THREE.js it's not possible to have different repeat values for textures in a material. This might change in the future.</p>
            </div>
            <div class="list-group-item justify-content-between" v-bind:class="{ hidden: spec.yrep!==true }">
                <span class="align-bottom">Y Repeat</span>
                <vue-slider ref="slider" v-bind="slider" :value="yrepeat" @input="updateyrepeat"></vue-slider>
                <p class="explainer">The number of times the material is repeated across the y axis of the object's surface.</p>
            </div>

            <div class="list-group-item justify-content-between" v-bind:class="{ hidden: spec.xoff!==true }">
                <span class="align-bottom">X Offset</span>
                <vue-slider ref="slider" v-bind="slider" :value="xoffset" @input="updatexoffset"></vue-slider>
                <p class="explainer">The offset distance for the material in the x axis of the object's surface. <br/>NOTE: Currently in THREE.js it's not possible to have different offset values for textures in a material. This might change in the future.</p>
            </div>
            <div class="list-group-item justify-content-between" v-bind:class="{ hidden: spec.yoff!==true }">
                <span class="align-bottom">Y Offset</span>
                <vue-slider ref="slider" v-bind="slider" :value="yoffset" @input="updateyoffset"></vue-slider>
                <p class="explainer">The offset distance for the material in the y axis of the object's surface.</p>
            </div>

            <mapLoader v-bind:data="colorMapData"></mapLoader>
            <mapLoader v-bind:data="alphaMapData"></mapLoader>
            <mapLoader v-bind:data="bumpMapData"></mapLoader>
            <mapLoader v-bind:data="emissiveMapData"></mapLoader>
            <mapLoader v-bind:data="aoMapData"></mapLoader>
            <mapLoader v-bind:data="normalMapData"></mapLoader>
            <mapLoader v-bind:data="displacementMapData"></mapLoader>
            <mapLoader v-bind:data="lightMapData"></mapLoader>
            <mapLoader v-bind:data="specularMapData"></mapLoader>
            <mapLoader v-bind:data="envMapData"></mapLoader>
            <div class="list-group-item justify-content-between" v-bind:class="{ hidden: spec.shininess!==true }">
                <span class="align-bottom">Shininess</span>
                <vue-slider ref="slider" v-bind="slider" :value="shininess" @input="updateshininess"></vue-slider>
            </div>
            <div class="list-group-item justify-content-between" v-bind:class="{ hidden: spec.roughness!==true }">
                <span class="align-bottom">Roughness</span>
                <vue-slider ref="slider" v-bind="slider" :value="roughness" @input="updateroughness"></vue-slider>
            </div>
            <mapLoader v-bind:data="roughnessMapData"></mapLoader>
            <div class="list-group-item justify-content-between" v-bind:class="{ hidden: spec.metalness!==true }">
                <span class="align-bottom">Metalness</span>
                <vue-slider ref="slider" v-bind="slider" :value="metalness" @input="updatemetalness"></vue-slider>
                <p class="explainer">Metalness describes the ratio material's ratio between being a dialetric and a metal. This should really be 0 (dialetric) or 1 (metal). Anything in between is rare.</p>
            </div>
            <mapLoader v-bind:data="metalnessMapData"></mapLoader>
            <div class="list-group-item justify-content-between" v-bind:class="{ hidden: spec.clearCoat!==true }">
                <span class="align-bottom">Clearcoat</span>
                <vue-slider ref="slider" v-bind="slider" :value="clearcoat" @input="updateclearcoat"></vue-slider>
            </div>
            <div class="list-group-item justify-content-between" v-bind:class="{ hidden: spec.clearCoatRoughness!==true }">
                <span class="align-bottom">Clearcoard Roughness</span>
                <vue-slider ref="slider" v-bind="slider" :value="clearcoatRoughness" @input="updateclearcoatroughness"></vue-slider>
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

                <div class="btn-group col-xs-12">
                    <button class="btn btn-secondary dropdown-toggle btn-fullwidth text-left" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Load Shader
                    </button>
                    <div class="dropdown-menu col-xs-12">
                        <button class="dropdown-item" type="button" v-on:click="loadShader('Checkerboard')">Checkerboard</button>
                        <button class="dropdown-item" type="button" v-on:click="loadShader('Checkerboard2')">Checkerboard 2</button>
                    </div>
                </div>

            </div>

            <div class="list-group-item justify-content-between" v-bind:class="{ hidden: spec.uniforms!==true }">
                <span class="align-top">Uniforms</span>
                <textarea name="uniforms" v-model="uniforms" v-on:blur="updateuniforms">{{ uniforms }}</textarea>
            </div>

            <div class="list-group-item justify-content-between" v-bind:class="{ hidden: spec.fragmentShader!==true }">
                <span class="align-top">Fragment Shader</span>
                <textarea name="fShader" v-model="fragmentShader" v-on:blur="updateuniforms">{{ fragmentShader }}</textarea>
            </div>

            <div class="list-group-item justify-content-between" v-bind:class="{ hidden: spec.vertexShader!==true }">
                <span class="align-top">Vertex Shader</span>
                <textarea name="vShader" v-model="vertexShader" v-on:blur="updateuniforms">{{ vertexShader }}</textarea>
            </div>

            <div class="list-group-item justify-content-between" v-bind:class="{ hidden: spec.uniforms!==true }">
                <button v-on:click="updateShader()">Update</button>
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

      uniforms: function(){ return JSON.stringify(this.$store.state.shader.uniforms, null, '  '); },
      fragmentShader: function(){ return this.$store.state.shader.fragmentShader; },
      vertexShader: function(){ return this.$store.state.shader.vertexShader; },

        colorMapData: function(){
            return {
                spec: this.spec.map,
                title: 'Color Map',
                description: 'Map an image\'s color data to the object.',
                explainer: 'A texture that is mapped to the objects UV coordinates that affects the color. The texture is multiplied by the base color in the shader to get the pixel color.',
                namespace: 'colormap'
            }
        },

        alphaMapData:  function(){
            return {
            spec: this.spec.alphaMap,
            title: 'Alpha Map',
            description: 'Map an image\'s blue channel to the object\s transparency.',
            explainer: 'A texture that determines the material\'s alpha (transparency).',
            namespace: 'alphamap'
            }
        },
        bumpMapData:  function(){
            return {
            spec: this.spec.bumpMap,
            title: 'Bump Map',
            description: 'Map an image\'s black/white values as a bumpy texture on the object.',
            explainer: 'A texture that modifies the material to add a bumpiness to the surface by multipling the color with a light color determined by the angle of incidence. NOTE: This doesn\'t affect the actual geometry of the object.',
            namespace: 'bumpmap',
            sliderTitle: 'Scale'
            }
        },
        emissiveMapData:  function(){
            return {
            spec: this.spec.emissiveMap,
            title: 'Emissive Map',
            description: 'Map an image\'s green channel as the object\s emissive light.',
            explainer: 'A texture that simulates light emitted from the material. These aren\'t actual lights so they won\'t show on other materials though.',
            namespace: 'emissivemap',
            sliderTitle: 'Intensity'
            }
        },
        aoMapData:  function(){
            return {
            spec: this.spec.aoMap,
            title: 'Ambient occlusion Map',
            description: 'Map an image\'s color data as the object\s abmient occlusion.',
            explainer: 'Use the red channel of a texture to add ambient occulusion. Requires a seconds set of UVs.',
            namespace: 'aomap'
            }
        },
        lightMapData:  function(){
            return {
            spec: this.spec.lightMap,
            title: 'Light Map',
            description: 'Map an image\'s green channel as the object\s lights.',
            explainer: 'A lightmap texture (not sure what this actually does yet). Requires a seconds set of UVs.',
            namespace: 'lightmap'
            }
        },
        specularMapData:  function(){
            return {
            spec: this.spec.specularMap,
            title: 'Specular Map',
            description: 'Map an image\'s blue channel as the object\s specular reflectivity.',
            explainer: 'A texture that controls the specular shininess of an object.',
            namespace: 'specularmap',
            sliderTitle: 'Intensity'
            }
        },
        envMapData:  function(){
            return {
            spec: this.spec.envMap,
            title: 'Environment Map',
            description: '',
            explainer: 'An environment texture (technically a texture cube) that the material uses for reflections.',
            namespace: 'envmap'
            }
        },
        roughnessMapData:  function(){
            return {
            spec: this.spec.roughnessMap,
            title: 'Roughness Map',
            description: '',
            explainer: 'In a physical material the roughness controls the scattering of light hitting the surface. The roughness map enables you to have areas of shininess and roughness.',
            namespace: 'roughnessmap'
            }
        },
        metalnessMapData:  function(){
            return {
            spec: this.spec.metalnessMap,
            title: 'Metal Map',
            description: '',
            namespace: 'metalnessmap'
            }
        },
        normalMapData:  function(){
            return {
            spec: this.spec.normalMap,
            title: 'Normal Map',
            description: '',
            namespace: 'normalmap'
            }
        },
        displacementMapData:  function(){
            return {
            spec: this.spec.displacementMap,
            title: 'Displacement Map',
            description: '',
            explainer: 'Displacement maps are used to modify the vertex positions - they actually modify the geometry.',
            namespace: 'displacementmap'
            }
        }

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
    loadShader: function(shader){
        this.$store.dispatch('shader/loadshader', { 'shader': shader });
        this.$emit('updateshader', { 'shader': true });
    },
    updatewire: function() {
        this.$emit('updatewire', { 'wire': this.showwire });
    },
    updateshadow: function() {
        this.$emit('updateshadows', { 'shadow': this.showshadow });
    },
    showcolors: function(){
        this.colorModal = !this.colorModal;
    },
    updateShader: function(){
        this.$emit('updateshader', { 'shader': true });
    },
    updateuniforms: function(e){
        this.$store.commit('shader/updateUniforms', { 'uniforms': JSON.parse(e.target.value) });
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
    width: 100%;
    margin-top: 5px;
    margin-bottom: 5px;
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
    width: 100%;
    min-height: 200px;
    border: 1px dashed #bbb;
    font-family: courier;
    font-size: 12px;
    margin: 10px 0 0 0;
    padding: 5px;
    white-space: pre;
    tab-size: 2; 
}

</style>
