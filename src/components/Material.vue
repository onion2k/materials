<template>
  <div class="material" ref="wrapper">
  </div>
</template>

<script>

import {
    Scene,
    WebGLRenderer, 
    BoxGeometry,
    SphereGeometry,
    Mesh,
    Object3D,
    Vector3,
    FlatShading,
    PerspectiveCamera,
    PointLight,
    EdgesGeometry,
    LineBasicMaterial,
    LineSegments
} from '../../node_modules/three/build/three.module';

export default {
  name: 'Material',
  props: ['material'],
  data () {
    return {

    }
  },
  mounted: function(){

    let wrapper = this.$refs["wrapper"];

    let scene = new Scene();
    let renderer = new WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setClearColor(0xffff00, 0);
    renderer.setSize(600,600);

    let camera = new PerspectiveCamera(65, 600/600, 1, 10000);
        camera.position.set(0, 75, 75);
        camera.lookAt(new Vector3(0,0,0));
        scene.add(camera);

    let light = new PointLight(0xffffff);
        light.position.set(50, 75, 75);
        scene.add(light);

    let light2 = new PointLight(0xffffff);
        light2.position.set(-50, 75, -75);
        scene.add(light2);

    let boxgeo = new SphereGeometry(50, 24, 24);
    let box = new Mesh(boxgeo, this.material);
        scene.add(box);

    var wiregeo = new EdgesGeometry( box.geometry );
    var wiremat = new LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
    var wireframe = new LineSegments( wiregeo, wiremat );
        box.add(wireframe);

    wrapper.appendChild(renderer.domElement);


    function animate() {

        requestAnimationFrame(animate);
        box.rotation.y += 0.01;
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
<style>

</style>
