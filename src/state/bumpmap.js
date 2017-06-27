
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
      state.repeat = payload.v;
    },
    updateScale (state, payload) {
      state.bumpScale = payload.v;
    },
    updateTexture (state, payload) {
        state.texture = payload.texture;
    }
  },
  actions: {
    updateMap(context, payload) {

        console.log(context.state.repeat.x);

        var i = document.createElement( 'img' );
        i.src = payload.image;
        var t = new Texture(i);
        t.wrapS = t.wrapT = RepeatWrapping;
        t.repeat.set( context.state.repeat.x, context.state.repeat.y );
        t.generateMipmaps = false;
        t.minFilter = LinearFilter;
        t.magFilter = LinearFilter;
        t.bumpScale = context.state.scale;
        t.needsUpdate = true;

        context.commit('updateTexture', { texture: t });

    }
  }
}