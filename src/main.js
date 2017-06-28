import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

Vue.use(Vuex);

import alphamap from './state/alphamap';
import bumpmap from './state/bumpmap';
import colormap from './state/colormap';
import emissivemap from './state/emissivemap';
import lightmap from './state/lightmap';
import occlusionmap from './state/occlusionmap';
import specularmap from './state/specularmap';
import envmap from './state/envmap';

let store = new Vuex.Store({
  modules: {
    alphamap: alphamap,
    bumpmap: bumpmap,
    colormap: colormap,
    emissivemap: emissivemap,
    lightmap: lightmap,
    occlusionmap: occlusionmap,
    specularmap: specularmap,
    envmap: envmap
  }
});

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
