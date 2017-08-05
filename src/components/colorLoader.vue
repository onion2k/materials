<template>
    <div class="imageform map" v-on:click.self="show">
        <div v-if="modal" class="card mapmodal">
            <div class="card-block text-left">
                <h4 class="card-title">Color</h4>
                <p class="card-text">Choose a color</p>
            </div>
            <div class="card-block">
                <color-picker :value="color" @input="updatecolor"></color-picker>
            </div>
            <div class="card-block">
                <a href="#" v-on:click="close" class="card-link">Close</a>
            </div>
        </div>
    </div>
</template>

<script>

import { Sketch } from 'vue-color';
import rgbHex from 'rgb-hex';

export default {
  name: 'colorLoader',
  props: ['color', 'data'],
  data: function(){
    return {
        modal: false
    }
  },
  methods: {
    show: function(){
        this.modal = true;
    },
    close: function(){
        this.modal = false;
    },
    updatecolor: function(color){
        this.$store.commit('properties/updateColor', { 'r': color.rgba.r, 'g': color.rgba.g, 'b': color.rgba.b });
    }
  },
  components: {
    'color-picker': Sketch,
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h4 {
        font-family: 'Taviraj', serif;
    }
    .imageform {
        width: 60%;
        text-align: center;
    }
    .map {
        position: relative;
        width: 60%;
        height: 30px;
        background-color: #fff;
        border: 1px dashed #bbb;
    }
    .mapmodal {
        position: absolute;
        border: 1px solid #444;
        top: -8.0rem;
        left: -1.0rem;
        right: -1.0rem;
        z-index: 99;
        box-shadow: 0px 6px 6px 2px rgba(0, 0, 0, 0.3);
    }
</style>
