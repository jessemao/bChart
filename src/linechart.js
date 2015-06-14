/**
 * Created by CaptainMao on 5/22/15.
 */
var _defaultsLine = {
    title: {
        "text": "Line Chart",

    },
    node: {
        display: [],
        type: [],
        size: [],
        fillOpacity: [],
        solidCircle: [],
        strokeWidth: []
    },
    line: {
        type: [],
        strokeWidth: [],
        strokeOpacity: []
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
    self._drawLineSVG(xyOptions)._drawNodeSVG(xyOptions);
    return self;
};