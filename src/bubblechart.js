/**
 * Created by CaptainMao on 5/23/15.
 */
var _defaultsBubble = {
    bubble: {

    },
    title: {
        "text": "Bubble Chart"

    },
    node: {
        display: [],
        type: [],
        size: [],
        fillOpacity: [],
        solidCircle: [],
        strokeWidth: []
    }

};

var BubbleChart = function (options) {
    return bChart._customConstructor(this, options, arguments, 'bubble');
};

bChart.BubbleChart = BubbleChart;

BubbleChart.prototype = Object.create(bChart.prototype);
BubbleChart.prototype.constructor = BubbleChart;

BubbleChart.prototype._drawBubbleChart = function () {
    var self = this;

    var xyOption = self._initXYAxis();
    self._drawNodeSVG(xyOption).node('refresh');

    return self;

};