<template>
    <transition-group name="materials" class="materials" tag="ul">
        <li v-for="(material, index) in materials" v-on:click.self="selectMaterial(material.name)" :key="material.name" v-bind:class="activeMaterial(material)">{{ material.type }}</li>
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
        return this.$store.state.object.materials;
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
          this.$store.commit('object/selectMaterial', { 'name': i });
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
        border: 1px solid #fff;
        color: #fff;
        cursor: pointer;
        opacity: 1;
    }
    li.active {
        border-color: #000;
    }
    li.P { /* Phong */
        background: linear-gradient(to bottom, rgba(0,0,0,0.65) 0%,rgba(0,0,0,0) 100%);
        background-color: #f00;
    }
    li.S { /* Standard */
        background: linear-gradient(to right, rgba(0,0,0,0.65) 0%,rgba(0,0,0,0) 100%);
        background-color: #ff0;
    }
    li.B { /* Basic */
        background-color: #888;
    }
    li.T { /* Toon */
        background: linear-gradient(135deg, rgba(255,255,255,0.7) 47%,rgba(255,255,255,0.3) 53%); 
        background-color: #00f;
    },
    li.L { /* Lambert */

    },
    li.Ph { /* Physical */

    },
    li.Sh { /* Shader */

    }
    .materials-enter-active, .materials-leave-active {
        transition: all 1s;
    }
    .materials-enter, .materials-leave-to /* .list-leave-active for <2.1.8 */ {
        opacity: 0;
    }
</style>
