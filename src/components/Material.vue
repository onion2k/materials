<template>
    <div class="material col-sm-12 col-md-6 p-0 bg-faded">
        <div ref="wrapper"></div>
        <div class="code">Material code:</div>
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
    SpotLight,
    EdgesGeometry,
    LineBasicMaterial,
    LineSegments
} from '../../node_modules/three/build/three.module';

export default {
  name: 'Material',
  props: ['material', 'wire', 'shadow'],
  data: function() {

    let boxgeo = new TorusKnotGeometry(30, 10, 100, 16);
    //let boxgeo = new BoxGeometry(60, 60, 60);
    //let boxgeo = new SphereGeometry(40, 60, 60);

    let mesh = new Mesh(boxgeo, this.material);
        mesh.castShadow = true;
        mesh.receiveShadow = false;

    let wiregeo = new EdgesGeometry( mesh.geometry );
    let wiremat = new LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
    let wireframe = new LineSegments( wiregeo, wiremat );

    let light = new SpotLight(0xffffff, 2);

    return {
        wireframe: wireframe,
        box: mesh,
        light: light
    }
  },
  watch : {
    wire : function(value) {
        this.wireframe.visible = value;
    },
    shadow : function(value) {
        this.light.castShadow = value;
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
    renderer.setClearColor(0xffffff, 0);
    renderer.shadowMap.enabled = true;

    let aspect = 0.75;
    renderer.setSize(wrapper.offsetWidth, wrapper.offsetWidth*aspect);

    let camera = new PerspectiveCamera(65, wrapper.offsetWidth/(wrapper.offsetWidth*aspect), 1, 10000);
        camera.position.set(0, 75, 75);
        camera.lookAt(new Vector3(0,0,0));
        scene.add(camera);

    this.box.add(this.wireframe);
        this.wireframe.visible = this.wire;

    let hook = new Object3D();
        hook.add(this.box);
        scene.add(hook);

    this.light.position.set(100, 200, 75);
        this.light.lookAt(new Vector3(0,0,0));
        scene.add(this.light);

    if (this.shadow) {

        this.light.castShadow = true;
        this.light.shadow.mapSize.width = 2048;
        this.light.shadow.mapSize.height = 2048;
        this.light.shadow.camera.near = 1;
        this.light.shadow.camera.far = 750;
        this.light.shadow.bias = 0.001;
        this.light.shadow.radius = 2;

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
.code {
    text-align: left;
    padding: 40px;
    font-family: monospace;
    white-space: pre;
}
</style>
