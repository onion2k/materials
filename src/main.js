import 'babel-polyfill';
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

Vue.use(Vuex);

import properties from './state/properties';
import alphamap from './state/alphamap';
import bumpmap from './state/bumpmap';
import colormap from './state/colormap';
import emissivemap from './state/emissivemap';
import lightmap from './state/lightmap';
import aomap from './state/aomap';
import specularmap from './state/specularmap';
import envmap from './state/envmap';
import roughnessmap from './state/roughnessmap';
import metalnessmap from './state/metalnessmap';

let store = new Vuex.Store({
  modules: {
    properties: properties,
    alphamap: alphamap,
    bumpmap: bumpmap,
    colormap: colormap,
    emissivemap: emissivemap,
    lightmap: lightmap,
    aomap: aomap,
    specularmap: specularmap,
    envmap: envmap,
    roughnessmap: roughnessmap,
    metalnessmap: metalnessmap
  }
});

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
