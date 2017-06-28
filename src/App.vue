<template>
    <div id="app" class="container-fluid">
      <div class="row">
        <Material :materialId="this.materialId" :material="this.material" :wire="this.wire" :shadow="this.shadow"></Material>
        <Editor 
            :spec="this.materialSpec" 
            :materialTypeSelected="this.materialTypeSelected"
            :materialId="this.materialId" 
            :materials="this.materials" 
            v-on:change="change" 
            v-on:updatematerial="updatematerial" 
            v-on:updatecolor="updatecolor" 
            v-on:updateintensity="updateintensity" 
            v-on:updateshininess="updateshininess" 
            v-on:updatewire="updatewire"
            v-on:updateshadows="updateshadows">
        </Editor>
      </div>
    </div>
</template>

<script>

import {
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

let materials = [

    new MeshPhongMaterial({     name:'Standard', color: 0xff00ff, shininess: 100, shading: SmoothShading, transparent:true, emissive: 0xffffff, emissiveIntensity: 0 }),

    new MeshLambertMaterial({     name:'Lambert 1', color: 0xff00ff, shading: SmoothShading, transparent:true }),
    new MeshLambertMaterial({     name:'Lambert Flat', color: 0xff00ff, shading: FlatShading, transparent:true }),

    new MeshPhongMaterial({     name:'Phong 1', color: 0xff00ff, shininess: 0, shading: SmoothShading, transparent:true }),
    new MeshPhongMaterial({     name:'Phong 2', color: 0xff00ff, shininess: 50, shading: SmoothShading, transparent:true }),
    new MeshPhongMaterial({     name:'Phong 3', color: 0xff00ff, shininess: 100, shading: SmoothShading, transparent:true }),
    new MeshPhongMaterial({     name:'Phong Flat', color: 0xff00ff, shininess: 0, shading: FlatShading }),

    new MeshPhysicalMaterial({  name:'Physical Bronze', color: 0xff8800, roughness: 0.5, metalness: 0.5, clearCoat: 0.1, reflectivity: 0.6, shading: SmoothShading, transparent:true }),
    new MeshPhysicalMaterial({  name:'Physical Silver', color: 0xc0c0c0, roughness: 0.5, metalness: 0.3, clearCoat: 0, reflectivity: 0.8, shading: SmoothShading, transparent:true }),
    new MeshPhysicalMaterial({  name:'Physical Gold!', color: 0xffd700, roughness: 0.2, metalness: 0.2, clearCoat: 0, reflectivity: 0.8, shading: SmoothShading, transparent:true }),
    new MeshPhysicalMaterial({  name:'Physical 2', color: 0xffffff, roughness: 1.0, metalness: 0, clearCoat: 0.1, shading: SmoothShading, transparent:true }),
    new MeshPhysicalMaterial({  name:'Physical Uncoated', color: 0xffffff, roughness: 0, metalness: 0, clearCoat: 0, clearCoatRoughness: 0, shading: SmoothShading, transparent:true }),
    new MeshPhysicalMaterial({  name:'Physical Coated', color: 0xffffff, roughness: 0, metalness: 0, clearCoat: 1.0, clearCoatRoughness: 0, shading: SmoothShading, transparent:true }),
    new MeshPhysicalMaterial({  name:'Physical Rough Coated', color: 0xffffff, roughness: 0, metalness: 0, clearCoat: 1.0, clearCoatRoughness: 1.0, shading: SmoothShading, transparent:true }),    
    new MeshPhysicalMaterial({  name:'Physical 3', color: 0xff00ff, roughness: 0.5, metalness: 0.5, shading: SmoothShading, transparent:true }),
    new MeshPhysicalMaterial({  name:'Physical 4', color: 0xff00ff, roughness: 0.1, metalness: 0.1, shading: SmoothShading, transparent:true }),

    new MeshToonMaterial({      name:'Toon 1', color: 0xff00ff, transparent:true }),
    new MeshToonMaterial({      name:'Toon 2', color: 0xff00ff, shininess: 100, shading: SmoothShading, transparent:true }),
    new MeshToonMaterial({      name:'Toon Flat', color: 0xff00ff, shading: FlatShading, transparent:true })

];

import materialSpecs from './material_defs';

export default {
  name: 'app',
  data () {
    return {
        materialTypeSelected: 'MeshPhongMaterial',
        materialSpec: materialSpecs['MeshPhongMaterial'],
        materialId: 0,
        material: materials[0],
        materials: materials,
        color: {},
        wire: false,
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
    }
  },  
  methods: {
    updatematerial: function(payload){
        this.materialTypeSelected = payload.material;
        this.materialSpec = materialSpecs[payload.material];
    },
    updatecolor: function(payload) {
        this.material.color.setHex( parseInt(rgbHex(payload.r,payload.g,payload.b), 16) );
    },
    updateshininess: function(payload) {
        this.shininess = payload.shininess;
        this.material.shininess = payload.shininess;
    },
    updateintensity: function(payload) {
        this.intensity = payload.intensity/100;
        this.material.emissiveIntensity = payload.intensity/100;
    },
    updatewire: function(payload) {
        this.wire = payload.wire;
    },
    updateshadows: function(payload) {
        this.shadow = payload.shadow;
    },
    change: function(payload) {
        if (this.color !== '') {
            materials[payload.material].color.setStyle(this.color);
        }
        this.material = materials[payload.material];
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
