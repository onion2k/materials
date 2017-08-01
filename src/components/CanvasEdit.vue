<template>
    <div>
        <canvas ref="draw" v-on:mouseup.self="loadDrawImage" v-on:mousedown.self="startDrawImage" v-on:mousemove.self="moveDrawImage" width="256" height="256"></canvas>
        <ul class="colors">
            <li v-for="color in colors" v-bind:style="backgroundstyle(color)" v-on:click="fg(color)"></li>
        </ul>
    </div>
</template>

<script>

export default {
  name: 'CanvasEdit',
  props: ['data'],
  data: function(){
    return {
        background: { r: 255, g: 255, b: 255},
        foreground: { r: 0, g: 0, b: 0},
        colors: [
            { r:23, g:30, b:31 },
            { r:157, g:224, b:110 },
            { r:83, g:61, b:182 },
            { r:65, g:128, b:49 },
            { r:216, g:61, b:140 },
            { r:77, g:214, b:221 },
            { r:233, g:132, b:57 },
            { r:46, g:147, b:220 },
            { r:132, g:59, b:21 },
            { r:32, g:41, b:99 },
            { r:221, g:186, b:148 },
            { r:86, g:15, b:34 },
            { r:219, g:224, b:231 },
            { r:21, g:54, b:12 },
            { r:233, g:166, b:222 },
            { r:91, g:110, b:114 }
        ]
    }
  },
  computed: {

  },
  mounted: function(e){
    this.reset();
  },
  methods: {
      backgroundstyle: function(c){
          return "background-color: rgb("+c.r+","+c.g+","+c.b+")";
      },
      fg: function(c){
          this.foreground = c;
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
    ul.colors {
        display: grid;
        padding: 0;
        margin: 0;
        grid-template-columns: repeat(8, .125fr);
        align-items: center;
        list-style: none;
    }
    li {
        padding: 0;
        margin: 0;
        width: 100%;
        min-height: 35px;
        border: 1px solid #fff;
        color: #fff;
        cursor: pointer;
        opacity: 1;
    }
</style>
