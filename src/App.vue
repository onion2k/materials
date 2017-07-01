<template>
    <div id="app" class="container-fluid">
      <div class="row">
        <Material :materialId="this.materialId" :material="this.material" :wire="this.wire" :shadow="this.shadow"></Material>
        <Editor 
            :spec="this.materialSpec" 
            :materialTypeSelected="this.materialTypeSelected"
            :materialId="this.materialId" 
            :wire="this.wire"
            :shadow="this.shadow"
            v-on:updatematerial="updatematerial" 
            v-on:updatewire="updatewire"
            v-on:updateshadows="updateshadows">
        </Editor>
      </div>
    </div>
</template>

<script>

import {
    MeshBasicMaterial,
    MeshStandardMaterial,
    MeshPhysicalMaterial,
    MeshPhongMaterial,
    MeshLambertMaterial,
    MeshToonMaterial,
    ShaderMaterial,
    SmoothShading,
    FlatShading,
    Texture,
    RepeatWrapping,
    LinearFilter,
    ImageUtils
} from '../node_modules/three/build/three.module';

import { mapState, mapActions } from 'vuex'
import Material from './components/Material.vue';
import Editor from './components/Editor.vue';
import rgbHex from 'rgb-hex';

let base = new MeshPhysicalMaterial({ name:'Standard', color: 0xffffff, shading: SmoothShading, transparent:true, emissive: 0xffffff, emissiveIntensity: 0 });

import materialSpecs from './material_defs';

export default {
  name: 'app',
  data () {
    return {
        materialTypeSelected: 'MeshPhysicalMaterial',
        materialSpec: materialSpecs['MeshPhysicalMaterial'],
        materialId: 0,
        material: base,
        wire: true,
        shadow: true,
        repeat: {x:5,y:5}
    }
  },
  computed: {

    alphaTexture: function () { return this.$store.state.alphamap.texture; },
    bumpTexture: function () { return this.$store.state.bumpmap.texture; },
    bumpScale: function () { return this.$store.state.bumpmap.scale; },
    colorTexture: function () { return this.$store.state.colormap.texture; },
    emissiveTexture: function () { return this.$store.state.emissivemap.texture; },
    emissiveIntensity: function () { return this.$store.state.emissivemap.intensity; },
    lightTexture: function () { return this.$store.state.lightmap.texture; },
    occlusionTexture: function () { return this.$store.state.occlusionmap.texture; },
    occlusionIntensity: function () { return this.$store.state.occlusionmap.intensity; },
    specularTexture: function () { return this.$store.state.specularmap.texture; },
    envTexture: function () { return this.$store.state.envmap.texture; },

    color: function () { return this.$store.state.properties.color },
    shininess: function () { return this.$store.state.properties.shininess },
    reflectivity: function () { return this.$store.state.properties.reflectivity },
    roughness: function () { return this.$store.state.properties.roughness },
    metalness: function () { return this.$store.state.properties.metalness },
    clearcoat: function () { return this.$store.state.properties.clearcoat },
    clearcoatRoughness: function () { return this.$store.state.properties.clearcoatRoughness }

  },
  watch: {
    alphaTexture: function(val) {
        this.material.alphaMap = this.alphaTexture;
        this.material.needsUpdate = true;
    },
    bumpTexture: function(val) {
        this.material.bumpMap = this.bumpTexture;
        this.material.needsUpdate = true;
    },
    bumpScale: function(val) {
        this.material.bumpScale = this.bumpScale;
        this.material.needsUpdate = true;
    },
    colorTexture: function(val) {
        this.material.map = this.colorTexture;
        this.material.needsUpdate = true;
    },
    emissiveTexture: function(val) {
        this.material.emissiveMap = this.emissiveTexture;
        this.material.emissive.setRGB( 255,0,0 );
        this.material.needsUpdate = true;
    },
    emissiveIntensity: function(val) {
        this.material.emissive.setRGB( 255,0,0 );
        this.material.emissiveIntensity = this.emissiveIntensity;
        this.material.needsUpdate = true;
    },
    lightTexture: function(val) {
        this.material.lightMap = this.lightTexture;
        this.material.needsUpdate = true;
    },
    occlusionTexture: function(val) {
        this.material.occlusionMap = this.occlusionTexture;
        this.material.needsUpdate = true;
    },
    occlusionIntensity: function(val) {
        this.material.occlusionIntensity = this.occlusionIntensity;
        this.material.needsUpdate = true;
    },
    specularTexture: function(val) {
        this.material.specularMap = this.specularTexture;
        this.material.needsUpdate = true;
    },
    envTexture: function(val) {
        this.material.envMap = this.envTexture;
        this.material.needsUpdate = true;
    },
    color: function(val) {
        this.material.color.setHex(val);
        this.material.needsUpdate = true;
    },
    shininess: function(val) {
        this.material.shininess = val;
        this.material.needsUpdate = true;
    },
    reflectivity: function(val) {
        this.material.reflectivity = val/100;
        this.material.needsUpdate = true;
    },
    roughness: function(val) {
        this.material.roughness = val/100;
        this.material.needsUpdate = true;
    },
    metalness: function(val) {
        this.material.metalness = val/100;
        this.material.needsUpdate = true;
    },
    clearcoat: function(val) {
        this.material.clearCoat = val/100;
        this.material.needsUpdate = true;
    },
    clearcoatRoughness: function(val) {
        this.material.clearCoatRoughness = val/100;
        this.material.needsUpdate = true;
    }
  },  
  methods: {
    updatematerial: function(payload){

        this.materialTypeSelected = payload.material;
        this.materialSpec = materialSpecs[payload.material];

        switch (payload.material) {

            case "MeshBasicMaterial":
                this.material = new MeshBasicMaterial({ color: 0xffffff, shininess: 0, shading: SmoothShading, transparent:true, emissive: 0xffffff, emissiveIntensity: 0 });
                this.material.needsUpdate = true;
            break;

            case "MeshLambertMaterial":
                this.material = new MeshLambertMaterial({ color: 0xffffff, shininess: 0, shading: SmoothShading, transparent:true, emissive: 0xffffff, emissiveIntensity: 0 });
                this.material.needsUpdate = true;
            break;

            case "MeshPhongMaterial":
                this.material = new MeshPhongMaterial({ color: 0xffffff, shininess: 0, shading: SmoothShading, transparent:true, emissive: 0xffffff, emissiveIntensity: 0 });
                this.material.needsUpdate = true;
            break;

            case "MeshPhysicalMaterial":
                this.material = new MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.0, metalness: 1.0, shading: SmoothShading, transparent:true, clearCoat: 0.0, clearCoatRoughness: 0.0 });
                this.material.needsUpdate = true;
            break;

            case "MeshToonMaterial":
                this.material = new MeshToonMaterial({ color: 0xffffff, shininess: 0, shading: SmoothShading, transparent:true, emissive: 0xffffff, emissiveIntensity: 0 });
                this.material.needsUpdate = true;
            break;

            case "MeshStandardMaterial":
                this.material = new MeshStandardMaterial({ color: 0xffffff, shininess: 0, shading: SmoothShading, transparent:true, emissive: 0xffffff, emissiveIntensity: 0 });
                this.material.needsUpdate = true;
            break;

        }

    },
    // updatecolor: function(payload) {
    //     this.material.color.setHex( parseInt(rgbHex(payload.r,payload.g,payload.b), 16) );
    // },
    // updateshininess: function(payload) {
    //     this.shininess = payload.shininess;
    //     this.material.shininess = payload.shininess;
    // },
    // updateintensity: function(payload) {
    //     this.intensity = payload.intensity/100;
    //     this.material.emissiveIntensity = payload.intensity/100;
    // },
    updatewire: function(payload) {
        this.wire = payload.wire;
    },
    updateshadows: function(payload) {
        this.shadow = payload.shadow;
    }
  },
  components: {
    Material,
    Editor
  }
}

</script>

<style lang="scss">
#app {
    font-family: 'Work Sans', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
