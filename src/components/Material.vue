<template>
  <div class="main">
    <div class="material" id="wrapper">Material</div>
  </div>
</template>

<script>

import { 
    WebGLRenderer, 
    CylinderGeometry, 
    MeshPhongMaterial, 
    Mesh, 
    Object3D,
    Vector3,
    FlatShading
} from '../../node_modules/three/build/three.module';

export default {
  name: 'Material',
  data () {
    return {

    }
  },
  created: function(){
    //Do nothing on create
    let wrapper = document.getElementById('wrapper');
    console.log(wrapper);

  },
  components: {

  },
  methods: {

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .material {
    float: left;
    width: 300px;
    min-height: 300px;
    border: 1px solid #eee;
    margin: 10px;
  }
</style>
