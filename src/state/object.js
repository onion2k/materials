
export default {
  namespaced: true,
  state: {
    materialSelected: 'Standard',
    materials: [
        { 'name':'Toon', 'type':'T' },
        { 'name':'Standard', 'type':'S' },
        { 'name':'Lambert', 'type':'L' },
        { 'name':'Basic', 'type':'B' },
        { 'name':'Phong', 'type':'P' },
        { 'name':'Shader', 'type':'Sh' },
        { 'name':'Physical', 'type':'Ph' }
    ]
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
