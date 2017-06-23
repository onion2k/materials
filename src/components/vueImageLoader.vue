<template>
    <div class="imageform">
        <div class="file-upload-form">
            <input type="file" @change="previewImage" accept="image/*">
            {{ image || 'No image selected' }}
        </div>
    </div>
</template>

<script>

export default {
  name: 'vueImageLoader',
  props: ['imageLoaded'],
  data: function(){
    return {
        image: '',
        background: ''
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
                this.$emit('imageLoaded', { image: e.target.result });
            }
            // Start the reader job - read file as a data url (base64 format)
            reader.readAsDataURL(input.files[0]);
        }
    }
  },
  components: {

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .imageform {
        width: 60%;
        text-align: center;
    }
    .file-upload-form {
        width: 100%;
        position: relative;
        background-color: #eee;
        border: 1px dashed #ccc;
    }
    span {
        width: 100%;
        z-index: 1;
    }
    input {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        width: 100%;
        z-index: 2;
    }
    .preview { 
        text-align: right;
        width: 20px;
    }
</style>
