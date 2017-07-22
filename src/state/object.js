
export default {
  namespaced: true,
  state: {
    materialSelected: 'M-1-1',
    materials: [
        { 'name':'M-1-1', 'type':'MeshStandardMaterial' }
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
        let material = context.state.materials.find((m)=>{ return m.name === payload.name });
        context.commit('selectMaterial', { 'name': material.name });
        context.commit('properties/updatematerial', { 'material': material.type }, {root:true});
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
