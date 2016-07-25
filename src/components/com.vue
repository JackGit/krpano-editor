<style>
    .plugin {
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.2);
        color: white;
    }
</style>

<template>
    <div class="plugin">
        <button v-touch:tap="handleAddHotspot">add hotspot</button>
    </div>
</template>

<script>
    // require('../assets/css/plugin.css');
    var Vue = require('vue');

    function addHotspot (hotspot) {
        var hotspotVarName = 'hotspot[' + hotspot.name + ']';

        Vue.krCall('addhotspot', hotspot.name);
        Vue.krCall('set', hotspotVarName + '.fillalpha', 0.25);
        Vue.krCall('set', hotspotVarName + '.borderalpha', 0.50);
        Vue.krCall('set', hotspotVarName + '.point[0].ath', -10);
        Vue.krCall('set', hotspotVarName + '.point[0].atv', -10);
        Vue.krCall('set', hotspotVarName + '.point[1].ath', 0);
        Vue.krCall('set', hotspotVarName + '.point[1].atv', 5);
        Vue.krCall('set', hotspotVarName + '.point[2].ath', 10);
        Vue.krCall('set', hotspotVarName + '.point[2].atv', 10);
    }

    module.exports = {

        ready: function () {
            console.log(this.$krInterface, this.$krPlugin);
        },

        methods: {
            handleAddHotspot: function (e) {
                alert('click');
                addHotspot('hs1');

            }
        }
    };
</script>