
export default {
  namespaced: true,
  state: {
    material: 'MeshPhysicalMaterial',
    geometry: 'SphereGeometry',
    color: { r: 255, g: 255, b: 255, a: 0 },
    shininess: 0,
    reflectivity: 0,
    combine: 'multiply',
    roughness: 0.1,
    metalness: 0.1,
    clearcoat: 0.1,
    clearcoatRoughness: 0,
    repeat: { x: 5, y: 5 },
    offset: { x: 5, y: 5 },
    sidedness: 'front'
  },
  mutations: {
    updateColor (state, payload) { state.color = { r: payload.r, g: payload.g, b: payload.b, a: payload.a }; },
    updateShininess (state, payload) { state.shininess = payload.shininess; },
    updateReflectivity (state, payload) { state.reflectivity = payload.reflectivity; },
    updateRoughness (state, payload) { state.roughness = payload.roughness; },
    updateMetalness (state, payload) { state.metalness = payload.metalness; },
    updateClearcoat (state, payload) { state.clearcoat = payload.clearcoat; },
    updateClearcoatRoughness (state, payload) { state.clearcoatRoughness = payload.clearcoatRoughness; },
    updatexrepeat (state, payload) { state.repeat.x = payload.x; },
    updateyrepeat (state, payload) { state.repeat.y = payload.y; },
    updatexoffset (state, payload) { state.offset.x = payload.x; },
    updateyoffset (state, payload) { state.offset.y = payload.y; },
    updatecombine (state, payload) { state.combine = payload.combine; },
    updatesidedness (state, payload) { state.sidedness = payload.sidedness; },
    updategeometry (state, payload) { state.geometry = payload.geometry; },
    updatematerial (state, payload) { state.material = payload.material; }
  },
  actions: {
    updateColor (context, payload) {
        context.commit('updateColor', payload);
        context.dispatch('object/updateMaterial', { 'color': payload }, { root: true });
    },
  }
}