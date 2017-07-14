
import texture from './texture';

export default function(ns) {

    this.namespaced = true,
    this.state = {
        n: ns,
        image: undefined,
        texture: undefined,
        repeat: { x: null, y: null },
        scale: 1.0
    },
    this.mutations = {
        updateRepeat (state, payload) {
        state.repeat = payload;
        if (state.texture !== undefined) {
            state.texture.repeat.set( state.repeat.x, state.repeat.y );
        }
        state.texture.needsUpdate = true;
        },
        updateScale (state, payload) {
        state.scale = payload.v / 100;
        },
        updateImage (state, payload) {
            state.image = payload.image;
        },
        updateTexture (state, payload) {
            state.texture = payload.texture;
        }
    },
    this.actions = {
        mapUpdate(context, payload) {
            if (payload.image!==null) {
            let xRep = context.state.repeat.x || context.rootState.properties.repeat.x;
            let yRep = context.state.repeat.y || context.rootState.properties.repeat.y;
            var t = texture.texture(payload.image, xRep, yRep);
            } else {
            let t = undefined;
            }
            context.commit('updateImage', { image: payload.image });
            context.commit('updateTexture', { texture: t });
        },
        xRepeatSliderUpdate(context, payload) {
            context.commit('updateRepeat', { x: payload.v, y: context.state.repeat.y });
        },
        yRepeatSliderUpdate(context, payload) {
            context.commit('updateRepeat', { x: context.state.repeat.x, y: payload.v });
        },
        sliderUpdate(context, payload) {
            context.commit('updateScale', payload );
        }
    },
    this.getters = {
        texturePreloader: function(state, getters, rootState){

        let prefix = ns;
        let xRep = state.repeat.x || rootState.properties.repeat.x;
        let yRep = state.repeat.y || rootState.properties.repeat.y;

        let str = '';
        if (state.texture) {

            str += 'var '+prefix+'SrcImage = document.createElement( \'img\' );\n\
        '+prefix+'SrcImage.src = \''+state.image+'\';\n\n\
    var '+prefix+'Texture = new THREE.Texture( '+prefix+'SrcImage );\n\
        '+prefix+'Texture.wrapS = '+prefix+'Texture.wrapT = THREE.RepeatWrapping;\n\
        '+prefix+'Texture.repeat.set( '+xRep+', '+yRep+' );\n\
        '+prefix+'Texture.generateMipmaps = false;\n\
        '+prefix+'Texture.minFilter = THREE.LinearFilter;\n\
        '+prefix+'Texture.magFilter = THREE.LinearFilter;\n\
        '+prefix+'Texture.needsUpdate = true;\n\n';

        }

        return str;

        }
    }
}