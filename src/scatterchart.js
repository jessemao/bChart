/**
 * Created by CaptainMao on 5/22/15.
 */
var _defaultsScatter = {

    title: {
        "text": "Scatter Chart"
    },

    tooltip: {
        "type": 0
    },
    node: {
        display: [],
        solidCircle: [],
        type: [],
        size: [],
        fillOpacity: [],
        strokeWidth: []
    }

};

var ScatterChart = function (options) {
    return bChart._customConstructor(this, options, arguments, 'scatter');
};

bChart.ScatterChart = ScatterChart;

ScatterChart.prototype = Object.create(bChart.prototype);
ScatterChart.prototype.constructor = ScatterChart;

ScatterChart.prototype._drawScatterChart = function () {
    var self = this;
    var xyOptions = self._initXYAxis();
    self._drawNodeSVG(xyOptions);

    return self;


};