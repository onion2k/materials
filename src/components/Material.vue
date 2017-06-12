<template>
  <div class="main">
    <div class="material" ref="wrapper">Material</div>
  </div>
</template>

<script>

import {
    Scene,
    WebGLRenderer, 
    BoxGeometry, 
    MeshPhongMaterial, 
    Mesh,
    Object3D,
    Vector3,
    FlatShading,
    PerspectiveCamera,
    PointLight
} from '../../node_modules/three/build/three.module';

export default {
  name: 'Material',
  props: ['color'],
  data () {
    return {

    }
  },
  mounted: function(){

    let wrapper = this.$refs["wrapper"]; //document.getElementById('wrapper');

    let scene = new Scene();
    let renderer = new WebGLRenderer({
        antialias: true,	// to get smoother output
        alpha: true
    });
    renderer.setClearColor(0xffff00, 0);
    renderer.setSize(300,300);

    let camera = new PerspectiveCamera(65, 300/300, 1, 10000);
        camera.position.set(0, 85, 85);
        camera.lookAt(new Vector3(0,0,0));
        scene.add(camera);

    let light = new PointLight(0xffffff);
        light.position.set(150, 250, -50);
        scene.add(light);

    let boxgeo = new BoxGeometry(50,50,50);
    let box = new Mesh(boxgeo, new MeshPhongMaterial({ color: parseInt(this.color, 16), shininess: 10, shading: FlatShading }));
        scene.add(box);

    wrapper.appendChild(renderer.domElement);

    function animate() {

        requestAnimationFrame(animate);
        //scene.cameraControl.update();
        box.rotation.y += 0.02;
        render();

    }

    function render() {
        renderer.render(scene, camera);
    }

    animate();

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
