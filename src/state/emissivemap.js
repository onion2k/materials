
import texture from '../lib/texture';

export default {
  namespaced: true,
  state: {
    color: undefined,
    texture: undefined,
    repeat: { x: null, y: null },
    intensity: 1.0
  },
  mutations: {
    updateRepeat (state, payload) {
      state.repeat = payload;
      if (state.texture !== undefined) {
        state.texture.repeat.set( state.repeat.x, state.repeat.y );
      }
      state.texture.needsUpdate = true;
    },
    updateColor: function(state, payload) {
      state.color = payload.rgba;
    },
    updateIntensity (state, payload) {
      state.intensity = payload.v;
    },
    updateTexture (state, payload) {
        state.texture = payload.texture;
    }
  },
  actions: {
    mapUpdate(context, payload) {
        if (payload.image!==null) {
          let xRep = context.state.repeat.x || context.rootState.properties.repeat.x;
          let yRep = context.state.repeat.y || context.rootState.properties.repeat.y;
          var t = texture.texture(payload.image, xRep, yRep);
        } else {
          let t = undefined;
        }
        context.commit('updateTexture', { texture: t });
    },
    xRepeatSliderUpdate(context, payload) {
        context.commit('updateRepeat', { x: payload.v, y: context.state.repeat.y });
    },
    yRepeatSliderUpdate(context, payload) {
        context.commit('updateRepeat', { x: context.state.repeat.x, y: payload.v });
    },
    sliderUpdate(context, payload) {
        context.commit('updateIntensity', payload );
    },
    colorUpdate(context, payload) {
        context.commit('updateColor', payload );
    }
  }
}