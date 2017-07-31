<template>
    <canvas ref="draw" v-on:mouseup.self="loadDrawImage" v-on:mousedown.self="startDrawImage" v-on:mousemove.self="moveDrawImage" width="256" height="256" style="width: 256px; height: 256px;"></canvas>
</template>

<script>

export default {
  name: 'CanvasEdit',
  props: ['data'],
  data: function(){
    return {
        background: { r: 255, g: 255, b: 255},
        foreground: { r: 0, g: 0, b: 0}
    }
  },
  computed: {

  },
  mounted: function(e){
    this.reset();
  },
  methods: {
      reset: function(){

        let c = this.$refs["draw"];
        let ctx = c.getContext('2d');

        console.log(this.background)

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
