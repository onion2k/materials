<template>
    <transition-group name="materials" class="materials" tag="ul">
        <li v-for="material in materials" v-on:click.self="selectMaterial(material.type)" :key="material.name" v-bind:class="activeMaterial(material)">{{ materialName(material.type) }}</li>
        <li v-on:click.self="createMaterial()" key="add">+</li>
    </transition-group>
</template>

<script>

export default {
  name: 'materialList',
  props: [],
  data: function(){
    return {

    }
  },
  computed: {
    materialSelected: function(){
        return this.$store.state.object.materialSelected;
    },
    materials: function(){
        return this.$store.getters['object/materials'];
    }
  },
  methods: {
      activeMaterial: function(material){
        var c = [material.type];
        if (material.name==this.materialSelected) {
            c.push('active');
        }
        return c;
      },
      selectMaterial: function(i){
          this.$store.dispatch('object/selectMaterial', { 'name': i });
      },
      createMaterial: function(){
          this.$store.commit('object/createMaterial', { 'name':'MeshBasicMaterial', 'type': 'MeshBasicMaterial' });
      },
      materialName: function(n) {
          switch (n) {
              case "ShaderMaterial":
                return "Sh";
                break;
            default:
                return n.substring(4,5);
                break;
          }
      }
  },
  components: {
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    ul.materials {
        background-color: #fff;
        width: 100%;
        display: inline-grid;
        grid-template-columns: .25fr .25fr .25fr .25fr;
        grid-gap: 10px;
        align-items: center;
    }
    li {
        padding: 0;
        margin: 0;
        width: 100%;
        font-size: 70px;
        line-height: 95px;
        height: 100px;
        background-color: #bbb;
        border: 1px solid #fff;
        color: #fff;
        cursor: pointer;
        opacity: 1;
    }
    li.active {
        border-color: #000;
    }
    li.MeshPhongMaterial { /* Phong */
        background: linear-gradient(to bottom, rgba(0,0,0,0.65) 0%,rgba(0,0,0,0) 100%);
        background-color: #f00;
    }
    li.MeshStandardMaterial { /* Standard */
        background: linear-gradient(to right, rgba(0,0,0,0.65) 0%,rgba(0,0,0,0) 100%);
        background-color: #ff0;
    }
    li.MeshBasicMaterial { /* Basic */
        background: none;
        background-color: #888;
    }
    li.MeshToonMaterial { /* Toon */
        background: linear-gradient(135deg, rgba(255,255,255,0.7) 49%,rgba(255,255,255,0.3) 51%); 
        background-color: #00f;
    },
    li.MeshLambertMaterial { /* Lambert */
        background: linear-gradient(to right, rgba(255,255,255,0.7) 20%,rgba(255,255,255,0.3) 80%); 
        background-color: #00f;
    },
    li.MeshPhysicalMaterial { /* Physical */
        background: linear-gradient(to top, rgba(255,255,255,1.0) 0%,rgba(255,255,255,0) 100%); 
        background-color: #0ff;
    },
    li.ShaderMaterial { /* Shader */
        background: none;
        background-color: #00f;
    }
    .materials-enter-active, .materials-leave-active {
        transition: all 1s;
    }
    .materials-enter, .materials-leave-to /* .list-leave-active for <2.1.8 */ {
        opacity: 0;
    }
</style>
