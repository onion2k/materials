import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

Vue.use(Vuex);

import object from './state/object';
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
import normalmap from './state/normalmap';
import displacementmap from './state/displacementmap';
import shader from './state/shader';

let store = new Vuex.Store({
  modules: {
    object: object,
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
    metalnessmap: metalnessmap,
    normalmap: normalmap,
    displacementmap: displacementmap,
    shader: shader
  }
});

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
