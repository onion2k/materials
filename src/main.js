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

let bumpState = {
  state: {
    texture: null,
    repeat: { x: 5, y: 5 },
    scale: 1.0
  },
  mutations: {
    updateBumpRepeat (state, payload) {
      state.repeat = payload.v;
    },
    updateBumpScale (state, payload) {
      state.bumpScale = payload.v;
    },
    updateBumpTexture (state, payload) {
      state.texture = payload.image;
    }
  },
  actions: {
    updateBumpMap(state, payload) {
      state.commit('updateBumpTexture', payload);
    }
  },
  getters: {

  }
}


let store = new Vuex.Store({
  modules: {
    emissive: emissiveState,
    bump: bumpState
  }
});

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
