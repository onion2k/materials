<template>
  <div class="material" ref="wrapper"></div>
</template>

<script>

import {
    Scene,
    WebGLRenderer, 
    BoxGeometry,
    SphereGeometry,
    TorusKnotGeometry,
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
  data: function() {
    let boxgeo = new TorusKnotGeometry(30, 10, 100, 16);
    return {
        box: new Mesh(boxgeo, this.material)
    }
  },
  watch : {
    material : function(value) {
        this.box.material = value;
        this.box.material.needsUpdate = true;
    }
  },
  mounted: function(){

    let wrapper = this.$refs["wrapper"];

    let scene = new Scene();
    let renderer = new WebGLRenderer({
        antialias: true,
        alpha: false
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(800,600);

    let camera = new PerspectiveCamera(65, 800/600, 1, 10000);
        camera.position.set(0, 75, 75);
        camera.lookAt(new Vector3(0,0,0));
        scene.add(camera);

    let light = new PointLight(0xffffff);
        light.position.set(50, 150, 50);
        scene.add(light);

    let hook = this.box;
        scene.add(hook);

    var wiregeo = new EdgesGeometry( this.box.geometry );
    var wiremat = new LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
    var wireframe = new LineSegments( wiregeo, wiremat );
        this.box.add(wireframe);

    wrapper.appendChild(renderer.domElement);

    function animate() {

        requestAnimationFrame(animate);
        hook.rotation.y += 0.01;
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
