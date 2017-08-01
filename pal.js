var distinctColors = require('distinct-colors')
var palette = distinctColors({
    count: 16
}) // You may pass an optional config object

palette.map((c)=>{
    console.log('{ r:'+c._rgb[0]+', g:'+c._rgb[1]+', b:'+c._rgb[2]+' },');
})

