<template>
    <div id="app" class="container-fluid">
      <div class="row">
        <Editor 
            :materialSelected="this.materialSelected"
            :materialTypeSelected="this.materialTypeSelected"
            :wire="this.wire"
            :shadow="this.shadow"
            v-on:updatewire="updatewire"
            v-on:updateshadows="updateshadows"
            v-on:updateshader="updateshader">
        </Editor>
        <Renderer 
            :mesh="this.mesh"
            :material="this.material"
            :materialSelected="this.materialSelected"
            :wire="this.wire"
            :shadow="this.shadow">
        </Renderer>
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
    ImageUtils,
    DoubleSide,
    BackSide,
    FrontSide,
    Vector2,
    Mesh,
    SphereGeometry,
    BoxGeometry
} from '../node_modules/three/build/three.module';

import { mapState, mapActions } from 'vuex'
import Renderer from './components/Renderer.vue';
import Editor from './components/Editor.vue';
import rgbHex from 'rgb-hex';

export default {
  name: 'app',
  data () {

    console.log("data");

    let base = new MeshPhysicalMaterial({ name:'Standard', color: 0xffffff, shading: SmoothShading, transparent:true, emissive: 0xffffff, emissiveIntensity: 0 });

    let geometry = new SphereGeometry(40, 60, 60);

    let mesh = new Mesh(geometry, base);
        mesh.castShadow = true;
        mesh.receiveShadow = false;

    return {
        material: base,
        mesh: mesh,
        wire: false,
        shadow: false
    }
  },
  mounted: function(){

    console.log("mount");

    // let box = new BoxGeometry(10, 10, 10);

    // this.mesh = new Mesh(box, this.material);
    //     this.mesh.castShadow = true;
    //     this.mesh.receiveShadow = false;

  },
  computed: {

    objmaterial:  function () { return this.$store.getters['object/material']; },
    materialSelected:  function () { return this.$store.state.object.materialSelected; },
    materialTypeSelected:  function () { return this.$store.state.properties.material; },

    geometry:  function () { return this.$store.state.properties.geometry; },
    sidedness:  function () { return this.$store.state.properties.sidedness; },

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
    roughnessTexture: function () { return this.$store.state.roughnessmap.texture; },
    metalnessTexture: function () { return this.$store.state.metalnessmap.texture; },

    normalTexture: function () { return this.$store.state.normalmap.texture; },
    displacementTexture: function () { return this.$store.state.displacementmap.texture; },

    xrepeat: function () { return this.$store.state.properties.repeat.x },
    yrepeat: function () { return this.$store.state.properties.repeat.y },
    xoffset: function () { return this.$store.state.properties.offset.x },
    yoffset: function () { return this.$store.state.properties.offset.y },

    color: function () { return this.$store.state.properties.color },
    shininess: function () { return this.$store.state.properties.shininess },
    reflectivity: function () { return this.$store.state.properties.reflectivity },
    roughness: function () { return this.$store.state.properties.roughness },
    metalness: function () { return this.$store.state.properties.metalness },
    clearcoat: function () { return this.$store.state.properties.clearcoat },
    clearcoatRoughness: function () { return this.$store.state.properties.clearcoatRoughness },
    sidedness: function() { return this.$store.state.properties.sidedness },

    uniforms: function() { return this.$store.state.shader.uniforms },
    fragmentShader: function() { return this.$store.state.shader.fragmentShader },
    vertexShader: function() { return this.$store.state.shader.vertexShader }

  },
  watch: {

    xrepeat: function(val) {
        if (this.material.alphaMap) this.material.alphaMap.repeat.set(this.xrepeat, this.yrepeat);
        if (this.material.map) this.material.map.repeat.set(this.xrepeat, this.yrepeat);
        if (this.material.bumpMap) this.material.bumpMap.repeat.set(this.xrepeat, this.yrepeat);
        if (this.material.emissiveMap) this.material.emissiveMap.repeat.set(this.xrepeat, this.yrepeat);
        if (this.material.lightMap) this.material.lightMap.repeat.set(this.xrepeat, this.yrepeat);
        if (this.material.occlusionMap) this.material.occlusionMap.repeat.set(this.xrepeat, this.yrepeat);
        if (this.material.specularMap) this.material.specularMap.repeat.set(this.xrepeat, this.yrepeat);
        if (this.material.envMap) this.material.envMap.repeat.set(this.xrepeat, this.yrepeat);
        this.material.needsUpdate = true;
    },

    yrepeat: function(val) {
        if (this.material.alphaMap) this.material.alphaMap.repeat.set(this.xrepeat, this.yrepeat);
        if (this.material.map) this.material.map.repeat.set(this.xrepeat, this.yrepeat);
        if (this.material.bumpMap) this.material.bumpMap.repeat.set(this.xrepeat, this.yrepeat);
        if (this.material.emissiveMap) this.material.emissiveMap.repeat.set(this.xrepeat, this.yrepeat);
        if (this.material.lightMap) this.material.lightMap.repeat.set(this.xrepeat, this.yrepeat);
        if (this.material.occlusionMap) this.material.occlusionMap.repeat.set(this.xrepeat, this.yrepeat);
        if (this.material.specularMap) this.material.specularMap.repeat.set(this.xrepeat, this.yrepeat);
        if (this.material.envMap) this.material.envMap.repeat.set(this.xrepeat, this.yrepeat);
        this.material.needsUpdate = true;
    },

    xoffset: function(val) {
        if (this.material.alphaMap) this.material.alphaMap.offset.setX(this.xoffset/100);
        if (this.material.map) this.material.map.offset.setX(this.xoffset/100);
        if (this.material.bumpMap) this.material.bumpMap.offset.setX(this.xoffset/100);
        if (this.material.emissiveMap) this.material.emissiveMap.offset.setX(this.xoffset/100);
        if (this.material.lightMap) this.material.lightMap.offset.setX(this.xoffset/100);
        if (this.material.occlusionMap) this.material.occlusionMap.offset.setX(this.xoffset/100);
        if (this.material.specularMap) this.material.specularMap.offset.setX(this.xoffset/100);
        if (this.material.envMap) this.material.envMap.offset.setX(this.xoffset/100);
        this.material.needsUpdate = true;
    },

    yoffset: function(val) {
        if (this.material.alphaMap) this.material.alphaMap.offset.setY(this.yoffset/100);
        if (this.material.map) this.material.map.offset.setY(this.yoffset/100);
        if (this.material.bumpMap) this.material.bumpMap.offset.setY(this.yoffset/100);
        if (this.material.emissiveMap) this.material.emissiveMap.offset.setY(this.yoffset/100);
        if (this.material.lightMap) this.material.lightMap.offset.setY(this.yoffset/100);
        if (this.material.occlusionMap) this.material.occlusionMap.offset.setY(this.yoffset/100);
        if (this.material.specularMap) this.material.specularMap.offset.setY(this.yoffset/100);
        if (this.material.envMap) this.material.envMap.offset.setY(this.yoffset/100);
        this.material.needsUpdate = true;
    },

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
        this.material.needsUpdate = true;
    },
    emissiveIntensity: function(val) {
        this.material.emissiveIntensity = this.emissiveIntensity / 100;
        this.material.needsUpdate = true;
    },
    lightTexture: function(val) {
        this.material.lightMap = this.lightTexture;
        this.material.needsUpdate = true;
    },
    aoTexture: function(val) {
        this.material.aoMap = this.aoTexture;
        this.material.needsUpdate = true;
    },
    aoIntensity: function(val) {
        //this.material.occlusionIntensity = this.occlusionIntensity;
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
    roughnessTexture: function(val) {
        this.material.roughnessMap = this.roughnessTexture;
        this.material.needsUpdate = true;
    },
    metalnessTexture: function(val) {
        this.material.metalnessMap = this.metalnessTexture;
        this.material.needsUpdate = true;
    },
    normalTexture: function(val) {
        this.material.normalMap = this.normalTexture;
        this.material.needsUpdate = true;
    },
    displacementTexture: function(val) {
        this.material.displacementMap = this.displacementTexture;
        this.material.needsUpdate = true;
    },
    color: function(val) {
        this.material.color.setHex(parseInt(rgbHex(val.r,val.g,val.b), 16));
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
    },

    uniforms: function(val) {
        this.material.uniforms = val;
        this.material.needsUpdate = true;
    },
    fragmentShader: function(val) {
        this.material.fragmentShader = val;
        this.material.needsUpdate = true;
    },
    vertexShader: function(val) {
        this.material.vertexShader = val;
        this.material.needsUpdate = true;
    },

    sidedness: function(val) {
        switch (val) {
            case 'double':
                this.material.side = DoubleSide;
                break;
            case 'back':
                this.material.side = BackSide;
                break;
            case 'front':
            default:
                this.material.side = FrontSide;
                break;
        }
        this.material.needsUpdate = true;
    },

    objmaterial: function(val){

        console.log("Material List Switcher: ", JSON.stringify(val));
        this.typeChangeRebuild();
        this.mesh.material = this.material;

    },

    materialTypeSelected: function(payload){

        console.log("MTS: ", JSON.stringify(payload));
        this.typeChangeRebuild();
        this.mesh.material = this.material;

    }
  },
  methods: {
    updatewire: function(payload) {
        this.wire = payload.wire;
    },
    updateshadows: function(payload) {
        this.shadow = payload.shadow;
    },
    updateshader: function(){
        this.material = new ShaderMaterial({ uniforms: this.uniforms, fragmentShader: this.fragmentShader, vertexShader: this.vertexShader });
        this.material.needsUpdate = true;
    },
    typeChangeRebuild: function(){

        switch (this.objmaterial.type) {

            case "MeshBasicMaterial":
                this.material = new MeshBasicMaterial({ name: 'Basic', color: this.material.color, shading: SmoothShading, transparent:true });
            break;

            case "MeshLambertMaterial":
                this.material = new MeshLambertMaterial({ color: 0xffffff, shading: SmoothShading, transparent:true, emissive: 0xffffff, emissiveIntensity: 0 });
            break;

            case "MeshPhongMaterial":
                this.material = new MeshPhongMaterial({ color: 0xffffff, shininess: 0, shading: SmoothShading, transparent:true, emissive: 0xffffff, emissiveIntensity: 0 });
            break;

            case "MeshPhysicalMaterial":
                this.material = new MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.0, metalness: 0.0, shading: SmoothShading, transparent:true, clearCoat: 0.0, clearCoatRoughness: 0.0 });
            break;

            case "MeshToonMaterial":
                this.material = new MeshToonMaterial({ color: 0xffffff, shininess: 0, shading: SmoothShading, transparent:true, emissive: 0xffffff, emissiveIntensity: 0 });
            break;

            case "MeshStandardMaterial":
                this.material = new MeshStandardMaterial({ color: 0xffffff, shading: SmoothShading, transparent:true, emissive: 0xffffff, emissiveIntensity: 0 });
            break;

            case "ShaderMaterial":
                this.material = new ShaderMaterial({ uniforms: this.uniforms, fragmentShader: this.fragmentShader, vertexShader: this.vertexShader });
            break;

        }

        if (this.material.hasOwnProperty('alphaMap')) { this.material.alphaMap = this.alphaTexture; }
        if (this.material.hasOwnProperty('bumpMap')) { this.material.bumpMap = this.bumpTexture; }
        if (this.material.hasOwnProperty('bumpScale')) { this.material.bumpScale = this.bumpScale; }
        if (this.material.hasOwnProperty('map')) { this.material.map = this.colorTexture; }
        if (this.material.hasOwnProperty('emissiveMap')) { this.material.emissiveMap = this.emissiveTexture; }
        if (this.material.hasOwnProperty('emissiveIntensity')) { this.material.emissiveIntensity = this.emissiveIntensity / 100; }
        if (this.material.hasOwnProperty('aoMap')) { this.material.aoMap = this.aoTexture; }
        if (this.material.hasOwnProperty('aoIntensity')) { this.material.aoIntensity = this.aoIntensity; }
        if (this.material.hasOwnProperty('normalMap')) { this.material.normalMap = this.normalTexture; }
        if (this.material.hasOwnProperty('lightMap')) { this.material.lightMap = this.lightTexture; }
        if (this.material.hasOwnProperty('specularMap')) { this.material.specularMap = this.specularTexture; }
        if (this.material.hasOwnProperty('envMap')) { this.material.envMap = this.envTexture; }
        if (this.material.hasOwnProperty('roughnessMap')) { this.material.roughnessMap = this.roughnessTexture; }
        if (this.material.hasOwnProperty('metalnessMap')) { this.material.metalnessMap = this.metalnessTexture; }

        if (this.material.hasOwnProperty('normalMap')) { this.material.normalMap = this.normalTexture; }
        if (this.material.hasOwnProperty('displacementMap')) { this.material.displacementMap = this.displacementTexture; }

        this.material.needsUpdate = true;

    }

  },
  components: {
    Renderer,
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
