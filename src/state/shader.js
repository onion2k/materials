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
        time: { type: "f", value: 1.5 },
        resolution: { type: "v2", value: new Vector2(300,200) },
        color1: { type: "c", value: new Color(0xff0000) },
        color2: { type: "c", value: new Color(0xffffff) },
        scale: { type: "f", value: 5 },
    },
    fragmentShader: 'uniform vec3 color1;\n\
uniform vec3 color2;\n\
uniform float scale;\n\
varying vec2 vUv;\n\
uniform float time;\n\
void main() {\n\
vec2 center = -1.0 + 2.0 * vUv;\n\
vec2 uv = floor(center.xy * scale * time);\n\
if(mod(uv.x + uv.y, 2.0) > 0.5){\n\
    gl_FragColor = vec4(color1, 1.0);\n\
}else{\n\
    gl_FragColor = vec4(color2, 1.0);\n\
}\n\
    }',
    vertexShader: 'varying vec2 vUv;\n\
void main() {\n\
    vUv = uv;\n\
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);\n\
}'


  },
  mutations: {
    updateUniforms (state, payload) { state.uniforms = payload.uniforms; },
    updateFragmentShader (state, payload) { state.fragmentShader = payload.fragmentShader; },
    updateVertexShader (state, payload) { state.vertexShader = payload.vertexShader; }
  },
  actions: {

  }
}