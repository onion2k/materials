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
    PlaneGeometry,
    Mesh,
    MeshBasicMaterial,
    DoubleSide,
    Object3D,
    Vector3,
    FlatShading,
    PerspectiveCamera,
    CameraHelper,
    PointLight,
    DirectionalLight,
    DirectionalLightHelper,
    EdgesGeometry,
    LineBasicMaterial,
    LineSegments
} from '../../node_modules/three/build/three.module';

export default {
  name: 'Material',
  props: ['material', 'wire'],
  data: function() {
    let boxgeo = new TorusKnotGeometry(30, 10, 100, 16);
    let mesh = new Mesh(boxgeo, this.material);
    return {
        box: mesh
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
    renderer.shadowMap.enabled = true;
    renderer.setSize(800,600);

    let camera = new PerspectiveCamera(65, 800/600, 1, 10000);
        camera.position.set(0, 275, 275);
        camera.lookAt(new Vector3(0,0,0));
        scene.add(camera);

    let hook = new Object3D();
        hook.add(this.box);
        hook.castShadow = true;
        hook.receiveShadow = false;
        scene.add(hook);

    let light = new PointLight(0xffffff, 100);
        light.position.set(0, 175, 0);
        light.lookAt(new Vector3(0,0,0));
        light.castShadow = true;

        light.shadow.mapSize.width = 512;  // default
        light.shadow.mapSize.height = 512; // default
        light.shadow.camera.near = 1;       // default
        light.shadow.camera.far = 1250      // default

        scene.add(light);

    let shadCam = new CameraHelper( light.shadow.camera );
        scene.add(shadCam);

    let planeGeo = new BoxGeometry(1500,2,1500);
    let planeMat = new MeshBasicMaterial( {color: 0xffffff} );
    let plane = new Mesh( planeGeo, planeMat );
        plane.position.y = -100;
        plane.castShadow = false;
        plane.receiveShadow = true;
        scene.add( plane );

    // let planeGeo = new PlaneGeometry( 1500, 1500 );
    // var planeMat = new MeshBasicMaterial( {color: 0xffffff} );
    // var plane = new Mesh( planeGeo, planeMat );
    //     plane.rotation.x = Math.PI * 1.5;
    //     plane.position.y = -100;
    //     plane.castShadow = false;
    //     plane.receiveShadow = true;
    //     scene.add( plane );

    if (this.wire) {

        var wiregeo = new EdgesGeometry( this.box.geometry );
        var wiremat = new LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
        var wireframe = new LineSegments( wiregeo, wiremat );
            this.box.add(wireframe);

    }

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
