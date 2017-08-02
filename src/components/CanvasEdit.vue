<template>
    <div>
        <canvas ref="draw" v-on:mouseup.self="loadDrawImage" v-on:mousedown.self="startDrawImage" v-on:mousemove.self="moveDrawImage" width="256" height="256"></canvas>
        <color-picker :value="foreground" @input="fg"></color-picker>
        <vue-slider ref="slider" v-bind="sizeSettings" v-model="sizeValue"></vue-slider>
    </div>
</template>

<script>

import vueSlider from 'vue-slider-component';
import { Compact } from 'vue-color';

var pcoords;

export default {
  name: 'CanvasEdit',
  props: ['data'],
  data: function(){    
    return {
        background: { r: 255, g: 255, b: 255},
        foreground: { r: 0, g: 0, b: 0},
        sizeValue: 5,
        sizeSettings: { width: '256px', tooltip: 'hover', min: 1, max: 20 },
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
    //   size: function(s) {
    //     this.lineWidth = s;
    //   },
      reset: function(){
        var ctx = this.$refs["draw"].getContext('2d');
        // let c = this.$refs["draw"];
        // let ctx = c.getContext('2d');
        ctx.fillStyle = "rgb("+this.background.r+","+this.background.g+","+this.background.b+")";
        ctx.fillRect(0,0,256,256);
      },
    startDrawImage: function(e){
        e.target.style.cursor = 'pointer';
        var c = this.$refs["draw"];
        pcoords = getRelativeCoordinates(e, c);
        this.drawing = true;
    },
    moveDrawImage: function(e){
        if (this.drawing === true) {
            var c = this.$refs["draw"];
            var ctx = c.getContext('2d');
            var coords = getRelativeCoordinates(e, c);
                ctx.lineWidth = this.sizeValue;
                ctx.strokeStyle = "rgb("+this.foreground.r+","+this.foreground.g+","+this.foreground.b+")";
                ctx.beginPath();
                ctx.moveTo(pcoords.x, pcoords.y);
                ctx.lineTo(coords.x, coords.y);
                ctx.stroke();
                pcoords = coords;
        }
    },
    loadDrawImage: function(e){
        e.target.style.cursor = 'default';
        let c = this.$refs["draw"];
        //let ctx = c.getContext('2d');
        let i = c.toDataURL('image/jpeg', 0.9);
        this.$store.dispatch(this.data.namespace+'/mapUpdate', { filename: 'Draw', image: i });
        this.drawing = false;
    }
  },
  components: {
    vueSlider,
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
    div.vue-slider-wrap {
        margin: 10px auto 0 auto;        
    }
    div.vue-color__compact {
        width: 245px;
        margin: 10px auto 0 auto;
    }
</style>
