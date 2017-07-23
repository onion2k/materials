import mapbase from '../lib/mapbase';
import texture from '../lib/texture';

let envmap = new mapbase('envmap', 'envMap');

envmap.actions.mapUpdate = function(context, payload) {
  if (payload.image!==null) {
    var t = texture.cubetexture(payload.image);
  } else {
    let t = undefined;
  }
  context.commit('updateImage', { image: payload.image });
  context.commit('updateTexture', { texture: t });
}

export default envmap;