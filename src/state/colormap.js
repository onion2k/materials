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
      state.texture = payload.image;
    }
  },
  actions: {
    mapUpdate(state, payload) {
      state.commit('updateTexture', payload);
    }
  },
  getters: {

  }
}