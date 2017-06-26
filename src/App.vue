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
            v-on:colorMap="colorMap" 
            v-on:bumpMap="bumpMap" 
            v-on:alphaMap="alphaMap" 
            v-on:emissiveMap="emissiveMap" 
            v-on:occlusionMap="occlusionMap" 
            v-on:lightMap="lightMap" 
            v-on:specularMap="specularMap" 
            v-on:updatewire="updatewire"></Editor>
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
        materialTypeSelected: 'MeshBasicMaterial',
        materialSpec: materialSpecs['MeshBasicMaterial'],
        materialId: 0,
        material: materials[0],
        materials: materials,
        color: {},
        wire: false,
        shadow: false,
        repeat: {x:5,y:5}
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
    colorMap: function(image){
        var i = document.createElement( 'img' );
        i.src = image.image;
        var t = new Texture(i);
        t.wrapS = t.wrapT = RepeatWrapping;
        t.repeat.set( this.repeat.x, this.repeat.y );
        t.generateMipmaps = false;
        t.minFilter = LinearFilter;
        t.magFilter = LinearFilter;
        t.needsUpdate = true;
        this.material.map = t;
        this.material.needsUpdate = true;
    },
    bumpMap: function(image){
        var i = document.createElement( 'img' );
        i.src = image.image;
        var t = new Texture(i);
        t.wrapS = t.wrapT = RepeatWrapping;
        t.repeat.set( this.repeat.x, this.repeat.y );
        t.generateMipmaps = false;
        t.minFilter = LinearFilter;
        t.magFilter = LinearFilter;
        t.bumpScale = 0.5;
        t.needsUpdate = true;
        this.material.bumpMap = t;
        this.material.needsUpdate = true;
    },
    alphaMap: function(image){
        var i = document.createElement( 'img' );
        i.src = image.image;
        var t = new Texture(i);
        t.wrapS = t.wrapT = RepeatWrapping;
        t.repeat.set( this.repeat.x, this.repeat.y );
        t.generateMipmaps = false;
        t.minFilter = LinearFilter;
        t.magFilter = LinearFilter;
        t.bumpScale = 0.5;
        t.needsUpdate = true;
        this.material.alphaMap = t;
        this.material.needsUpdate = true;
    },
    emissiveMap: function(image){
        var i = document.createElement( 'img' );
        i.src = image.image;
        var t = new Texture(i);
        t.wrapS = t.wrapT = RepeatWrapping;
        t.repeat.set( this.repeat.x, this.repeat.y );
        t.generateMipmaps = false;
        t.minFilter = LinearFilter;
        t.magFilter = LinearFilter;
        t.needsUpdate = true;
        this.material.emissive.setHex(parseInt(rgbHex(255,0,0), 16));
        this.material.emissiveMap = t;
        this.material.emissiveIntensity = 100;
        this.material.needsUpdate = true;
    },
    occlusionMap: function(image){
        var i = document.createElement( 'img' );
        i.src = image.image;
        var t = new Texture(i);
        t.wrapS = t.wrapT = RepeatWrapping;
        t.repeat.set( this.repeat.x, this.repeat.y );
        t.generateMipmaps = false;
        t.minFilter = LinearFilter;
        t.magFilter = LinearFilter;
        t.needsUpdate = true;
        this.material.aoMap = t;
        this.material.needsUpdate = true;
    },
    lightMap: function(image){
        var i = document.createElement( 'img' );
        i.src = image.image;
        var t = new Texture(i);
        t.wrapS = t.wrapT = RepeatWrapping;
        t.repeat.set( this.repeat.x, this.repeat.y );
        t.generateMipmaps = false;
        t.minFilter = LinearFilter;
        t.magFilter = LinearFilter;
        t.needsUpdate = true;
        this.material.lightMap = t;
        this.material.needsUpdate = true;
    },
    specularMap: function(image){
        var i = document.createElement( 'img' );
        i.src = image.image;
        var t = new Texture(i);
        t.wrapS = t.wrapT = RepeatWrapping;
        t.repeat.set( this.repeat.x, this.repeat.y );
        t.generateMipmaps = false;
        t.minFilter = LinearFilter;
        t.magFilter = LinearFilter;
        t.needsUpdate = true;
        this.material.specularMap = t;
        this.material.needsUpdate = true;
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
