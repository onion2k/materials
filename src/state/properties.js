import {
    Texture,
    RepeatWrapping,
    LinearFilter,
    ImageUtils
} from '../../node_modules/three/build/three.module';

import rgbHex from 'rgb-hex';

export default {
  namespaced: true,
  state: {
    color: 16000000,
    shininess: 0,
    reflectivity: 0,
    roughness: 0.1,
    metalness: 0.1,
    clearcoat: 0.1,
    clearcoatRoughness: 0,
    repeat: { x: 5, y: 5 }
  },
  mutations: {
    updateColor (state, payload) {
      state.color = parseInt(rgbHex(payload.r,payload.g,payload.b), 16);
    },
    updateShininess (state, payload) { state.shininess = payload.shininess; },
    updateReflectivity (state, payload) { state.reflectivity = payload.reflectivity; },
    updateRoughness (state, payload) { state.roughness = payload.roughness; },
    updateMetalness (state, payload) { state.metalness = payload.metalness; },
    updateClearcoat (state, payload) { state.clearcoat = payload.clearcoat; },
    updateClearcoatRoughness (state, payload) { state.clearcoatRoughness = payload.clearcoatRoughness; },
    updatexrepeat (state, payload) { state.repeat.x = payload.x; },
    updateyrepeat (state, payload) { state.repeat.y = payload.y; }
  },
  actions: {

  }
}