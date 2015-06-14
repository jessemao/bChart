var _defaultsBar = {
	barDistance: 2,
	title: {
		"text": "Bar Chart",
	}
};

var BarChart = function (options) {
	return bChart._customConstructor(this, options, arguments, 'bar');

};

bChart.BarChart = BarChart;

BarChart.prototype = Object.create(bChart.prototype);
BarChart.prototype.constructor = BarChart;

BarChart.prototype._drawBarChart = function () {
	var self = this;
	var xyOptions = self._initXYAxis();

	if (self._options.isStack) {
		self._drawStackBarSVG(xyOptions);
	} else {
		self._drawGroupBarSVG(xyOptions);
	}
	return self;
};


