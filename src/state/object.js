
export default {
  namespaced: true,
  state: {
    material: 'mm',
    materialSelected: 'MeshPhysicalMaterial',
    materials: {
        'MeshToonMaterial': { 'name':'MeshToonMaterial', 'type':'MeshToonMaterial' },
        'MeshStandardMaterial': { 'name':'MeshStandardMaterial', 'type':'MeshStandardMaterial' },
        'MeshLambertMaterial': { 'name':'MeshLambertMaterial', 'type':'MeshLambertMaterial' }
    }
  },
  mutations: {
    createMaterial (state, payload) { state.materials.push(payload); },
    selectMaterial (state, payload) {
        state.materialSelected = payload.name;
    },
    removeMaterial (state, payload) { state.materials.splice(payload.index, 1); }
  },
  actions: {
    selectMaterial (context, payload) {
        context.commit('selectMaterial', { 'name': payload.name });
        context.commit('properties/updatematerial', { 'material': payload.name }, {root:true});
    }
  },
  getters: {
      material: function(state, getters, rootState){
        return state.materials[state.materialSelected];
      }
  }
}
