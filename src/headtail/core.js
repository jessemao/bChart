var _selectorToChartObject = {};
var _options = {};
var _defaultTimeFormat = d3.time.format.multi([
	[".%L", function (d) {
		return d.getMilliseconds();
	}],
	[":%S", function (d) {
		return d.getSeconds();
	}],
	["%I:%M", function (d) {
		return d.getMinutes();
	}],
	["%I %p", function (d) {
		return d.getHours();
	}],
	["%a %d", function (d) {
		return d.getDay() && d.getDate() != 1;
	}],
	["%b %d", function (d) {
		return d.getUTCDate() != 1;
	}],
	["%B", function (d) {
		return d.getUTCMonth();
	}],
	["%Y", function () {
		return true;
	}]
]);

var _defaultOptions = {
	selector: "",
	colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"],
	colorOpacity: 1,
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
	isStack: false,
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
		"offsetAdjust": 0
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
		"offsetAdjust": 0
	},
	xAxis: {
		"display": true,
		"isTimeSeries": false,
		"timeTick": "",
		"timeFormat": "",
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
		"offsetAdjust": 0
	},

	tooltip: {
		"type": 1,
		'background': 'rgba(255,255,255, 0.6)',
		"xLine": {
			"stroke": "#666",
			"strokeWidth": 2
		},
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

var bChart = function (options) {
	if (bChart.existy(options) && bChart.typeString(options)) {
		if (arguments.length >= 2) {
			var chartType = "";
			switch (arguments[1].toLowerCase()) {
				case 'bar':
					chartType = "BarChart";
			    	break;
				case 'scatter':
					chartType = "ScatterChart";
					break;
				case 'bubble':
					chartType = "BubbleChart";
					break;
				case 'line':
					chartType = "LineChart";
					break;
				case 'area':
					chartType = 'AreaChart';
					break;
				case 'pie':
					chartType = 'PieChart';
					break;
			}
			if (arguments.length === 3) {
				return new bChart[chartType](arguments[0], arguments[2]);
			} else {
				return new bChart[chartType](arguments[0]);
			}
		} else if (arguments.length === 1) {
			if (bChart.isSelector(options)) {
				return _selectorToChartObject[options];
			}
		}
	}
};

bChart._init = function (options, chartType) {
	var defaultType = {};
	switch (chartType) {
		case 'bar':
			defaultType = _defaultsBar;
			break;
		case 'scatter':
			defaultType = _defaultsScatter;
			break;
		case 'bubble':
			defaultType = _defaultsBubble;
			break;
		case 'line':
			defaultType = _defaultsLine;
			break;
		case 'area':
			defaultType = _defaultsArea;
			break;
		case 'pie':
			defaultType = _defaultsPie;
			break;
	}

	var initOptions = bChart.concatObject(_defaultOptions, defaultType);
	_options = bChart.clone(initOptions);
	if (bChart.typeString(options) && bChart.isSelector(options)) {
		_options.selector = options;
	} else if (bChart.typeObject(options)) {
		_options = bChart.concatObject(_options, options);
	}



	switch (chartType) {
		case 'bar':
			return new BarChart(_options.selector, _options);
		case 'scatter':
			return new ScatterChart(_options.selector, _options);
		case 'bubble':
			return new BubbleChart(_options.selector, _options);
		case 'line':
			return new LineChart(_options.selector, _options);
		case 'area':
			return new AreaChart(_options.selector, _options);
		case 'pie':
			return new PieChart(_options.selector, _options);
	}
};


bChart._customConstructor = function (self, options, args, chartType) {
	var newOptions = {};
	if (bChart.existy(options)) { // check if options exists first.
		if (args.length === 1) { // selector.
			if (bChart.existy(bChart.getObjectBySelector(options)) && bChart.isSelector(options)) {
				return bChart.getObjectBySelector(options);
			} else {
				if (_options.selector !== options ||!bChart.truthy(_options.selector)) {
					self = bChart._init(options, chartType);
				}

			}
		} else {
			if (args[0] !== _options.selector ||!bChart.truthy(_options.selector)) {
				newOptions = args[1];
				newOptions.selector = options;
				self = bChart._init(newOptions, chartType);
			} else {
				self._options = bChart.clone(args[1]);
				bChart.setObjectOfSelector(options, self);
				self.setOptions(bChart.clone(args[1]));

				self.draw();
			}

		}
	}



	return self;
};

bChart.getObjectBySelector = function (options) {
	return _selectorToChartObject[options];
};

bChart.setObjectOfSelector = function (selector, chart) {
	_selectorToChartObject[selector] = chart;
};

bChart.isSelector = function (options) {
	return options.indexOf('#')>=0||options.indexOf('.')>=0;
};

bChart.clone = function (obj) {
	if (bChart.typeObject(obj)) {
		return JSON.parse(JSON.stringify(obj));
	}
};


bChart.generateArray = function(length) {
	var array = [];
	for (var i = 0; i < length; i += 1) {
		array.push(i);
	}
	return array;
};

bChart.setChart = function (obj, type) {
	var self = this;
	self[type] = obj;
	return self;
};

bChart.existy = function (obj) {
	return obj != null;
};

bChart.getUniqueValueArray = function (key) {

	return function(collection) {
		if (bChart.existy(collection)) {
			var uniqueArray = [];
			bChart.each(collection, function (value, iter) {
				if (uniqueArray.indexOf(value[key]) < 0) {
					uniqueArray.push(value[key]);
				}
			});
			return uniqueArray;
		}
	};
};

bChart.sorted = function (sortFunc) {
	return function (collection) {
		return 	collection.sort(sortFunc);
	};
};

bChart.sortedByArray = function (collection, array) {
	var newCollection = [];
	for (var i = 0; i < array.length; i++) {
		var collectionTmp = collection.filter(function (el) {
			return el.x === array[i];
		});
		newCollection.push(collectionTmp);
	}
	return d3.merge(newCollection);
};

bChart.sortByDate = bChart.sorted(function (a, b) {
	if (bChart.existy(a.getTime)) {
		return a.getTime() - b.getTime();

	} else {
		a = new Date(a);
		b = new Date(b);
		return a.getTime() - b.getTime();
	}
});

bChart.typeDate = function(obj) {
	return isNaN(new Date(obj).getTime());
};

bChart.each = function (obj, iteratee) {
	if (bChart.isArrayLike(obj)) {
		var length = bChart.getLength(obj);
		for (var i = 0; i < length; i++) {
			iteratee(obj[i], i, obj);
		}
	} else {
		for (var key in obj) {
			iteratee(obj[key], key, obj);
		}
	}
};

bChart.property = function (key) {
	return function (obj) {
		return bChart.existy(obj) ? obj[key]: void 0;
	};
};

bChart.hasProperty = function (obj, key) {
	if (bChart.typeString(key)) {
		if (key.indexOf('.') >= 0) {
			var keys = key.split('.');
			return bChart.existy(obj[keys[0]][keys[1]]);
		} else {
			return bChart.existy(obj[key]);
		}
	}

};

bChart.setProperty = function (obj, key, value) {

	if (bChart.typeString(key)) {
		if (key.indexOf('.') >= 0) {
			var keys = key.split('.');
			if (!bChart.hasProperty(obj, keys[0])) {
			    obj[keys[0]] = {};
			}
			if (bChart.isArrayLike(obj[keys[0]]) && keys[1] === 'all') {
				for (var i = 0; i < obj[keys[0]].length; i++) {
					obj[keys[0]][i] = value;
				}
			} else {
				obj[keys[0]][keys[1]] = value;
			}
		} else {
			if (!bChart.hasProperty(obj, key)) {
				obj[key] = {};
			}
			obj[key] = value;
		}
	}
};

bChart.getLength = bChart.property('length');

bChart.isArrayLike = function (collection) {
	if (bChart.typeString(collection)) {
		return false;
	} else {
		var length = bChart.getLength(collection);
		return bChart.typeNumber(length) && length >= 0;
	}

};

bChart.typeofObject = function (func) {
	return function (obj) {
		return func(obj);
	};
};

bChart.typeNumber = bChart.typeofObject(function (obj) {
	return !isNaN(obj);
});

bChart.typeString = bChart.typeofObject(function (obj) {
	return typeof obj === "string";
});

bChart.typeObject = bChart.typeofObject(function (obj) {
	return typeof obj === "object";
});

bChart.existy = function (obj) {
	return obj != null;
};

bChart.truthy = function (obj) {
	return obj !== false && bChart.existy(obj);
};

bChart.hexToRGBA = function (hexString, opacity) {
	var hex = hexString.replace('#', '');
	var r = parseInt(hex.substring(0,2), 16);
	var g = parseInt(hex.substring(2,4), 16);
	var b = parseInt(hex.substring(4,6), 16);

	return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
};

bChart.getIndexOfElement = function (elem, array) {

	return bChart.existy(array) ? array.indexOf(elem) : -1;

};

bChart.isElementInArray = function (elem, array) {
	return bChart.getIndexOfElement(elem, array) >= 0;
};

bChart.concatNoDuplicate = function (array1, array2) {
	var duplicateArray = array1.concat(array2);

	return duplicateArray.filter(function (elem, idx) {
		return bChart.getIndexOfElement(elem, duplicateArray) === idx;
	});
};

bChart.removeDuplicateFromArray = function (array) {
	return array.filter(function (elem, idx) {
		return bChart.getIndexOfElement(elem, array) === idx;
	});
};

bChart.removeElementFromArray = function (elem, array) {
	if (bChart.isElementInArray(elem, array)) {
		array.splice(bChart.getIndexOfElement(elem, array), 1);
		return array;
	}
};

bChart.removeArrayFromArray = function (array1, array2) {
	return array1.filter(function (elem, idx) {
		return !bChart.isElementInArray(elem, array2);
	});
};

bChart.isOverlapArray = function (array1, array2) {
	var duplicateArray = array1.concat(array2);
	var noDuplicateArray = duplicateArray.filter(function (elem, idx) {
		return bChart.getIndexOfElement(elem, duplicateArray) === idx;
	});
	return duplicateArray.length !== noDuplicateArray.length;
};

bChart.isSubArray = function (parentArray, childArray) {
	var newArray = childArray.filter(function (elem, idx) {
		return !bChart.isElementInArray(elem, parentArray);
	});

	return newArray.length > 0 ? false: true;
};

bChart.getSubArray = function (parentArray, childArray) {
	if (bChart.isSubArray(parentArray, childArray)) {
		return childArray;
	} else {
		return childArray.filter(function (elem, idx) {
			return bChart.isElementInArray(elem, parentArray);
		});
	}
};


bChart.generateDateFormatter = function (dateString) {
	if (!bChart.existy(dateString)) {
		console.log('Please input a date format string');
		return _defaultTimeFormat;
	}


	var formatMonth = function (mmString) {
		switch(mmString) {
			case 'MM':
				return '%m';
			case 'mm':
				return '%B';
			case 'Mm':
				return '%b';
			default:
				return '';
		}
	};

	var formatDay = function (dayString) {
		switch(dayString){
			case 'DD':
				return '%d';
			case 'dd':
				return '%e';
			default:
				return '';
		}
	};

	var formatYear = function (yearString) {
		switch (yearString) {
			case 'YYYY':
			case 'yyyy':
				return '%Y';
			case 'YY':
			case 'yy':
				return '%y';
			default:
				return '';
		}
	};

	var parseDateString = function (type) {
		return function (obj) {
			var splits = obj.split(type);
			var stringFormat = "";
			bChart.each(splits, function (item) {
				stringFormat += formatDay(item) + formatMonth(item) + formatYear(item);
				stringFormat += type;
			});
			stringFormat = stringFormat.slice(0, -1);
			return d3.time.format(stringFormat);
		};
	};

	var parseSlashFormat = parseDateString('/');

	var parseDashFormat = parseDateString('-');

	var parseCommaFormat = parseDateString(',');

	if (dateString.indexOf('/')>=0) {
		return parseSlashFormat(dateString);
	} else if (dateString.indexOf('-')>=0) {
		return parseDashFormat(dateString);
	} else if (dateString.indexOf(',')>=0) {
		return parseCommaFormat(dateString);
	} else {
		console.log('Please input a date format string');
		return _defaultTimeFormat;
	}

};

bChart.computeTimeTick = function (timeRange) {
	if (timeRange > 3.15569e10) {
	    return d3.time.years;
	} else if (timeRange > 2.62974e9){
		return d3.time.months;
	} else if (timeRange > 604800000) {
		return d3.time.weeks;
	} else if (timeRange > 86400000) {
		return d3.time.days;
	} else {
		return d3.time.hours;
	}
};

bChart.concatObject = function (obj1, obj2) {
	bChart.each(obj2, function (value, key) {
		if (typeof value === 'object') {
			for (var valueKey in value) {
				if (!bChart.hasProperty(obj1, key)) {
				    obj1[key] = {};
				}
				obj1[key][valueKey] = value[valueKey];
			}
		} else {
			obj1[key] = value;

		}
	});
	return obj1;
};

bChart.initStyleProperty = function (property, type) {
	return function (groupIndex, value) {
		var self = this;
		self._options[type][property][groupIndex] = bChart.existy(self._options[type][property][groupIndex])?self._options[type][property][groupIndex]: value;
	};
};

bChart.removeStyleProperty = function (property, type) {
	return function (groupIndex) {
		var self = this;
		if (bChart.existy(self._options[type][property][groupIndex])) {
			delete self._options[type][property][groupIndex];
		}
	};
};

