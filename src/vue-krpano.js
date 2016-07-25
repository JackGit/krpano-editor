var VueKrpano = {
    install: function (Vue, options) {
        installPrototype(Vue, options);
        installGlobalMethods(Vue, options);
    }
};

function installPrototype (Vue, options) {
    Vue.prototype.$krInterface = options.krpanoInterface;
    Vue.prototype.$krPlugin = options.krpanoPlugin;
}

function installGlobalMethods (Vue, options) {
    var kr = options.krpanoInterface;

    Vue.krCall = function () {
        var actionName = arguments[0];
        var callStr = actionName + '(';
        var args = [];
        var i;

        if (!actionName || typeof actionName !== 'string') {
            console.error('krCall() actionName is required as string');
            return;
        }

        for (i = 1; i < arguments.length; i ++) {
            switch (typeof arguments[i]) {
                case 'string':
                    args.push('"' + arguments[i] + '"');
                    break;
                case 'number':
                case 'boolean':
                    args.push(arguments[i]);
                    break;
                case 'undefined':
                case 'object':
                case 'function':
                    if (arguments[i] !== null) {
                        console.warn('krCall: some of parameters are not one of these types: string, number, boolean. And they will convert to string, which may cause unexpected results');
                    }
                    args.push(arguments[i] + '');
                    break;
            }
        }

        callStr += args.join(',') + ');';
        console.log('krCall is calling "' + callStr + '"');

        kr.call(callStr);
    }
}

module.exports = VueKrpano;