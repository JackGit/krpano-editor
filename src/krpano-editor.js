var Vue = require('vue');
var VueTouch = require('vue-touch');
var VueKrpano = require('./vue-krpano.js');

Vue.use(VueTouch);

function krpanoplugin () {
    "use strict";
    var local = this;
    var krpano = null;
    var plugin = null;

    local.registerplugin = function (krpanoInterface, pluginPath, pluginObject) {
        console.log('register plugin');

        Vue.use(VueKrpano, {
            krpanoInterface: krpanoInterface,
            krpanoPlugin: pluginObject
        });

        krpano = krpanoInterface;
        plugin = pluginObject;

        plugin.registercontentsize(krpano.get('stagewidth'), krpano.get('stageheight') * 0.1);

        plugin.sprite.appendChild(document.createElement('app'));
        new Vue({
            el: plugin.sprite,
            components: {
                app: require('./components/com.vue')
            }
        });

    };

    local.unloadplugin = function () {
        krpano = null;
        plugin = null;
    };

    local.onresize = function (width, height) {
        console.log('resizing', width, height);
    };

}

module.exports = window.krpanoplugin = krpanoplugin;