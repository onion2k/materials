import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

Vue.use(Vuex);

let emissiveState = {
  state: {
    texture: null,
    material: {},
    map: {},
    intensity: 0
  },
  mutations: {
    updateEmissiveIntensity (state, payload) {
      state.intensity = payload.v;
    }
  },
  actions: {
    updateEmissiveMap(state, payload) {

    }
  },
  getters: {  }
}

import colormap from './state/colormap';
import bumpmap from './state/bumpmap';

let store = new Vuex.Store({
  modules: {
    colormap: colormap,
    emissive: emissiveState,
    bumpmap: bumpmap
  }
});

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
