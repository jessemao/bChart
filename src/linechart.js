/**
 * Created by CaptainMao on 5/22/15.
 */
var _defaultsLine = {
    title: {
        "text": "Line Chart",

    },
    node: {
        display: true,
        type: {},
        size: {},
        fillOpacity: {},
        strokeWidth: {}
    },
    line: {
        type: {},
        width: {},
        opacity: {}
    }

};

var LineChart = function (options) {
    return bChart._customConstructor(this, options, arguments, 'line');
};

bChart.LineChart = LineChart;

LineChart.prototype = Object.create(bChart.prototype);
LineChart.prototype.constructor = LineChart;

LineChart.prototype._drawLineChart = function () {
    var self = this;
    var xyOptions = self._initXYAxis();
    self._drawLineSVG(xyOptions)._drawNodeSVG(xyOptions).node('refresh');
    return self;




};