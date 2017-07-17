
export default {
  namespaced: true,
  state: {
      materialSelected: 'iaduhsdhidh',
    materials: [{ 'name':'iaduhsdhidh', 'type':'T' },{ 'name':'ewiucwinln', 'type':'S' }]
  },
  mutations: {
    createMaterial (state, payload) { state.materials.push(payload); },
    selectMaterial (state, payload) { 
        state.materialSelected = payload.name;
    },
    removeMaterial (state, payload) { state.materials.splice(payload.index, 1); }
  },
  actions: {

  }
}
