import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        id: ''
    },
    mutations: {
      updateEmissiveIntensity (state, payload) {
        console.log(payload);
      }
    },
    actions: {
      geocode (state, payload) { socket.emit('geocode', payload); }
    }
});


new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
