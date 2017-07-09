import {
    Texture,
    RepeatWrapping,
    LinearFilter,
    ImageUtils
} from '../../node_modules/three/build/three.module';

export default {

    texture: function (image, x, y) {

        var i = document.createElement('img');

        var t = new Texture(i);
        t.wrapS = t.wrapT = RepeatWrapping;
        t.repeat.set( x, y );
        t.generateMipmaps = false;
        t.minFilter = LinearFilter;
        t.magFilter = LinearFilter;
        t.needsUpdate = false;
        i.addEventListener('load', function(){
            t.needsUpdate = true;
        });
        i.src = image;

        return t;

    }

}
