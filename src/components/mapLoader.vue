<template>
    <div class="imageform map" v-on:click.self="show">
        {{ this.image }}
        <div v-if="modal" class="card mapmodal">
            <div class="card-block text-left">
                <h4 class="card-title">{{ this.data.title }}</h4>
                <p class="card-text">{{ this.data.description }}</p>
            </div>
            <div class="file-upload-form card-block">
                <input type="file" @change.self="previewImage" accept="image/*">
                {{ image || 'Click to select an image' }}
                <button v-if="image" @click.self="removeImage">Remove</button>
            </div>
            <ul class="list-group list-group-flush">
                <div class="list-group-item justify-content-between disabled">
                    <span>x Repeat</span>
                    <vue-slider ref="slider" v-bind="sliderSettings" v-model="xRepeatSliderValue" @input="xRepeatSliderUpdate"></vue-slider>
                </div>
                <div class="list-group-item justify-content-between disabled">
                    <span>y Repeat</span>
                    <vue-slider ref="slider" v-bind="sliderSettings" v-model="yRepeatSliderValue" @input="yRepeatSliderUpdate"></vue-slider>
                </div>
                <div class="list-group-item justify-content-between text-left explainer">
                    <span>THREE.js doesn't support repeat or offset data  for individual maps yet, so these are disabled. Use the global values instead, or repeat the map in the image.</span>
                </div>
                <div class="list-group-item justify-content-between" v-if="sliderTitle">
                    <span>{{ sliderTitle }}</span>
                    <vue-slider ref="slider" v-bind="sliderSettings" v-model="sliderValue" @input="sliderUpdate"></vue-slider>
                </div>
                <div class="list-group-item justify-content-between text-left explainer" v-if="sliderTitle">
                    <span>Affect the amount of bumpiness a map changes the model by.</span>
                </div>
            </ul>
            <div class="card-block">
                <a href="#" v-on:click="close" class="card-link">Close</a>
            </div>
        </div>
    </div>
</template>

<script>

import vueSlider from 'vue-slider-component';

export default {
  name: 'mapLoader',
  props: ['imageLoaded', 'data'],
  data: function(){
    return {
        image: '',
        background: '',
        modal: false,
        sliderTitle: this.data.sliderTitle,
        sliderValue: this.data.sliderValue,
        sliderSettings: { width: '75%', tooltip: 'hover' },
        xRepeatSliderValue: 0,
        yRepeatSliderValue: 0
    }
  },
  methods: {
    previewImage: function(event) {
        // Reference to the DOM input element
        var input = event.target;
        // Ensure that you have a file before attempting to read it
        if (input.files && input.files[0]) {
            // create a new FileReader to read this image and convert to base64 format
            var reader = new FileReader();
            // Define a callback function to run, when FileReader finishes its job
            reader.onload = (e) => {
                // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                // Read image as base64 and set to imageData
                //this.imageData = e.target.result;
                this.image = input.files[0].name;
                //this.$emit('imageLoaded', { image: e.target.result });
                this.$store.dispatch(this.data.namespace+'/mapUpdate', { filename: input.files[0].name, image: e.target.result });
            }
            // Start the reader job - read file as a data url (base64 format)
            reader.readAsDataURL(input.files[0]);
        }
    },
    removeImage: function(){
        this.image = null;
        this.$store.dispatch(this.data.namespace+'/mapUpdate', { filename: '', image: null });
    },
    show: function(){
        this.modal = true;
    },
    close: function(){
        this.modal = false;
    },
    sliderUpdate: function(sliderValue){
        this.$store.dispatch(this.data.namespace+'/sliderUpdate', { 'v': sliderValue });
    },
    xRepeatSliderUpdate: function(xRepeatSliderValue){
        this.$store.dispatch(this.data.namespace+'/xRepeatSliderUpdate', { 'v': xRepeatSliderValue });
    },
    yRepeatSliderUpdate: function(yRepeatSliderValue){
        this.$store.dispatch(this.data.namespace+'/yRepeatSliderUpdate', { 'v': yRepeatSliderValue });
    }    
  },
  components: {
    vueSlider
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
    .file-upload-form {
        width: 100%;
        position: relative;
        background-color: #eee;
    }
    input {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        opacity: 0;
        width: 100%;
        z-index: 2;
    }
    button {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        opacity: 1;
        width: 100%;
        z-index: 3;
    }
    .disabled {
        pointer-events: none;
        border-color: #e2e2e2;
        color: #ccc;
        background-color: #f8f8f8;
    }
    .explainer {
        font-size: 0.8rem;
    }
    .preview { 
        text-align: right;
        width: 20px;
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
