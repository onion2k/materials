<template>
    <div>
        <canvas ref="draw" v-on:mouseup.self="loadDrawImage" v-on:mousedown.self="startDrawImage" v-on:mousemove.self="moveDrawImage" width="256" height="256"></canvas>
        <color-picker :value="foreground" @input="fg"></color-picker>
    </div>
</template>

<script>

import { Compact } from 'vue-color';

export default {
  name: 'CanvasEdit',
  props: ['data'],
  data: function(){
    return {
        background: { r: 255, g: 255, b: 255},
        foreground: { r: 0, g: 0, b: 0}
    }
  },
  mounted: function(e){
    this.reset();
  },
  methods: {
      backgroundstyle: function(c){
          return "background-color: rgb("+c.r+","+c.g+","+c.b+")";
      },
      fg: function(c){
          this.foreground = c.rgba;
      },
      reset: function(){
        let c = this.$refs["draw"];
        let ctx = c.getContext('2d');
        ctx.fillStyle = "rgb("+this.background.r+","+this.background.g+","+this.background.b+")";
        ctx.fillRect(0,0,256,256);
      },
    startDrawImage: function(e){
        this.drawing = true;
    },
    moveDrawImage: function(e){
        if (this.drawing === true) {
            let c = this.$refs["draw"];
            let ctx = c.getContext('2d');
                ctx.fillStyle = "rgb("+this.foreground.r+","+this.foreground.g+","+this.foreground.b+")";
                ctx.beginPath();
            var coords = getRelativeCoordinates(e, c);
                ctx.arc(coords.x-3, coords.y-3,6,0,2*Math.PI);
                ctx.fill();
        }
    },
    loadDrawImage: function(){
        let c = this.$refs["draw"];
        let ctx = c.getContext('2d');
        let i = c.toDataURL('image/jpeg', 0.9);
        this.$store.dispatch(this.data.namespace+'/mapUpdate', { filename: 'Draw', image: i });
        this.drawing = false;
    }
  },
  components: {
    'color-picker': Compact
  }
}


function getRelativeCoordinates(event, reference) {
    var x, y;
    event = event || window.event;
    var el = event.target || event.srcElement;

    if (!window.opera && typeof event.offsetX != 'undefined') {
      // Use offset coordinates and find common offsetParent
      var pos = { x: event.offsetX, y: event.offsetY };

      // Send the coordinates upwards through the offsetParent chain.
      var e = el;
      while (e) {
        e.mouseX = pos.x;
        e.mouseY = pos.y;
        pos.x += e.offsetLeft;
        pos.y += e.offsetTop;
        e = e.offsetParent;
      }

      // Look for the coordinates starting from the reference element.
      var e = reference;
      var offset = { x: 0, y: 0 }
      while (e) {
        if (typeof e.mouseX != 'undefined') {
          x = e.mouseX - offset.x;
          y = e.mouseY - offset.y;
          break;
        }
        offset.x += e.offsetLeft;
        offset.y += e.offsetTop;
        e = e.offsetParent;
      }

      // Reset stored coordinates
      e = el;
      while (e) {
        e.mouseX = undefined;
        e.mouseY = undefined;
        e = e.offsetParent;
      }
    }
    else {
      // Use absolute coordinates
      var pos = getAbsolutePosition(reference);
      x = event.pageX  - pos.x;
      y = event.pageY - pos.y;
    }

    // Subtract distance to middle
    return { x: x, y: y };

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    canvas {
        border: 1px solid #ddd;
        width: 256px;
        height: 256px;
    }
    div.vue-color__compact {
        margin: 0 auto;
    }
</style>
