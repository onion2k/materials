
export default {
  namespaced: true,
  state: {
    materialSelected: 'Standard',
    materials: [
        { 'name':'Toon', 'type':'MeshToonMaterial' },
        { 'name':'Standard', 'type':'MeshStandardMaterial' },
        { 'name':'Lambert', 'type':'MeshLambertMaterial' },
        { 'name':'Basic', 'type':'MeshBasicMaterial' },
        { 'name':'Phong', 'type':'MeshPhongMaterial' },
        { 'name':'Shader', 'type':'ShaderMaterial' },
        { 'name':'Physical', 'type':'MeshPhysicalMaterial' }
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
    selectMaterial (context, payload) {
        context.commit('selectMaterial', { 'name': payload.name });
        context.commit('properties/updatematerial', { 'material': payload.name }, {root:true});
    }
  }
}
