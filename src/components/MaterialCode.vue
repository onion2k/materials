<template>
    <div class="text-left">
        let geometry = new THREE.BoxGeometry(5, 5, 5);
        let material = new THREE.MeshBasicMaterial({ color: {{ color }} });
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

    color: function(){
        let color = this.$store.state.properties.color;
        return '0x'+parseInt(rgbHex(color.r,color.g,color.b), 16);
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
