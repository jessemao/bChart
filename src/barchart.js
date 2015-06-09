var _defaultsBar = {
	selector: "",
	colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"],
	colorOpacity: 1,
	barDistance: 2,
	duration: 400,
	padding: {
		"top": 80,
		"right": 90,
		"bottom": 50,
		"left": 60
	},
	data: {
		"dataValue": [],
		"groups": [],
		"groups2": [],
		"x": []
	},
	_colorMap: {},
	_datasetTmp: [],
	_uniqueGroupTmp: [],
	_uniqueXArray: [],
	_uniqueGroupArrayAll: [],
	_uniqueGroupArray2: [],
	_dataset: [

	],
	minDefault: -1,
	maxDefault: -1,
	minDefault2: -1,
	maxDefault2: -1,
	width: 800,
	height: 350,
	background: {
		"imageURL": "",
		"color": "#ffffff",
		"displayImage": false,
		"opacity": 1
	},
	// border: {
	// 	"opacity": 1,
	// 	"color": {
	// 		"top": "#666",
	// 		"bottom": "#666",
	// 		"left": "#666",
	// 		"right": "#666"
	// 	},
	// 	"width": {
	// 		"top": 1,
	// 		"bottom": 1,
	// 		"left": 1,
	// 		"right": 1
	// 	},
	// 	"style": {
	// 		"top": "solid",
	// 		"bottom": "solid",
	// 		"left": "solid",
	// 		"right": "solid"
	// 	},
	// 	"radius": {
	// 		"topleft": 8,
	// 		"topright": 8,
	// 		"bottomleft": 8,
	// 		"bottomright": 8
	// 	},
	// 	"boxShadow": {
	// 		"display": false,
	// 		"vShadow": 0,
	// 		"hShadow": 0,
	// 		"blur": 0,
	// 		"spread": 0,
	// 		"color": "#000"
	// 	}
	// },
	_secondAxis: false,
	isStack: false,
	legend: {
		"position": "topright",
		"offsetText": 5,
		"offsetSymbol": 15,
		"symbolSize": 10,
		"multipleLine": false,
		"textFirst": true,
		"display": true,
		"fontType": "helvetica",
		"fontSize": 12,
		"fontBold": false,
		"fontItalic": false,
		"fontUnderline": false,
		"fontColor": "#000000",
		"offsetAdjust": {
			"horizontal": 0,
			"vertical": 0
		}
	},

	title: {
		"display": true,
		"text": "Bar Chart",
		"fontType": "helvetica",
		"fontSize": 18,
		"fontBold": false,
		"fontItalic": false,
		"fontUnderline": false,
		"fontColor": "#000000",
		"offsetAdjust": {
			"horizontal": 0,
			"vertical": 0
		}
	},
	xLabel: {
		"display": true,
		"text": "x label",
		"rotation": 0,
		"fontType": "helvetica",
		"fontSize": 14,
		"fontBold": false,
		"fontItalic": false,
		"fontUnderline": false,
		"fontColor": "#000000",
		"offsetAdjust": {
			"horizontal": 0,
			"vertical": 0
		}
	},

	yLabel: {
		"display": true,
		"text": "y label",
		"rotation": -90,
		"fontType": "helvetica",
		"fontSize": 14,
		"fontBold": false,
		"fontItalic": false,
		"fontUnderline": false,
		"fontColor": "#000000",
		"offsetAdjust": {
			"horizontal": 0,
			"vertical": 0
		}
	},
	yLabel2: {
		"display": true,
		"text": "y label second",
		"rotation": -90,
		"fontType": "helvetica",
		"fontSize": 14,
		"fontBold": false,
		"fontItalic": false,
		"fontUnderline": false,
		"fontColor": "#000000",
		"offsetAdjust": {
			"horizontal": 0,
			"vertical": 0
		}
	},
	yAxis: {
		"display": true,
		"displayTicksLine": true,
		"tickNumber": 8,
		"tickFormat": d3.format(",.0f"),
		"tickPadding": 3,
		"tickSize": 10,
		"orientation": "left",
		"tickValue": [],
		"fontColor": "#000",
		"fontType": "helvetica",
		"fontSize": 12,
		"fontBold": false,
		"fontItalic": false,
		"fontUnderline": false,
		"tickLineColor": "#ccc",
		"tickLineWidth": 0.2,
		"axisColor": '#000',
		"axisWidth": 1,
		"rotation": 0,
		"offsetAdjust": {
			"horizontal": 0,
			"vertical": 0
		}
	},
	yAxis2: {
		"display": true,
		"displayTicksLine": false,
		"tickNumber": 8,
		"tickFormat": d3.format(",.0f"),
		"tickPadding": 3,
		"tickSize": 10,
		"orientation": "right",
		"tickValue": [],
		"fontColor": "#000",
		"fontType": "helvetica",
		"fontSize": 12,
		"fontBold": false,
		"fontItalic": false,
		"fontUnderline": false,
		"tickLineColor": "#ccc",
		"tickLineWidth": 0.2,
		"axisColor": '#000',
		"axisWidth": 1,
		"rotation": 0,
		"offsetAdjust": {
			"horizontal": 0,
			"vertical": 0
		}
	},
	xAxis: {
		"display": true,
		"displayTicksLine": true,
		"tickNumber": 5,
		"tickFormat": "",
		"tickPadding": 3,
		"tickSize": 10,
		"orientation": "bottom",
		"tickValue": [],
		"fontColor": "#000",
		"fontType": "helvetica",
		"fontSize": 12,
		"fontBold": false,
		"fontItalic": false,
		"fontUnderline": false,
		"tickLineColor": "#ccc",
		"tickLineWidth": 0.2,
		"axisColor": '#000',
		"axisWidth": 1,
		"rotation": 0,
		"offsetAdjust": {
			"horizontal": 0,
			"vertical": 0
		}
	},

	tooltip: {
		"display": true,
		"text": "tooltip",
		"fontType": "helvetica",
		"fontSize": 12,
		"fontBold": false,
		"fontItalic": false,
		"fontUnderline": false,
		"fontColor": "#fff",
		"width": "auto",
		"height": "auto"
	}
};

var BarChart = function (options) {
	return bChart._customConstructor(this, options, arguments, 'bar');

};

bChart.BarChart = BarChart;

BarChart.prototype = Object.create(bChart.prototype);
BarChart.prototype.constructor = BarChart;

BarChart.prototype.draw = function () {
	var self = this;
	if (!bChart.getLength(d3.select(self._options.selector))) {
		console.log("Please make sure the element exists in your template.");
		return void 0;
	}

	self.min('refresh').max('refresh').updateMin();
	if (self._options._secondAxis) {
		self.min2('refresh').max2('refresh').updateMin2();
	}

	self.colors('refresh')._drawChartSVG();

	self.background('refresh').title('refresh').legend('refresh').tooltip('refresh').xLabel('refresh').yLabel('refresh').xAxis('refresh').yAxis('refresh');
	if (self._options._secondAxis) {
		self.yLabel2('refresh').yAxis2('refresh');
	}

};
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


