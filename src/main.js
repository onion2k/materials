import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

Vue.use(Vuex);

const emissiveState = {
  state: {
    map: {},
    intensity: 0
  },
  mutations: {
    updateEmissiveIntensity (state, payload) {
      state.intensity = payload.v;
    }
  },
  actions: {
    updateEmissiveIntensity (state, payload) {

    }
  },
  getters: {  }
}

let store = new Vuex.Store({
  modules: {
    emissive: emissiveState
  }
});

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
