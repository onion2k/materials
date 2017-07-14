import mapbase from '../lib/mapbase';
import texture from '../lib/texture';

let bumpmap = new mapbase('bumpmap');

bumpmap.actions.mapUpdate = function(context, payload) {
  if (payload.image!==null) {
    let xRep = context.state.repeat.x || context.rootState.properties.repeat.x;
    let yRep = context.state.repeat.y || context.rootState.properties.repeat.y;
    var t = texture.texture(payload.image, xRep, yRep);
    t.bumpScale = context.state.scale;
  } else {
    let t = undefined;
  }
  context.commit('updateImage', { image: payload.image });
  context.commit('updateTexture', { texture: t });
}

export default bumpmap;