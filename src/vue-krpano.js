var KrShell = require('./krpano-shell.js');

var VueKrpano = {
    install: function (Vue, options) {
        installPrototype(Vue, options);
    }
};

function installPrototype (Vue, options) {
    Vue.prototype.$krShell = window.krShell = new KrShell({
        krpanoInterface: options.krpanoInterface,
        krpanoPlugin: options.krpanoPlugin
    });
}

module.exports = VueKrpano;