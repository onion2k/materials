
export default {
  namespaced: true,
  state: {
    material: 'mm',
    materialSelected: 'MeshPhysicalMaterial',
    materials: [
        { 'name':'MeshStandardMaterial', 'type':'MeshStandardMaterial' }
    ]
  },
  mutations: {
    createMaterial (state, payload) {
      state.materials.push(payload);
    },
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
      materials: function(state, getters, rootState){
        return state.materials;
      },
      material: function(state, getters, rootState){
        return state.materials.find((m)=>{ return m.name === state.materialSelected });
      }
  }
}
