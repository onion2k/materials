import {
    Texture,
    RepeatWrapping,
    LinearFilter,
    ImageUtils,
    Vector2
} from '../../node_modules/three/build/three.module';

export default {
  namespaced: true,
  state: {
    uniforms: {
        time: { type: "f", value: 123.0 },
        resolution: { type: "v2", value: new Vector2(300,200) }
    },
    fragmentShader: '\
        uniform float time;\n\
        uniform vec2 resolution;\n\
        void main()	{\n\
            float x = mod(gl_FragCoord.x, 20.) < 10. ? 1. : 0.;\n\
            float y = mod(gl_FragCoord.y, 20.) < 10. ? 1. : 0.;\n\
    		gl_FragColor = vec4(vec3(min(x, y)), 1.);\n\
        }\n',
    vertexShader: '\
        void main() {\n\
            vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\
            gl_Position = projectionMatrix * mvPosition;\n\
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