import {
    Texture,
    RepeatWrapping,
    LinearFilter,
    ImageUtils
} from '../../node_modules/three/build/three.module';

export default {
  namespaced: true,
  state: {
    color: 0,
    shininess: 0,
    reflectivity: 0,
    roughness: 0,
    metalness: 0,
    clearcoat: 10,
    clearcoatRoughness: 0
  },
  mutations: {
    updateColor (state, payload) {
        state.color = payload.color;
    },
    updateClearcoat (state, payload) {
        state.clearcoat = payload.clearcoat;
    }
  },
  actions: {

  }
}