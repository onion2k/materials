import {
    Texture,
    RepeatWrapping,
    LinearFilter,
    ImageUtils,
    Vector2,
    Color
} from '../../node_modules/three/build/three.module';

let shaders = {
    'Checkerboard':{
        uniforms: {
            color1: { type: "c", value: new Color(0xff0000) },
            color2: { type: "c", value: new Color(0xffffff) },
            scale: { type: "f", value: 5 }
        },
        fragmentShader: 'uniform vec3 color1;\nuniform vec3 color2;\nuniform float scale;\nvarying vec2 vUv;\nvoid main() {\nvec2 center = -1.0 + 2.0 * vUv;\nvec2 uv = floor(center.xy * scale);\nif(mod(uv.x + uv.y, 2.0) > 0.5){\n    gl_FragColor = vec4(color1, 1.0);\n}else{\n    gl_FragColor = vec4(color2, 1.0);\n}\n    }',
        vertexShader: 'varying vec2 vUv;\nvoid main() {\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);\n}'
    },
    'Checkerboard2':{
        uniforms: {
            color1: { type: "c", value: new Color(0xff00ff) },
            color2: { type: "c", value: new Color(0x00ff00) },
            scale: { type: "f", value: 3 }
        },
        fragmentShader: 'uniform vec3 color1;\nuniform vec3 color2;\nuniform float scale;\nvarying vec2 vUv;\nvoid main() {\nvec2 center = -1.0 + 2.0 * vUv;\nvec2 uv = floor(center.xy * scale);\nif(mod(uv.x + uv.y, 2.0) > 0.5){\n    gl_FragColor = vec4(color1, 1.0);\n}else{\n    gl_FragColor = vec4(color2, 1.0);\n}\n    }',
        vertexShader: 'varying vec2 vUv;\nvoid main() {\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);\n}'
    }
}

export default {
  namespaced: true,
  state: Object.assign({}, shaders.Checkerboard),
  mutations: {
    updateUniforms (state, payload) { state.uniforms = payload.uniforms;  },
    updateFragmentShader (state, payload) { state.fragmentShader = payload.fragmentShader; },
    updateVertexShader (state, payload) { state.vertexShader = payload.vertexShader; },
  },
  actions: {
    loadshader (context, payload) {
       context.commit('updateUniforms', { uniforms: shaders[payload.shader].uniforms });
       context.commit('updateFragmentShader', { fragmentShader: shaders[payload.shader].fragmentShader });
       context.commit('updateVertexShader', { vertexShader: shaders[payload.shader].vertexShader });
    }
  }
}