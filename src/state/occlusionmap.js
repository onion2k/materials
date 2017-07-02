import {
    Texture,
    RepeatWrapping,
    LinearFilter,
    ImageUtils
} from '../../node_modules/three/build/three.module';

export default {
  namespaced: true,
  state: {
    texture: null,
    repeat: { x: null, y: null },
    intensity: 1.0
  },
  mutations: {
    updateRepeat (state, payload) {
      state.repeat = payload;
      if (state.texture !== null) {
        state.texture.repeat.set( state.repeat.x, state.repeat.y );
      }
      state.texture.needsUpdate = true;
    },
    updateIntensity (state, payload) {
      state.intensity = payload.v / 100;
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

          var i = document.createElement( 'img' );
          i.src = payload.image;
          var t = new Texture(i);
          t.wrapS = t.wrapT = RepeatWrapping;
            t.repeat.set( xRep, yRep );
          t.generateMipmaps = false;
          t.minFilter = LinearFilter;
          t.magFilter = LinearFilter;
          t.needsUpdate = true;
        } else {
          let t = null;
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
    }
  }
}