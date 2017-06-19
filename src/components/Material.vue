<template>
    <div class="material col-sm-9 col-md-8 p-0">
        <div ref="wrapper"></div>
    </div>
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
    MeshLambertMaterial,
    ShaderMaterial,
    DoubleSide,
    Object3D,
    Vector2,
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
  props: ['material', 'wire', 'shadow'],
  data: function() {
    let boxgeo = new TorusKnotGeometry(30, 10, 100, 16);
    let mesh = new Mesh(boxgeo, this.material);
        mesh.castShadow = true;
        mesh.receiveShadow = false;

    let wiregeo = new EdgesGeometry( mesh.geometry );
    let wiremat = new LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
    let wireframe = new LineSegments( wiregeo, wiremat );

    return {
        wireframe: wireframe,
        box: mesh
    }
  },
  watch : {
    wire : function(value) {
        this.wireframe.visible = value;
    },
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
    renderer.setSize(wrapper.offsetWidth,wrapper.offsetWidth*0.6);

    let camera = new PerspectiveCamera(65, wrapper.offsetWidth/(wrapper.offsetWidth*0.6), 1, 10000);
        camera.position.set(0, 75, 75);
        camera.lookAt(new Vector3(0,0,0));
        scene.add(camera);

    this.box.add(this.wireframe);
        this.wireframe.visible = this.wire;

    let hook = new Object3D();
        hook.add(this.box);
        scene.add(hook);

    let light = new PointLight(0xffffff, 1);
        light.position.set(100, 200, 75);
        light.lookAt(new Vector3(0,0,0));
        scene.add(light);

    if (this.shadow) {

        light.castShadow = true;
        light.shadow.mapSize.width = 1024;
        light.shadow.mapSize.height = 1024;
        light.shadow.camera.near = 1;
        light.shadow.camera.far = 500;
        light.shadow.bias = 0.0001;
        light.shadow.radius = 4;

    }

    let planeGeo = new PlaneGeometry( 500, 500 );
    let planeMat = new MeshLambertMaterial( {color: 0xffffff} );
    let plane = new Mesh( planeGeo, planeMat );
        plane.rotation.x = Math.PI * 1.5;
        plane.position.y = -100;
        plane.castShadow = false;
        plane.receiveShadow = true;
        scene.add( plane );

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
.material { background-color: #000; }
</style>
