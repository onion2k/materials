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
    color: '',
    shininess: 0,
    reflectivity: 0,
    roughness: 0,
    metalness: 0,
    clearcoat: 0,
    clearcoatRoughness: 0
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
    updateClearcoatRoughness (state, payload) { state.clearcoatRoughness = payload.clearcoatRoughness; }
  },
  actions: {

  }
}