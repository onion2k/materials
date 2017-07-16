<template>
    <transition-group name="materials" class="materials" tag="ul">
        <li v-for="(material, index) in materials" v-on:click.self="selectMaterial(index)" :key="material.name">{{ material.type }}</li>
        <li v-on:click.self="createMaterial()" key="add">+</li>
    </transition-group>
</template>

<script>

export default {
  name: 'materialList',
  props: [],
  data: function(){
    return {
        //materials: ['P'] //needs to be computed from a materials array
    }
  },
  computed: {
    materials: function(){
        return this.$store.state.object.materials;
    }
  },
  methods: {
      selectMaterial: function(i){
          //update the vuex selectedMaterial id
          this.$store.commit('object/removeMaterial', { 'index': i });
      },
      createMaterial: function(){
          this.$store.commit('object/createMaterial', { 'name':'asdiojasdoj', 'type': 'B' });
      }
  },
  components: {
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    ul.materials {
        width: 100%;
        display: inline-grid;
        grid-template-columns: .25fr .25fr .25fr .25fr;
        grid-gap: 10px;
        justify-items: center;
        align-items: center;
    }
    li {
        padding: 0;
        margin: 0;
        width: 100%;
        font-size: 70px;
        line-height: 95px;
        height: 100px;
        border: 1px solid #888;
        color: #DDD;
        cursor: pointer;
        opacity: 1;
    }
    .materials-enter-active, .materials-leave-active {
        transition: all 1s;
    }
    .materials-enter, .materials-leave-to /* .list-leave-active for <2.1.8 */ {
        opacity: 0;
    }
</style>
