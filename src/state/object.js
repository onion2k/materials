
export default {
  namespaced: true,
  state: {
    materialSelected: 'M-1-1',
    materials: [
        { 'name':'M-1-1', 'type':'MeshStandardMaterial', 'color': {r:255, g:0, b:0 } }
    ]
  },
  mutations: {
    createMaterial (state, payload) {
      state.materials.push(payload);
    },
    selectMaterial (state, payload) {
        state.materialSelected = payload.name;
    },
    removeMaterial (state, payload) {
      state.materials.splice(payload.index, 1);
    },
    replaceMaterials (state, payload) {
      state.materials = [];
      payload.materials.map((material)=>{
        state.materials.push({ name: material.name, type: material.type, color: material.color });
      });
      state.materialSelected = payload.materials[0].name;
    }
  },
  actions: {
    selectMaterial (context, payload) {
        let material = context.state.materials.find((m)=>{ return m.name === payload.name });
        context.commit('selectMaterial', { 'name': material.name });
        context.commit('properties/updateColor', { 'r': material.color.r, 'g': material.color.g, 'b': material.color.b, 'a':0 }, { root:true });
        context.commit('properties/updatematerial', { 'material': material.type }, { root:true });
    },
    loadMaterials (context, payload) {
      context.commit('replaceMaterials', payload);
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
