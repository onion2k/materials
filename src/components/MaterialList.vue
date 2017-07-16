<template>
    <ul class="materials">
        <li v-for="(material, index) in materials" v-on:click.self="selectMaterial(index)">{{ material }}</li>
    </ul>
</template>

<script>

export default {
  name: 'materialList',
  props: [],
  data: function(){
    return {
        materials: ['P'] //needs to be computed from a materials array
    }
  },
  methods: {
      selectMaterial: function(i){
          //update the vuex selectedMaterial id
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
    }
</style>
