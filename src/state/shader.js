import {
    Texture,
    RepeatWrapping,
    LinearFilter,
    ImageUtils,
    Vector2,
    Color
} from '../../node_modules/three/build/three.module';

export default {
  namespaced: true,
  state: {
    uniforms: {
        time: { type: "f", value: 123.0 },
        resolution: { type: "v2", value: new Vector2(300,200) },
        color1: { type: "c", value: new Color(0xff0000) },
        color2: { type: "c", value: new Color(0xffffff) },
        scale: { type: "f", value: 5 },
    },
    // fragmentShader: '\
    //     uniform float time;\n\
    //     uniform vec2 resolution;\n\
    //     void main()	{\n\
    //         float x = mod(gl_FragCoord.x, 20.) < 10. ? 1. : 0.;\n\
    //         float y = mod(gl_FragCoord.y, 20.) < 10. ? 1. : 0.;\n\
    // 		gl_FragColor = vec4(vec3(min(x, y)), 1.);\n\
    //     }\n',
    // vertexShader: '\
    //     void main() {\n\
    //         vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\
    //         gl_Position = projectionMatrix * mvPosition;\n\
    //     }\n'
    fragmentShader: '\
        uniform vec3 color1;\n\
        uniform vec3 color2;\n\
        uniform float scale;\n\
        varying vec2 vUv;\n\
        void main() {\n\
        vec2 center = -1.0 + 2.0 * vUv;\n\
        vec2 uv = floor(center.xy * scale);\n\
        if(mod(uv.x + uv.y, 2.0) > 0.5){\n\
            gl_FragColor = vec4(color1, 1.0);\n\
        }else{\n\
            gl_FragColor = vec4(color2, 1.0);\n\
        }\n\
    }\n',
    vertexShader: '\
        varying vec2 vUv;\n\
        void main() {\n\
            vUv = uv;\n\
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);\n\
        }\n'


  },
  mutations: {
    updateUniforms (state, payload) { state.uniforms = payload.uniforms; },
    updateFragmentShader (state, payload) { state.fragmentShader = payload.fragmentShader; },
    updateVertexShader (state, payload) { state.vertexShader = payload.vertexShader; }
  },
  actions: {

  }
}