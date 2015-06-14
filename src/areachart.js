/**
 * Created by CaptainMao on 5/22/15.
 */
var _defaultsArea = {
    title: {
        "text": "Area Chart",
    },
    area: {
        strokeWidth: [],
        strokeOpacity: [],
        fillOpacity: []
    }

};

var AreaChart = function (options) {
    return bChart._customConstructor(this, options, arguments, 'area');
};

bChart.AreaChart = AreaChart;

AreaChart.prototype = Object.create(bChart.prototype);
AreaChart.prototype.constructor = AreaChart;

AreaChart.prototype._drawAreaChart = function () {
    var self = this;
    var xyOptions = self._initXYAxis();
    self._drawAreaSVG(xyOptions);
    return self;

};