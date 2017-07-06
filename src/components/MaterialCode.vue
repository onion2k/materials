<template>
    <div class="text-left">

        let geometry = new THREE.BoxGeometry(5, 5, 5);

        let material = new THREE.MeshBasicMaterial({ color: {{ color }}{{ emissiveIntensity ? ', emissiveIntensity: '+emissiveIntensity : '' }} });

            material.map = new THREE.Texture();
            material.bumpMap = new THREE.Texture();
            material.alphaMap = new THREE.Texture();
            material.occlusionMap = new THREE.Texture();
            material.emissiveMap = new THREE.Texture();
            material.lightMap = new THREE.Texture();
            material.normalMap = new THREE.Texture();
            material.specularMap = new THREE.Texture();
            material.envMap = new THREE.Texture();

        let mesh = new THREE.Mesh(geometry, material);

    </div>
</template>

<script>

import rgbHex from 'rgb-hex';

export default {
  name: 'MaterialCode',
  props: [],
  data: function(){
    return {

    }
  },
  computed: {
    geometry: function(){

    },
    color: function(){
        let color = this.$store.state.properties.color;
        return '0x'+parseInt(rgbHex(color.r,color.g,color.b), 16);
    },
    emissiveIntensity: function(){
        return this.$store.state.emissivemap.intensity / 100;
    }
  },
  methods: {

  },
  components: {

  }
}

</script>

<style scoped>
    div {
        padding: 0;
        font-family: Courier;
        font-size: 12px;
        white-space: pre;
    }
</style>
