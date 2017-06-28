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
    repeat: { x: 5, y: 5 },
    scale: 1.0
  },
  mutations: {
    updateRepeat (state, payload) {
      state.repeat = payload;
      if (state.texture !== null) {
        state.texture.repeat.set( state.repeat.x, state.repeat.y );
        state.texture.needsUpdate = true;
      }
    },
    updateScale (state, payload) {
      state.scale = payload.v / 100;
      //state.texture.bumpScale = state.scale ;
    },
    updateTexture (state, payload) {
        state.texture = payload.texture;
    }
  },
  actions: {
    mapUpdate(context, payload) {

        var i = document.createElement( 'img' );
        i.src = payload.image;
        var t = new Texture(i);
        t.wrapS = t.wrapT = RepeatWrapping;
        t.repeat.set( context.state.repeat.x, context.state.repeat.y );
        t.generateMipmaps = false;
        t.minFilter = LinearFilter;
        t.magFilter = LinearFilter;
        t.needsUpdate = true;

        context.commit('updateTexture', { texture: t });

    },
    xRepeatSliderUpdate(context, payload) {
        context.commit('updateRepeat', { x: payload.v, y: context.state.repeat.y });
    },
    yRepeatSliderUpdate(context, payload) {
        context.commit('updateRepeat', { x: context.state.repeat.x, y: payload.v });
    },
    sliderUpdate(context, payload) {
        context.commit('updateScale', payload );
    }
  }
}