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
    materials: [{ 'name':'iaduhsdhidh', 'type':'P' },{ 'name':'ewiucwinln', 'type':'S' }]
  },
  mutations: {
    createMaterial (state, payload) { state.materials.push(payload); },
    removeMaterial (state, payload) { state.materials.splice(payload.index, 1); }
  },
  actions: {
  }
}
