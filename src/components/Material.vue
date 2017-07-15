<template>
    <div class="material col-sm-12 col-md-6 p-0 bg-faded">
        <div ref="wrapper"></div>
        <MaterialCode></MaterialCode>
    </div>
</template>

<script>

import {
    Scene,
    WebGLRenderer, 
    BoxGeometry,
    SphereGeometry,
    ConeGeometry,
    TorusKnotGeometry,
    TorusGeometry,
    IcosahedronGeometry,
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
    LineSegments,
    ObjectLoader
} from '../../node_modules/three/build/three.module';

import MaterialCode from './MaterialCode.vue';
import Models from '../lib/models';

export default {
  name: 'Material',
  props: ['material', 'wire', 'shadow'],
  data: function() {

    let boxgeo = new SphereGeometry(40, 60, 60);

    let mesh = new Mesh(boxgeo, this.material);
        mesh.castShadow = true;
        mesh.receiveShadow = false;

    let wiregeo = new EdgesGeometry( mesh.geometry );
    let wiremat = new LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
    let wireframe = new LineSegments( wiregeo, wiremat );

    let light = new SpotLight(0xffffff, 1.2);

    let scene = new Scene();

    let hook = new Object3D();


    return {
        scene: scene,
        hook: hook,
        wireframe: wireframe,
        box: mesh,
        light: light
    }

  },
  computed: {
      geometry: function() { return this.$store.state.properties.geometry; }
  },
  watch : {
    geometry : function(value) {
        let geo;
        let box_ = this.box;
        switch (value) {
            case "SphereGeometry":
                geo = new SphereGeometry(40, 60, 60);
                this.box.geometry = geo;
                break;
            case "BoxGeometry":
                geo = new BoxGeometry(60, 60, 60);
                this.box.geometry = geo;
                break;
            case "TorusKnotGeometry":
                geo = new TorusKnotGeometry(30, 10, 100, 16);
                this.box.geometry = geo;
                break;
            case "ConeGeometry":
                geo = new ConeGeometry(30, 60, 32);
                this.box.geometry = geo;
                break;
            case "TorusGeometry":
                geo = new TorusGeometry(40, 10, 16, 100);
                this.box.geometry = geo;
                break;
            case "IcosahedronGeometry":
                geo = new IcosahedronGeometry(50);
                this.box.geometry = geo;
                break;
            case "Flower":
                let loader = new ObjectLoader();
                loader.load(Models.Flower, (g) => {

                    this.hook.remove(this.box);

                    this.hook.add(g);
                    g.scale.set(300,300,300);

                });
                break;
        }

    },
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
        this.scene.add(camera);

    this.box.add(this.wireframe);
        this.wireframe.visible = this.wire;

    this.hook.add(this.box);
        this.scene.add(this.hook);

    this.light.position.set(100, 200, 75);
        this.light.lookAt(new Vector3(0,0,0));
        this.scene.add(this.light);

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
        this.scene.add( plane );

    wrapper.appendChild(renderer.domElement);

    let animate = () => {

        requestAnimationFrame(animate);
        this.hook.rotation.y += 0.01;
        render();

    }

    let render = () => {
        renderer.render(this.scene, camera);
    }

    animate();

  },
  methods: {

  },
  components: {
      MaterialCode
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
