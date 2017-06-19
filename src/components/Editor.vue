<template>
    <div class="editor col-sm-3 col-md-4 hidden-xs-down bg-faded sidebar">
        <h1>Material Examples</h1>
        <div class="list-group">
            <a v-for="(material, index) in materials" href="#" v-on:click="change(index)" class="list-group-item list-group-item-action">{{ material.name }}</a>
            <div class="list-group-item list-group-item-action justify-content-between">
                Show wireframe
                <input type="checkbox" id="wire" v-model="showwire" v-on:click="updatewire">
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'Editor',
  props: ['materialId', 'materials', 'wire'],
  data: function(){
    return {
        showwire: this.wire,
        id: this.materialId
    }
  },
  methods: {
    updatewire: function() {
        this.$emit('updatewire', { 'wire': this.showwire });
    },
    change: function(v) {
        this.$emit('change', { 'material': v });
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
    list-style: none;
    padding: 0;
    margin: 0;
}
li {
    text-align: left;
}
a {
    text-decoration: none;
}
</style>
