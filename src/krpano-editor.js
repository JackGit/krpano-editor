function krpanoplugin () {
    "use strict";
    var local = this;
    var krpano = null;
    var plugin = null;

    local.registerplugin = function (krpanoInterface, pluginPath, pluginObject) {
        console.log('register plugin');

        krpano = krpanoInterface;
        plugin = pluginObject;

        plugin.registercontentsize(krpano.get('stagewidth'), krpano.get('stageheight'));

        var text = document.createElement("div");
        text.style.cssText = "width:100%;height:10%;"+
            "display:flex;color:white;background:rgba(10,50,100,0.5);"+
            "align-items:center;justify-content:center;text-align:center;";
        text.innerHTML = "HTML5<br>TEST PLUGIN<br>click me";

        // the plugin 'sprite' variable is the internal html element of the plugin
        plugin.sprite.appendChild(text);

        plugin.onclick = 'js(alert(123))'
        text.addEventListener('click', function () {
            alert('click text, not just plugin')
        })

    };

    local.unloadplugin = function () {
        krpano = null;
        plugin = null;
    };

    local.onresize = function (width, height) {
        console.log('resizing', width, height);
    };

}

// module.exports = krpanoplugin;