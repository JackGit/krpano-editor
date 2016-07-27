function KrpanoShell (options) {
    this.krInterface = options.krpanoInterface;
    this.krPlugin = options.krpanoPlugin;
}

KrpanoShell.prototype = {

    krCall: function () {
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
        console.log('krCall is calling ' + callStr);

        this.krInterface.call(callStr);
    },

    /**
     *
     * @param hotspot
     * @example hotspot = {
     *      name: '',
     *      type: 'image',
     *      url: '',
     *      keep: false,
     *      visible: true,
     *      enabled: true,
     *      ...
     *
     * }
     */
    addImageHotspot: function (name, options) {
        var hotspotVarName = 'hotspot[' + name + ']';
        var that = this;

        that.krCall('addhotspot', name);

        for (var attr in options) {
            that.krCall('set', hotspotVarName + '.' + attr, options[attr]);
        }
    },

    /**
     *
     * @param hotspot
     * @example hotspot = {
     *      name: '',
     *      keep: false,
     *      visible: true,
     *      enabled: true,,
     *      ...
     *      points: [{ath: 0, atv: 0}]
     *
     * }
     */
    addPolygonHotspot: function (name, options) {
        var hotspotVarName = 'hotspot[' + name + ']';
        var that = this;

        that.krCall('addhotspot', name);

        for (var attr in options) {
            if (attr === 'points') {
                options[attr].forEach(function (point, index) {
                    that.krCall('set', hotspotVarName + '.point[' + index + '].ath', point.ath);
                    that.krCall('set', hotspotVarName + '.point[' + index + '].atv', point.atv);
                });
            } else {
                that.krCall('set', hotspotVarName + '.' + attr, options[attr]);
            }
        }
    }
};

module.exports = KrpanoShell;