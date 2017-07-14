import mapbase from '../lib/mapbase';
import texture from '../lib/texture';

let emissivemap = new mapbase('emissivemap');

emissivemap.state.intensity = 0;

emissivemap.mutations.updateIntensity = function(state, payload) {
  state.intensity = payload.v / 100;
};

emissivemap.actions.sliderUpdate = function(context, payload) {
  context.commit('updateIntensity', payload );
}

export default emissivemap;