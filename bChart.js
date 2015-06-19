/*! bChart - v0.1.0 - 2015-06-18
* Copyright (c) 2015 Jingxian Mao; Licensed MIT */

    (function (factory) {
        "use strict";
        if (typeof define === 'function' && define.amd) {
            define([], factory);
        } else {
            window.bChart = factory();
        }
    })(function () {
        "use strict";

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
    		"bottom": 60,
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
    			"between": 15,
    			"horizontal": 0,
    			"vertical": 0,
    			"textToSymbol": 5
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
    		"innerTickSize": 0,
    		"outerTickSize": 0,
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
    		"innerTickSize": 0,
    		"outerTickSize": 0,
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
    		"innerTickSize": 'auto',
    		"outerTickSize": 0,
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
    		"height": "auto",
    		"xHTML": "",
    		"groupHTML": "",
    		"_xHTML": "",
    		"_groupHTML": ""

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

    bChart.copyPropertyOfObject = function (fromObj, toObj) {
    	if (bChart.typeObject(fromObj)) {
    	    bChart.each(fromObj, function (value, key) {
    			toObj[key] = value;
    		});
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

    			if (bChart.typeObject(value)) {
    				bChart.copyPropertyOfObject(value, obj[key]);
    			} else {
    				obj[key] = value;

    			}
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


    /**
     * Created by CaptainMao on 5/23/15.
     */
    bChart.prototype.area = function (options) {
        var self = this;

        if (!bChart.existy(options)) {
            return self._options.area;
        }

        self._setSpecificPropertiesByChart(options, 'area');
        return self;

    };

    bChart.prototype._drawAreaSVG = function (options) {
        var self = this;
        var	_datasetTmp = self._options._dataset;
        var	groupConcat = self._options._uniqueGroupTmp.length ? self._options._uniqueGroupTmp : self._options._uniqueGroupArrayAll;
        var _parentSVG;
        if (d3.select(self._options.selector).select('.bChart_wrapper').empty()) {
            _parentSVG = d3.select(self._options.selector).append('div')
                .attr('class', 'bChart_wrapper');
        } else {
            _parentSVG = d3.select(self._options.selector).select('.bChart_wrapper');
        }
        var chartSVG = _parentSVG.select('g.bChart');
        var areaSVG, areaPathSVG;
        var dataArea = [];

        if (chartSVG.select('.bChart_areas').empty()) {
            areaSVG = chartSVG.append('g')
                .attr('class', 'bChart_areas');
        } else {
            areaSVG = chartSVG.select('.bChart_areas');
        }

        if (bChart.existy(options)) {
            if (self._options.isStack) {
                _datasetTmp = self.stackDataset(_datasetTmp, self._options._uniqueGroupArrayAll, self._options._uniqueXArray);

            }
            var drawLineCallBack = function (elem) {
                var singleAreaArray = _datasetTmp.filter(function (el) {
                    return self._options.isStack ? el[0].group === elem : el.group === elem;
                });
                if (self._options.isStack) {
                    dataArea.push(singleAreaArray[0]);
                } else {
                    dataArea.push(singleAreaArray);
                }
            };
            bChart.each(self._options._uniqueGroupArrayAll, drawLineCallBack);

            areaPathSVG = areaSVG.selectAll('.bChart_groups')
                .data(dataArea);

            areaPathSVG.enter().append('path');

            areaPathSVG.exit().remove();

            var area = d3.svg.area()
                .x(function (d) {

                    return self._options.xAxis.isTimeSeries ? options.x0(new Date(d.x)): options.x0(d.x);
                })
                .y0(function (d) {
                    if (self._options.isStack) {
                        return d.y0 < self._options.minDefault ? options.y(self._options.minDefault) : options.y(d.y0);
                    } else {
                        return self._options._chartSVGHeight;
                    }
                })
                .y1(function (d) {
                    if (self._options.isStack) {
                        return options.y(parseFloat(d.y0) + parseFloat(d.y));
                    } else {
                        return d._secondAxis? options.y2(d.value) : options.y(d.value);

                    }
                });
            areaPathSVG.attr('d', area);
        } else {
            areaPathSVG = areaSVG.selectAll('.bChart_groups');
        }

        if (!areaPathSVG.empty()) {
            areaPathSVG.attr('class', function (d, i) {
                    var groupIndex = groupConcat.indexOf(d[i].group);
                    return 'bChart_groups bChart_groups_' + groupIndex;
                })
                .attr('fill', function (d, i) {
                    return self._options._colorMap[d[i].group];
                })
                .attr('fill-opacity', function (d,i) {
                    var groupIndex = groupConcat.indexOf(d[i].group);

                    return self._options.area.fillOpacity[groupIndex];
                })
                .attr('stroke', function (d, i) {
                    return self._options._colorMap[d[i].group];
                })
                .attr('stroke-width', function (d, i) {
                    var groupIndex = groupConcat.indexOf(d[i].group);

                    return self._options.area.strokeWidth[groupIndex];
                })
                .attr('stroke-opacity', function (d, i) {
                    var groupIndex = groupConcat.indexOf(d[i].group);

                    return self._options.area.strokeOpacity[groupIndex];
                })
                .style('opacity', 0.1)
                .transition()
                .duration(self._options.duration)
                .style('opacity', 1);
        }


        return self;

    };

    bChart.initAreaType = bChart.initStyleProperty('type', 'area');
    bChart.initAreaFillOpacity = bChart.initStyleProperty('fillOpacity', 'area');
    bChart.initAreaStrokeWidth = bChart.initStyleProperty('strokeWidth', 'area');
    bChart.initAreaStrokeOpacity = bChart.initStyleProperty('strokeOpacity', 'area');

    bChart.removeAreaType = bChart.removeStyleProperty('type', 'area');
    bChart.removeAreaStrokeWidth = bChart.removeStyleProperty('strokeWidth', 'area');
    bChart.removeAreaStrokeOpacity = bChart.removeStyleProperty('strokeOpacity', 'area');
    bChart.removeAreaFillOpacity = bChart.removeStyleProperty('fillOpacity', 'area');
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
    /**
     * Created by CaptainMao on 5/22/15.
     */
    bChart.prototype.background = function (options) {
        var self = this;
        if (!bChart.existy(options)) {
            return self._options.background;
        } else {
            if (bChart.typeString(options) && options === 'refresh') {
                drawBackground();
            } else {
                self.setOptions(arguments, 'background');
                drawBackground();
            }
            return self;
        }
        function drawBackground () {
            var backgroundDIV;
            var _parentSVG;
            if (d3.select(self._options.selector).select('.bChart_wrapper').empty()) {
                _parentSVG = d3.select(self._options.selector).append('div')
                    .attr('class', 'bChart_wrapper');
            } else {
                _parentSVG = d3.select(self._options.selector).select('.bChart_wrapper');
            }
            if (_parentSVG.select('.bChart_background').empty()) {
                backgroundDIV = _parentSVG.append('div')
                    .attr('class', 'bChart_background');
            } else {
                backgroundDIV = _parentSVG.select('.bChart_background');
            }
            backgroundDIV
                .style('width', self._options.width + 'px')
                .style('height', self._options.height + 'px');

            if (self._options.background.displayImage) {
                if (bChart.existy(self._options.background.imageURL)) {
                    backgroundDIV.style('background-image', 'url(' + self._options.background.imageURL + ')')
                        .style('opacity', self._options.background.opacity);

                } else {
                    self._options.background.displayImage = false;
                }
            } else {
                backgroundDIV.style('background-image', 'none')
                    .style('background-color', self._options.background.color)
                    .style('opacity', self._options.background.opacity);
            }
        }
    };
    /**
     * Created by CaptainMao on 5/31/15.
     */
    bChart.prototype._drawStackBarSVG = function (options) {
        var self = this;
        var	_datasetTmp = self._options._dataset;
        var	groupTmp = self._options._uniqueGroupTmp.length ? self._options._uniqueGroupTmp : self._options._uniqueGroupArrayAll;
        var _parentSVG;
        if (d3.select(self._options.selector).select('.bChart_wrapper').empty()) {
            _parentSVG = d3.select(self._options.selector).append('div')
                .attr('class', 'bChart_wrapper');
        } else {
            _parentSVG = d3.select(self._options.selector).select('.bChart_wrapper');
        }
        var chartSVG = _parentSVG.select('g.bChart');

        var barParentSVG;
        if (chartSVG.select('.bChart_bar_parent').empty()) {
            barParentSVG = chartSVG.append('g')
                .attr('class', 'bChart_bar_parent');
        } else {
            barParentSVG = chartSVG.select('.bChart_bar_parent');
        }

        var stackBarArray = self.stackDataset(_datasetTmp, self._options._uniqueGroupArrayAll, self._options._uniqueXArray);
        var stackBarSVG = barParentSVG.selectAll('.bChart_Bars')
            .data(stackBarArray);

        stackBarSVG.enter().append('g')
            .attr('class', function (d,i) {
                return 'bChart_Bars';
            });
        stackBarSVG.exit().remove();

        var barRects = stackBarSVG.selectAll('rect')
            .data(function (d) {
                return d;
            });

        barRects.enter().append('rect')
            .attr('class', function (d) {
                return 'bChart_groups bChart_groups_' + groupTmp.indexOf(d.group);
            });

        barRects
            .attr('class', function (d) {
                return 'bChart_groups bChart_groups_' + groupTmp.indexOf(d.group);
            })
            .attr('width', options.x0.rangeBand() - self._options.barDistance)
            .attr('x', function (d) {
                if (!bChart.existy(this._current)) {
                    this._current = {};
                }
                this._current.x = bChart.existy(this._current.x)? this._current.x : options.x0(d.x) + self._options.barDistance/2;
                return this._current.x;
            })
            .attr('y', function (d) {
                return bChart.existy(this._current.y) ? this._current.y : self._options._chartSVGHeight;
            })
            .attr('height', function (d) {
                return bChart.existy(this._current.height) ? this._current.height : 0;
            })
            .style('fill', function (d) {
                return self._options._colorMap[d.group];
            })
            .style('stroke', function(d, i) {
                return self._options._colorMap[d.group];
            })
            .style('stroke-width', 0)
            .transition()
            .duration(self._options.duration)
            .attr('x', function (d) {
                this._current.x = options.x0(d.x) + self._options.barDistance/2;
                return this._current.x;
            })
            .attr('y', function (d) {
                this._current.y = options.y(d.y0 + d.y);
                return this._current.y;
            })
            .attr('height', function (d, i) {
                var heightTmp;
                if(d.group === self._options._uniqueGroupArrayAll[0]) {
                    heightTmp = self._options._chartSVGHeight - options.y(d.y + d.y0);
                } else {
                    heightTmp = options.y(d.y0) - options.y(d.y + d.y0);

                }
                this._current.height = heightTmp;
                return heightTmp;
            });

        barRects.exit().remove();



    };

    bChart.prototype._drawGroupBarSVG = function (options) {
        var self = this;
        var	_datasetTmp = self._options._dataset;
        var	groupConcat = self._options._uniqueGroupTmp.length ? self._options._uniqueGroupTmp : self._options._uniqueGroupArrayAll;
        var _parentSVG;
        if (d3.select(self._options.selector).select('.bChart_wrapper').empty()) {
            _parentSVG = d3.select(self._options.selector).append('div')
                .attr('class', 'bChart_wrapper');
        } else {
            _parentSVG = d3.select(self._options.selector).select('.bChart_wrapper');
        }
        var chartSVG = _parentSVG.select('g.bChart');

        var groupBarArray = [];
        bChart.each(self._options._uniqueXArray, function (value, key) {
            var groupBarValue = _datasetTmp.filter(function (el) {
                return el.x === value;
            });

            groupBarArray.push({x: value, data: groupBarValue});
        });

        var barParentSVG;
        if (chartSVG.select('.bChart_bar_parent').empty()) {
            barParentSVG = chartSVG.append('g')
                .attr('class', 'bChart_bar_parent');
        } else {
            barParentSVG = chartSVG.select('.bChart_bar_parent');
        }

        var groupBarSVG = barParentSVG.selectAll('.bChart_Bars')
            .data(groupBarArray);

        groupBarSVG.enter().append('g')
            .attr('class', function (d, i) {
                return 'bChart_Bars';
            });

        groupBarSVG.exit().remove();


        var barRects = groupBarSVG.selectAll('rect')
            .data(function (d) {
                return d.data;
            });

        barRects.exit().transition().attr('height', 0).remove();
        barRects.enter().append('rect')
            .attr('class', function (d) {
                return 'bChart_groups bChart_groups_' + groupConcat.indexOf(d.group);
            });

        barRects
            .attr('class', function (d) {
                return 'bChart_groups bChart_groups_' + groupConcat.indexOf(d.group);
            })
            .attr('width', options.x1.rangeBand() - self._options.barDistance)
            .attr('x', function (d, i) {
                if (!bChart.existy(this._current)) {
                    this._current = {};
                }
                this._current.group = bChart.existy(this._current.group)? this._current.group: d.group;
                this._current.value = bChart.existy(this._current.value)? this._current.value: d.value;
                this._current._secondAxis = bChart.existy(this._current._secondAxis) ? this._current._secondAxis : d._secondAxis;
                this._current.x = bChart.existy(this._current.x) ? this._current.x : options.x0(d.x) + options.x1(d.group) + self._options.barDistance/2;
                return this._current.x;
            })
            .attr('y', function () {
                return bChart.existy(this._current.y) ? this._current.y : self._options._chartSVGHeight;
            })
            .attr('height', function () {
                return bChart.existy(this._current.height) ? this._current.height : 0;
            })
            .style('fill', function (d, i) {
                return self._options._colorMap[this._current.group];
            })
            .style('stroke', function(d, i) {
                return self._options._colorMap[this._current.group];
            })
            .style('stroke-width', 0)
            .transition()
            .duration(self._options.duration)
            .attr('x', function (d) {
                this._current.x = options.x0(d.x) + options.x1(this._current.group) + self._options.barDistance/2;
                return this._current.x;
            })
            .attr('y', function (d) {
                this._current.y = this._current._secondAxis? options.y2(this._current.value) : options.y(this._current.value);
                return this._current.y;

            })
            .attr('height', function (d) {
                this._current.height = this._current._secondAxis? self._options._chartSVGHeight - options.y2(this._current.value) : self._options._chartSVGHeight - options.y(this._current.value);
                return this._current.height;
            });
    };
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



    /**
     * Created by CaptainMao on 5/22/15.
     */
    bChart.prototype.options = function (options) {
        var self = this;
        if (!bChart.existy(options)) {
            return self._options;
        }
        if (bChart.typeString(options) && arguments.length === 1) {
            return self._options[options];
        } else {
            self.setOptions(arguments).draw();
        }
        return self;
    };
    bChart.prototype.setOptions = function (options, type) {
        var self = this;
        var _setOption;
        var inputOption;
        var composePropertyObject = function (firstLevel) {
            return function (options) {
                if (bChart.existy(options)) {

                    var newOption = {};
                    if (bChart.typeString(options)) {
                        if (arguments.length == 1) {
                            newOption = {'selector': options};
                        }
                        else {
                            newOption[arguments[0]] = arguments[1];

                        }
                    } else {
                        newOption = options;
                    }
                    if (bChart.existy(firstLevel)) {
                        if (bChart.typeString(firstLevel) && (firstLevel === '_dataset') ) {

                            bChart.each(options, function (value, key, opt) {
                                if (!bChart.existy(opt[key].group)) {
                                    opt[key].group = "";
                                }

                            });
                            self._options[firstLevel] = options;
                        } else {
                            bChart.each(newOption, function (value, key) {
                                bChart.setProperty(self._options[firstLevel], key, value);
                            });
                        }


                    } else {
                        bChart.each(newOption, function (value, key) {
                            if (key === "data") {
                                setTimeout(function () {
                                    self.loadColumn(value);

                                }, 1);
                            } else {
                                if (key[0] !== '_') {
                                    bChart.setProperty(self._options, key, value);
                                }
                            }
                        });
                    }

                }
            };
        };

        if (bChart.existy(type)) {
            _setOption = composePropertyObject(type);
        } else {
            _setOption = composePropertyObject();
        }

        if (bChart.isArrayLike(options)) {
            if (options.length == 1) { // passing in _dataset and object.
                if (bChart.typeObject(options[0])) {
                    inputOption = options[0];
                    _setOption(inputOption);
                } else {
                    console.log("Can't update the property!");
                    return self;
                }
            } else {
                _setOption(options[0], options[1]);
            }
        } else {
            inputOption = options;
            _setOption(inputOption);

        }

        return self;
    };
    bChart.prototype.getOptions = function(key) {
        var self = this;
        if (bChart.existy(key)) {
            if (bChart.hasProperty(self._options, key)) {
                return self._options[key];
            } else {
                return void 0;
            }
        } else {
            return self.options;
        }
    };

    bChart.prototype.width = function (options) {
        var self = this;
        if (bChart.existy(options) && bChart.typeNumber(options)) {
            self._options.width = options;
            if (bChart.typeNumber(options)) {
                self._options.width = options;
                self._updateChartSize()._drawChartSVG().xLabel('refresh').legend('refresh').title('refresh');
            } else if (bChart.typeString(options) && options === 'refresh') {
                self._updateChartSize()._drawChartSVG().xLabel('refresh').legend('refresh').title('refresh');
            }
            return self;
        } else {
            return self._options.width;
        }
    };

    bChart.prototype.height = function (options) {
        var self = this;
        if (bChart.existy(options)) {
            if (bChart.typeNumber(options)) {
                self._options.height = options;
                self._updateChartSize()._drawChartSVG().yLabel('refresh').yLabel2('refresh').legend('refresh').title('refresh');
            } else if (bChart.typeString(options) && options === 'refresh') {
                self._updateChartSize()._drawChartSVG().yLabel('refresh').yLabel2('refresh').legend('refresh').title('refresh');
            }
            return self;
        } else {
            return self._options.height;
        }
    };

    bChart.prototype._updateChartSize = function () {
        var self = this;
        var childSVG, chartSVG;
        if (self._options.legend.position.indexOf('right')>=0 && self._options._secondAxis) {
            self._options.padding.right = 120;
        } else {
            self._options.padding.right = 90;
        }

        self._options._chartSVGWidth = self._options.width - self._options.padding.left - self._options.padding.right;
        self._options._chartSVGHeight = self._options.height - self._options.padding.top - self._options.padding.bottom;
        var _parentSVG;
        if (d3.select(self._options.selector).select('.bChart_wrapper').empty()) {
            _parentSVG = d3.select(self._options.selector).append('div')
                .attr('class', 'bChart_wrapper');
        } else {
            _parentSVG = d3.select(self._options.selector).select('.bChart_wrapper');
        }

        if (!_parentSVG.select('svg').empty()) {
            childSVG = _parentSVG.select('svg');
        } else {
            childSVG = _parentSVG.append("svg");
        }

        childSVG.attr('width', self._options.width).attr('height', self._options.height);

        if (!childSVG.select('g.bChart').empty()) {
            chartSVG = childSVG.select('g.bChart');
        } else {
            chartSVG = childSVG.append('g').attr('class', 'bChart');
        }

        chartSVG.attr('width', self._options._chartSVGWidth)
            .attr('height', self._options._chartSVGHeight)
            .attr('transform', 'translate(' + self._options.padding.left + ',' + self._options.padding.top + ')');
        return self;

    };

    bChart.prototype._drawChartSVG = function () {
        var self = this;

        switch (self.constructor) {
            case BarChart:
                return self._drawBarChart();
            case ScatterChart:
                return self._drawScatterChart();
            case BubbleChart:
                return self._drawBubbleChart();
            case LineChart:
                return self._drawLineChart();
            case AreaChart:
                return self._drawAreaChart();
            case PieChart:
                return self._drawPieChart();

        }
    };

    bChart.prototype.draw = function () {
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

        self.background('refresh').xLabel('refresh').yLabel('refresh').xAxis('refresh').yAxis('refresh').title('refresh').tooltip('refresh').legend('refresh');
        self.yLabel2('refresh').yAxis2('refresh');
    };

    bChart.prototype._initXYAxis = function () {
        var self = this;
        self._updateChartSize();

        self._options.xAxis.tickSize = -self._options._chartSVGHeight;
        self._options.yAxis.tickSize = -self._options._chartSVGWidth;

        var x0, x1, y, y2, yAxis, yAxis2, xAxis;
        var x = self._getComputedX();
        x0 = x.x0;
        if (bChart.existy(x.x1)) {
            x1 = x.x1;
        }

        xAxis = self._getXAxis(x0);

        self._renderXAxis(xAxis);

        var yTmp = self._getComputedY();
        y = yTmp.y1;

        yAxis = self._getYAxis(y, false);

        self._renderYAxis(yAxis, false);

        if (self._options._secondAxis) {
            y2 = yTmp.y2;

            yAxis2 = self._getYAxis(y2, true);

            self._renderYAxis(yAxis2, true);
        }

        return {
            x0: x0,
            x1: x1,
            y: y,
            y2: y2
        };
    };

    bChart.prototype._setSpecificPropertiesByChart = function (options, type) {
        var self = this;
        var args;

        var parseArguments = function (args) {
            if (args.length === 2) {
                if (args[0].indexOf('.') >= 0 && args[0].indexOf('$') >= 0) {
                    var groupIndex = parseInt(args[0].split('.')[1].split('$')[1]);
                    args[0] = args[0].split('.')[0] + '.' + groupIndex;
                } else {
                    args[0] = args[0] + '.' + 'all';
                }

            }
            return args;
        };

        if (bChart.typeString(options)) {
            if (options === "refresh") {
                self._drawChartSVG();

            } else {
                args = parseArguments(arguments);

                setTimeout(function () {
                    self.setOptions(args, type);
                    self._drawChartSVG();
                }, 10);
            }
        } else {
            bChart.each(options, function (value, key, obj) {
                var newArgs = [key, value];
                delete obj[key];
                var newKey = parseArguments(newArgs);
                obj[newKey[0]] = value;

            });
            setTimeout(function () {
                self.setOptions(options, type);
                self._drawChartSVG();
            }, 10);
        }
        return self;
    };


    /**
     * Created by CaptainMao on 5/23/15.
     */
    bChart.prototype.bubble = function (options) {
        var self = this;
        if (!bChart.existy(options)) {
            return self._options.bubble;
        }

        if (bChart.isArrayLike(options)) {
            var objOption = {};
            bChart.each(options, function (elem, idx) {
                var groupName, valueArray;
                if (bChart.typeNumber(elem[0])) {
                    if (bChart.existy(self._options._uniqueGroupArrayAll[idx])) {
                        groupName = self._options._uniqueGroupArrayAll[idx];
                        valueArray = elem;
                    }
                } else {
                    groupName = elem[0];
                    valueArray = elem;
                    valueArray.shift();
                }
                objOption[groupName] = valueArray;
                var indexOfBubble = 0;

                bChart.each(self._options._dataset, function (el) {
                    if (el.group === groupName) {
                        el.size = valueArray[indexOfBubble];
                        indexOfBubble++;
                    }
                });
            });
        } else {
            self._setSpecificPropertiesByChart(options, 'bubble');
        }

        return self;

    };
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
    /**
     * Created by CaptainMao on 5/22/15.
     */
    bChart.prototype.colors = function (options) {
        var self = this;
        if (!bChart.existy(options)) {
            return self._options.colors;
        } else {
            if (bChart.typeString(options) && options === 'refresh') {
                updateColors();
            } else {
                self.setOptions(arguments, 'colors');
                updateColors();
            }
            return self;
        }

        function updateColors() {
            var colorTmp = "";
            bChart.each(self._options._uniqueGroupArrayAll, function (value, key) {
                if (self._options.colors[key].indexOf('#')>=0) {
                    colorTmp = bChart.hexToRGBA(self._options.colors[(key % self._options.colors.length)], self._options.colorOpacity);
                } else {
                    colorTmp = self._options.colors[(key % self._options.colors.length)];
                }
                self._options._colorMap[value] = colorTmp;
            });
        }
    };
    /**
     * Created by CaptainMao on 5/22/15.
     */
    bChart.prototype.stackDataset = function (_datasetInputs, groupArray, xArray) {
        var self = this;
        var stack = d3.layout.stack();
        var stackGroup = stack(groupArray.map(function (gd) {
                var stack_array = [],
                    stack_array_modified = [];

                bChart.each(_datasetInputs, function (value, key, array) {
                    if (gd === array[key].group) {
                        stack_array.push(array[key]);
                    }
                });

                stack_array_modified = stack_array.filter(function (el, idx) {

                    return xArray.indexOf(el.x) >= 0;
                });

                return stack_array_modified.map(function (d) {
                    return {x: d.x, value: +parseFloat(d.value), _secondAxis: d._secondAxis,  y: +parseFloat(d.value),  group: d.group};
                });


            }
        ));
        return stackGroup;

    };

    bChart.prototype.parseGroupIndex = function (titleArray, groups) {
        var self = this;
        var groupIndexs = [];
        var groupValue = [];
        if (bChart.isArrayLike(groups)) {
            groups.forEach(function (el) {
                if (!bChart.typeNumber(el)) {
                    var groupIndex = titleArray.indexOf(el);
                    if (groupIndex >= 0) {
                        groupIndexs.push(groupIndex);
                        groupValue.push(el);
                    }
                } else {
                    groupIndexs.push(el);
                    groupValue.push(titleArray[el]);
                }
            });
        } else {
            if (bChart.typeNumber(groups)) {
                groupIndexs.push(groups);
                groupValue.push(titleArray[groups]);
            } else {
                var groupIndex = titleArray.indexOf(groups);
                if (groupIndex >= 0) {
                    groupIndexs.push(groupIndex);
                    groupValue.push(groups);
                }
            }
        }
        return {
            groupIndex: groupIndexs,
            groupValue: groupValue
        };
    };

    bChart.prototype.loadCSV = function (filePath, options) {
        var self = this;
        if (!bChart.existy(filePath)) {
            console.log("Please load data with a file path.");
        }

        d3.text(filePath, function (data) {
            var parsedRows = d3.csv.parseRows(data);
            var columns = [];

            if (!bChart.existy(options)) {
                var stringColumn = [];
                for (var i = 0; i < parsedRows[1].length; i++) {
                    if (!bChart.typeNumber(parsedRows[1][i])) {
                        stringColumn.push(i);
                    }
                }


                for (var j = 0; j < parsedRows[0].length; j++) {
                    if (stringColumn.indexOf(j) >= 0) {
                        continue;
                    }
                    var columnTmp = [];

                    parsedRows.forEach(function (el) {
                       columnTmp.push(el[j]);
                    });
                    columns.push(columnTmp);
                }
                self.load(columns);
            } else {
                var xIndex = -1, xValueArray = [], groupIndex = [], groupValueArray = [], groupIndex2 = [], groupValueArray2 = [], dataObject = {};
                if (bChart.hasProperty(options, 'x')) {
                    if (!bChart.typeNumber(options.x)) {
                        xIndex = parsedRows[0].indexOf(options.x);
                    } else {
                        xIndex = options.x;
                    }
                }
                
                if (bChart.hasProperty(options, 'groups')) {
                    var groupObject = self.parseGroupIndex(parsedRows[0], options.groups);
                    groupIndex = groupObject.groupIndex;
                    groupValueArray = groupObject.groupValue;
                }

                if (bChart.hasProperty(options, 'groups2')) {
                    var groupObject2 = self.parseGroupIndex(parsedRows[0], options.groups2);
                    groupIndex2 = groupObject2.groupIndex;
                    groupValueArray2 = groupObject2.groupValue;
                }

                if (groupIndex.length > 0) {
                    for (var i = 0; i < parsedRows[0].length; i++) {
                        if (groupIndex.indexOf(i) >= 0) {
                            var columnTmp = [];
                            parsedRows.forEach(function (el, idx) {
                                columnTmp.push(el[i]);

                                if (idx > 0 && xIndex > -1) {
                                    xValueArray.push(el[xIndex]);
                                }
                            });
                            columns.push(columnTmp);
                        }
                    }

                    dataObject.dataValue = columns;
                    dataObject.groups = groupValueArray;
                }

                if (groupIndex2.length > 0) {
                    dataObject.groups2 = groupValueArray2;
                }

                if (xValueArray.length > 0) {
                    dataObject.x = xValueArray;
                }
                self.load(dataObject);
            }
        });
    };

    bChart.prototype.load = function (options) {
        var self = this;
        if (bChart.existy(options)) {
            var groups = [];
            if (bChart.isArrayLike(options)) {
                for (var i = 0; i < options.length; i++) {
                    var groupName = bChart.typeNumber(options[i][0]) ? 'data' : options[i][0];
                    groups.push(groupName);
                }
            } else if (bChart.typeObject(options)) {
                if (bChart.hasProperty(options, 'groups')) {
                    groups = options.groups;
                }
            }

            self.unloadData(groups);
            self.loadColumn(options);
            if (!d3.select(self._options.selector).select('svg').empty()) {
                self.draw();
            }
        }
    };

    bChart.prototype.loadColumn = function (options) {
        var self = this;
        if (bChart.existy(options)) {
            if (bChart.isArrayLike(options)) {
                self.loadArrayData(options);
            }
            else if (bChart.typeObject(options)) {
                self.loadObjectData(options);
            }
        }

        return self;
    };
    bChart.prototype.loadObjectData = function (obj) {
        var self = this;
        if (bChart.hasProperty(obj, 'dataValue')) {
            if (bChart.hasProperty(obj, 'groups')) {
                obj.groups = obj.groups.splice(0, obj.dataValue.length);
                self._options._uniqueGroupArrayAll = bChart.concatNoDuplicate(self._options._uniqueGroupArrayAll, obj.groups);
            }

            if (bChart.hasProperty(obj, 'x')) {
                self._options._uniqueXArray = bChart.concatNoDuplicate(self._options._uniqueXArray, obj.x);
            }

            if (bChart.hasProperty(obj, 'groups2') && obj.groups2.length > 0) {
                self._options._secondAxis = true;
                self._options._uniqueGroupArray2 = bChart.concatNoDuplicate(self._options._uniqueGroupArray2, obj.groups2);
            }

            if (bChart.isArrayLike(obj.dataValue)) {
                self.loadArrayData(obj.dataValue, obj);
            }
        }
    };

    bChart.prototype.loadArrayData = function (array, obj) {
        var self = this;
        var isUniqueXNotEmpty = self._options._uniqueXArray.length > 0;
        if (bChart.isArrayLike(array[0])) {
            if (!bChart.typeNumber(array[0][0])) {
                for (var i = 0; i < array.length; i += 1) {
                    var groupName = "", groupIndex = -1;
                    if (bChart.existy(obj) && bChart.hasProperty(obj, 'groups')&&bChart.existy(obj.groups[i])) {
                        groupName = obj.groups[i];
                    } else {
                        groupName = bChart.typeNumber(array[i][0]) ? "data": array[i][0];
                    }
                    if (!bChart.isElementInArray(groupName, self._options._uniqueGroupArrayAll)) {
                        self._options._uniqueGroupArrayAll.push(groupName);
                    }

                    groupIndex = self._options._uniqueGroupArrayAll.indexOf(groupName);

                    if (bChart.hasProperty(self._options, 'node')) {
                        if (bChart.existy(obj) && bChart.hasProperty(obj, 'nodeType')) {
                            bChart.initNodeType.call(self, groupIndex, obj.nodeType[i]);
                        } else {
                            bChart.initNodeType.call(self, groupIndex, "circle");
                        }
                        bChart.initNodeSize.call(self, groupIndex, 128);
                        bChart.initNodeFillOpacity.call(self, groupIndex, 1);
                        bChart.initNodeStrokeWidth.call(self, groupIndex, 1);
                        bChart.initNodeDisplay.call(self, groupIndex, true);
                        bChart.initNodeSolidCircle.call(self, groupIndex, false);
                    }

                    if (bChart.hasProperty(self._options, 'line')) {
                        bChart.initLineType.call(self, groupIndex, 'linear');
                        bChart.initLineStrokeWidth.call(self, groupIndex, '3');
                        bChart.initLineStrokeOpacity.call(self, groupIndex, '1');
                    }

                    if (bChart.hasProperty(self._options, 'area')) {
                        if (self.options.isStack) {
                            bChart.initAreaFillOpacity.call(self, groupIndex, '0.8');

                        } else {
                            bChart.initAreaFillOpacity.call(self, groupIndex, '0.4');
                        }
                        bChart.initAreaStrokeOpacity.call(self, groupIndex, '1');
                        bChart.initAreaStrokeWidth.call(self, groupIndex, '0');
                    }
                    loopDataValue(array, obj, i);
                }
            }
        }

        function loopDataValue (array, obj, i) {
            bChart.each(array[i], function (elem, idx) {
                if (bChart.typeNumber(array[i][1])) {

                    if (bChart.typeNumber(array[i][idx])) {

                        var dataItem = {x: "", group: groupName, value: array[i][idx]};
                        if (bChart.typeNumber(array[i][0])) {
                            dataItem = setDataXValue(dataItem, obj, idx);
                        } else {
                            dataItem = setDataXValue(dataItem, obj, idx-1);
                        }

                        if (bChart.existy(obj) && bChart.hasProperty(obj, 'bubbleValue')) {
                            var bubbleArray = obj.bubbleValue.filter(function (el) {
                                return el[0] === groupName;
                            });
                            if (bChart.existy(bubbleArray[0]) && bubbleArray[0].length > 0) {
                                self._options.bubble[groupName] = bubbleArray[0];
                                dataItem.size = bubbleArray[0][idx];
                            }

                        }

                        if (!isUniqueXNotEmpty) {
                            if (self._options._uniqueXArray.indexOf(dataItem.x) < 0) {
                                self._options._uniqueXArray.push(dataItem.x);
                            }
                        }

                        if (bChart.isElementInArray(groupName, self._options._uniqueGroupArray2)) {
                            dataItem._secondAxis = true;
                        } else {
                            dataItem._secondAxis = false;
                        }
                        self._options._dataset.push(dataItem);
                    }
                }
            });

        }

        function setDataXValue(dataItem, obj, idx) {
            if (bChart.existy(obj) && bChart.hasProperty(obj, 'x') && bChart.existy(obj.x[idx])) {
                dataItem.x = obj.x[idx];
            } else {
                if (bChart.existy(self._options._uniqueXArray[idx])) {
                    dataItem.x = self._options._uniqueXArray[idx];
                } else {
                    dataItem.x = idx;
                }
            }
            return dataItem;
        }
    };

    bChart.prototype.unload = function (options) {
        var self = this;
        self.unloadColumn(options);
        if (!d3.select(self._options.selector).select('svg').empty()) {
            self.draw();

        }
    };

    bChart.prototype.unloadGroup = function (collection) {
        var self = this;
        bChart.each(collection, function (elem) {
            bChart.removeElementFromArray(elem, self._options._uniqueGroupArrayAll);

        });
    };

    bChart.prototype.unloadData = function (options) {
        var self = this;
        bChart.each(options, function (elem) {
            var groupIndex = self._options._uniqueGroupArrayAll.indexOf(elem.group);
            self._options._dataset = self._options._dataset.filter(function (el) {
                return elem !== el.group;
            });
            if (bChart.isElementInArray(elem, self._options._uniqueGroupArray2)) {
                bChart.removeElementFromArray(elem, self._options._uniqueGroupArray2);
                self._options._secondAxis = !!self._options._uniqueGroupArray2.length;
            }

            if (bChart.hasProperty(self._options, 'node') && bChart.existy(self._options.node.type[groupIndex])) {
                bChart.removeNodeType.call(self, groupIndex);
                bChart.removeNodeSize.call(self, groupIndex);
                bChart.removeNodeStrokeWidth.call(self, groupIndex);
                bChart.removeNodeStrokeOpacity.call(self, groupIndex);
                bChart.removeNodeFillOpacity.call(self, groupIndex);
                bChart.removeNodeDisplay.call(self, groupIndex);
                bChart.removeNodeSolidCircle.call(self, groupIndex);
            }

            if (bChart.hasProperty(self._options, 'line') && bChart.existy(self._options.line.type[groupIndex])) {
                bChart.removeLineType.call(self, groupIndex);
                bChart.removeLineStrokeWidth.call(self, groupIndex);
                bChart.removeLineStrokeOpacity.call(self, groupIndex);
            }

            if (bChart.hasProperty(self._options, 'area') && bChart.existy(self._options.area.fillOpacity[groupIndex])) {
                bChart.removeAreaFillOpacity.call(self, groupIndex);
                bChart.removeAreaStrokeOpacity.call(self, groupIndex);
                bChart.removeAreaStrokeWidth.call(self, groupIndex);
            }
        });
    };


    bChart.prototype.unloadColumn = function (options) {
        var self = this;

        if (bChart.existy(options)) {
            if (bChart.isArrayLike(options)) { // only allow groups array.
                self.unloadGroup(options);
                self.unloadData(options);
            } else  {
                if(bChart.hasProperty(options, 'x') && bChart.isArrayLike(options.x)) { // unload by x;
                    bChart.each(options.x, function (elem) {
                        bChart.removeElementFromArray(elem, self._options._uniqueXArray);
                        self._options._dataset = self._options._dataset.filter(function (el) {
                            return elem !== el.x;
                        });
                    });
                }
                
                if (bChart.hasProperty(options, 'groups') && bChart.isArrayLike(options.groups)) {
                    self.unloadGroup(options.groups);
                    self.unloadData(options.groups);
                }
            }

        }


    };
    /**
     * Created by CaptainMao on 5/22/15.
     */
    bChart.prototype.legend = function (options) {
        var self = this;
        if (!bChart.existy(options)) {
            return self._options.legend;
        } else {
            if (bChart.typeString(options) && options === 'refresh') {
                drawLegend();
            } else {
                self.setOptions(arguments, 'legend');
                drawLegend();
            }
            return self;
        }

        function drawLegend () {
            var _checkedLegend = [];
            var chartSVG = d3.select(self._options.selector).select('g.bChart');

            if (self._options.legend.display) {
                if (!chartSVG.selectAll('.bChart_legend').empty()) {
                    chartSVG.selectAll('.bChart_legend').remove();
                }
                var legendRectX, legendRectY, legendTextX, legendTextY, legendTextAnchor, layoutStyle;

                var groupConcat = self._options._uniqueGroupArrayAll;
                var legendSVG = chartSVG.selectAll('.bChart_legend')
                    .data(groupConcat)
                    .enter().append('g')
                    .attr('class', 'bChart_legend');

                switch (self._options.legend.position) {
                    case 'topright':
                        if (self._options.legend.textFirst) {
                            legendRectX = self._options._chartSVGWidth + self._options.padding.right + self._options.legend.offsetAdjust.horizontal - 20;
                            legendRectY = -60 - self._options.legend.offsetAdjust.vertical;
                            legendTextX = self._options._chartSVGWidth + self._options.padding.right + self._options.legend.offsetAdjust.horizontal - 20- self._options.legend.offsetAdjust.textToSymbol;
                            legendTextY = -56 - self._options.legend.offsetAdjust.vertical;
                            legendTextAnchor = 'end';
                        } else {
                            legendTextX = self._options._chartSVGWidth + self._options.padding.right + self._options.legend.offsetAdjust.horizontal - 50;
                            legendTextY = -56 - self._options.legend.offsetAdjust.vertical;
                            legendRectX = self._options._chartSVGWidth + self._options.padding.right + self._options.legend.offsetAdjust.horizontal - 60 - self._options.legend.offsetAdjust.textToSymbol;
                            legendRectY = -60 - self._options.legend.offsetAdjust.vertical;
                            legendTextAnchor = 'start';
                        }
                        layoutStyle = 1;

                        break;
                    case 'right':
                        if (self._options.legend.textFirst) {
                            legendRectX = self._options._chartSVGWidth + self._options.padding.right + self._options.legend.offsetAdjust.horizontal - 20;
                            legendRectY = self._options._chartSVGHeight / 2 - self._options.legend.offsetAdjust.vertical - 60;
                            legendTextX = self._options._chartSVGWidth + self._options.padding.right + self._options.legend.offsetAdjust.horizontal - 20 - self._options.legend.offsetAdjust.textToSymbol;
                            legendTextY = self._options._chartSVGHeight / 2 - self._options.legend.offsetAdjust.vertical - 56;
                            legendTextAnchor = 'end';
                        } else {
                            legendTextX = self._options._chartSVGWidth + self._options.padding.right + self._options.legend.offsetAdjust.horizontal - 50;
                            legendTextY = self._options._chartSVGHeight / 2 - self._options.legend.offsetAdjust.vertical - 56;
                            legendRectX = self._options._chartSVGWidth + self._options.padding.right + self._options.legend.offsetAdjust.horizontal - 60 - self._options.legend.offsetAdjust.textToSymbol;
                            legendRectY = self._options._chartSVGHeight / 2 - self._options.legend.offsetAdjust.vertical - 60;
                            legendTextAnchor = 'start';
                        }
                        layoutStyle = 1;

                        break;
                    case 'bottomright':
                        if (self._options.legend.textFirst) {
                            legendRectX = self._options._chartSVGWidth + self._options.padding.right + self._options.legend.offsetAdjust.horizontal - 20;
                            legendRectY = self._options._chartSVGHeight + 15 - self._options.legend.offsetAdjust.vertical - 60;
                            legendTextX = self._options._chartSVGWidth + self._options.padding.right + self._options.legend.offsetAdjust.horizontal - 20 - self._options.legend.offsetAdjust.textToSymbol;
                            legendTextY = self._options._chartSVGHeight + 15 - self._options.legend.offsetAdjust.vertical - 56;
                            legendTextAnchor = 'end';
                        } else {
                            legendTextX = self._options._chartSVGWidth + self._options.padding.right + self._options.legend.offsetAdjust.horizontal - 50;
                            legendTextY = self._options._chartSVGHeight + 15 - self._options.legend.offsetAdjust.vertical - 56;
                            legendRectX = self._options._chartSVGWidth + self._options.padding.right + self._options.legend.offsetAdjust.horizontal - 60 - self._options.legend.offsetAdjust.textToSymbol;
                            legendRectY = self._options._chartSVGHeight + 15 - self._options.legend.offsetAdjust.vertical - 60;
                            legendTextAnchor = 'start';
                        }
                        layoutStyle = 1;

                        break;
                    case 'top':
                        if (self._options.legend.textFirst) {
                            legendRectX = self._options.legend.offsetAdjust.horizontal;
                            legendRectY = -30 + self._options.legend.offsetAdjust.vertical;
                            legendTextX = self._options.legend.offsetAdjust.horizontal - self._options.legend.offsetAdjust.textToSymbol;
                            legendTextY = -25 + self._options.legend.offsetAdjust.vertical;
                            legendTextAnchor = 'end';
                        } else {
                            legendTextX = self._options.legend.offsetAdjust.horizontal;
                            legendTextY = -25 + self._options.legend.offsetAdjust.vertical;
                            legendRectX = self._options.legend.offsetAdjust.horizontal - self._options.legend.offsetAdjust.textToSymbol - 10;
                            legendRectY = -30 + self._options.legend.offsetAdjust.vertical;
                            legendTextAnchor = 'start';
                        }
                        layoutStyle = 0;

                        break;
                    case 'bottom':
                        if (self._options.legend.textFirst) {
                            legendRectX = self._options.legend.offsetAdjust.horizontal;
                            legendRectY = self._options.legend.offsetAdjust.vertical + self._options._chartSVGHeight + 45;
                            legendTextX = self._options.legend.offsetAdjust.horizontal - self._options.legend.offsetAdjust.textToSymbol;
                            legendTextY = self._options.legend.offsetAdjust.vertical + self._options._chartSVGHeight + 50;
                            legendTextAnchor = 'end';
                        } else {
                            legendTextX = self._options.legend.offsetAdjust.horizontal;
                            legendTextY = self._options.legend.offsetAdjust.vertical + self._options._chartSVGHeight + 50;
                            legendRectX = self._options.legend.offsetAdjust.horizontal - self._options.legend.offsetAdjust.textToSymbol - 10;
                            legendRectY = self._options.legend.offsetAdjust.vertical + self._options._chartSVGHeight + 45;
                            legendTextAnchor = 'start';
                        }
                        layoutStyle = 0;
                        break;
                }

                legendSVG.attr('transform', function (d, i) {
                        if (layoutStyle === 1) {
                            return 'translate(0, ' + (i * self._options.legend.offsetAdjust.between) + ')';

                        } else {
                            var startX = (self._options._chartSVGWidth - self._options._uniqueGroupArrayAll.length * 60) / 2;
                            return 'translate('+ (i * (self._options.legend.offsetAdjust.between + 50) + startX) + ',0)';
                        }

                    })
                    .append('text')
                    .attr('x', legendTextX)
                    .attr('y', legendTextY)
                    .attr('dy', '.35em')
                    .style('font-family', self._options.legend.fontType)
                    .style('text-decoration', function () {
                        return self._options.legend.fontUnderline? "underline" : "none";
                    })
                    .style('font-weight', function () {
                        return self._options.legend.fontBold ? "bold":"normal";
                    })
                    .style('font-style', function () {
                        return self._options.legend.fontItalic? "italic" : "normal";
                    })
                    .style('text-anchor', legendTextAnchor)
                    .style('font-size', self._options.legend.fontSize)
                    .style('fill', self._options.legend.fontColor)
                    .text(function (d) {
                        return d;
                    });


                legendSVG.append('rect')
                    .attr('x', legendRectX)
                    .attr('y', legendRectY)
                    .attr('width', self._options.legend.symbolSize)
                    .attr('height', self._options.legend.symbolSize)
                    .style('fill', function (d) {
                        return self._options._colorMap[d];
                    });

                legendSVG.on('mouseover', function(d) {
                        chartSVG.selectAll('.bChart_legend').classed('unhover',true);
                        chartSVG.selectAll('.bChart_groups').classed('unhover',true);
                        d3.select(this).classed('unhover',false);

                        var groupConcat = self._options._uniqueGroupTmp.length? self._options._uniqueGroupTmp : self._options._uniqueGroupArrayAll;

                        var matchingBarIndex = groupConcat.indexOf(d);
                        var matchingClass = '.bChart_groups_' + matchingBarIndex;
                        chartSVG.selectAll(matchingClass)
                            .classed('unhover', false);


                    })
                    .on('mouseout', function (d) {
                        chartSVG.selectAll('.bChart_legend').classed('unhover',false);
                        chartSVG.selectAll('.bChart_groups').classed('unhover',false);


                    })
                    .on('click', function(d){
                        var allLegend = chartSVG.selectAll('.bChart_legend');

                        if (!_checkedLegend.length) {
                            allLegend.classed('inactive', true);
                            self._options._datasetTmp = self._options._dataset;

                            self._options._uniqueGroupTmp = self._options._uniqueGroupArrayAll;

                        }


                        if (!bChart.isElementInArray(d, _checkedLegend)) {
                            _checkedLegend.push(d);
                            d3.select(this).classed('inactive', false)
                                .classed('active', true);
                        } else {
                            _checkedLegend.splice(bChart.getIndexOfElement(d, _checkedLegend), 1);
                            d3.select(this).classed('inactive', true)
                                .classed('active', false);
                        }

                        self._options._uniqueGroupArrayAll = _checkedLegend;

                        self._options._uniqueGroupArrayAll.sort(function (a, b) {
                            return bChart.getIndexOfElement(a, self._options._uniqueGroupTmp) - bChart.getIndexOfElement(b, self._options._uniqueGroupTmp);
                        });

                        if (bChart.existy(self._options._secondAxis)) {
                            self._options._secondAxis = bChart.isOverlapArray(self._options._uniqueGroupArray2, _checkedLegend) || (!_checkedLegend.length && self._options._uniqueGroupArray2.length);
                        }

                        if (!_checkedLegend.length || _checkedLegend.length === self._options._uniqueGroupTmp.length) {
                            allLegend.classed('inactive', false)
                                .classed('active', false)
                                .classed('unhover', false);

                            self._options._uniqueGroupArrayAll = self._options._uniqueGroupTmp;

                        }

                        self._updateDatasetBySelection(_checkedLegend);
                        if (_checkedLegend.length === self._options._uniqueGroupTmp.length) {
                            _checkedLegend = [];
                        }
                    });
            } else {
                chartSVG.select('.legend').style('display','none');
            }
        }
    };

    bChart.prototype._updateDatasetBySelection = function (selections) {
        var self = this;
        var displayDataset = [];

        if (!selections.length) {
            displayDataset = self._options._datasetTmp;
            self._options._datasetTmp = [];
            self._options._uniqueGroupTmp = [];

        } else {
            displayDataset = self._options._datasetTmp.filter(function (el, idx) {
                return selections.indexOf(el.group) >= 0;
            });
        }
        if (self.constructor === PieChart) {
            self.setOptions([displayDataset], '_dataset')._drawChartSVG().title('refresh').tooltip('refresh');
        } else {

            self.setOptions([displayDataset], '_dataset');

            self.min('refresh').max('refresh').updateMin();
            if (self._options._secondAxis) {
                self.min2('refresh').max2('refresh').updateMin2();
            }

            self._drawChartSVG();

            self.background('refresh').xLabel('refresh').yLabel('refresh').xAxis('refresh').yAxis('refresh').title('refresh').tooltip('refresh');
            self.yLabel2('refresh').yAxis2('refresh');
        }

    };
    /**
     * Created by CaptainMao on 5/23/15.
     */
    bChart.prototype.line = function (options) {
        var self = this;
        if (!bChart.existy(options)) {
            return self._options.line;
        }

        self._setSpecificPropertiesByChart(options, 'line');

        return self;
    };

    bChart.prototype._drawLineSVG = function (options) {
        var self = this;
        var	_datasetTmp = self._options._dataset;
        var	groupConcat = self._options._uniqueGroupTmp.length ? self._options._uniqueGroupTmp : self._options._uniqueGroupArrayAll;
        var _parentSVG;
        if (d3.select(self._options.selector).select('.bChart_wrapper').empty()) {
            _parentSVG = d3.select(self._options.selector).append('div')
                .attr('class', 'bChart_wrapper');
        } else {
            _parentSVG = d3.select(self._options.selector).select('.bChart_wrapper');
        }
        var chartSVG = _parentSVG.select('g.bChart');

        var lineSVG, linePathSVG;
        var dataLine = [];


        if (chartSVG.select('.bChart_lines').empty()) {
            lineSVG = chartSVG.append('g')
                .attr('class', 'bChart_lines');
        } else {
            lineSVG = chartSVG.select('.bChart_lines');
        }

        if (bChart.existy(options)) {
            var drawLineCallBack = function (elem) {
                var singleLineArray = _datasetTmp.filter(function (el) {
                    return el.group === elem;
                });
                dataLine.push(singleLineArray);
            };
            bChart.each(self._options._uniqueGroupArrayAll, drawLineCallBack);

            linePathSVG = lineSVG.selectAll('.bChart_groups')
                .data(dataLine);
            linePathSVG.enter().append('path');

            linePathSVG.exit().remove();

            var line = d3.svg.line()
                .x(function (d) {
                    return self._options.xAxis.isTimeSeries ? options.x0(new Date(d.x)): options.x0(d.x);
                })
                .y(function (d) {
                    return d._secondAxis? options.y2(d.value): options.y(d.value);
                });
            linePathSVG.attr('d', line);
        } else {
            linePathSVG = lineSVG.selectAll('.bChart_groups');
        }

        if (!linePathSVG.empty()) {
            linePathSVG.attr('class', function (d, i) {
                    return 'bChart_groups bChart_groups_' + groupConcat.indexOf(d[i].group);
                })
                .attr('fill-opacity', function () {
                    return 0;
                })
                .attr('stroke', function (d, i) {
                    return self._options._colorMap[d[i].group];
                })
                .attr('stroke-width', function (d, i) {
                    return self._options.line.strokeWidth[groupConcat.indexOf(d[i].group)];
                })

                .style('opacity', 0.1)
                .transition()

                .duration(self._options.duration)
                .style('opacity', function (d, i) {
                    return self._options.line.strokeOpacity[groupConcat.indexOf(d[i].group)];
                });
        }

        return self;

    };

    bChart.initLineType = bChart.initStyleProperty('type', 'line');
    bChart.initLineStrokeWidth = bChart.initStyleProperty('strokeWidth', 'line');
    bChart.initLineStrokeOpacity = bChart.initStyleProperty('strokeOpacity', 'line');

    bChart.removeLineType = bChart.removeStyleProperty('type', 'line');
    bChart.removeLineStrokeWidth = bChart.removeStyleProperty('strokeWidth', 'line');
    bChart.removeLineStrokeOpacity = bChart.removeStyleProperty('strokeOpacity', 'line');
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
    /**
     * Created by CaptainMao on 5/22/15.
     */
    bChart.prototype.max2 = function (options) {
        var self = this;
        if (!bChart.existy(options)) {
            return self._options.maxDefault2;
        }

        if (bChart.typeNumber(options)) {
            self._options.max2 = options;
            self._options.maxDefault2 = options;
        } else if(bChart.typeString(options) && options === 'refresh') {
            if (self._options.isStack) {
                var stackGroupTmp = [];
                bChart.each(self._options._uniqueXArray, function (value, key, array) {
                    var groupTmp = self._options._dataset.filter(function (el) {
                        return value === el.x && el._secondAxis;
                    });
                    stackGroupTmp.push(d3.sum(groupTmp, function (d) {
                        return parseFloat(d.value);
                    }));
                });
                self._options.maxDefault2 = d3.max(stackGroupTmp);
            } else {
                if (!bChart.existy(self._options.max2)) {
                    self._options.maxDefault2 = d3.max(self._options._dataset, function (d) {
                        if (d._secondAxis) {
                            return parseFloat(d.value);
                        }
                    });
                } else {
                    self._options.maxDefault2 = self._options.max2;
                }
            }
        }

        return self;
    };

    bChart.prototype.max = function (options) {
        var self = this;
        if (!bChart.existy(options)) {
            return self._options.maxDefault;
        }
        if (bChart.typeNumber(options)) {
            self._options.max = options;
            self._options.maxDefault = options;
        } else if(bChart.typeString(options) && options === 'refresh') {
            if (self._options.isStack) {
                var stackGroupTmp = [];
                bChart.each(self._options._uniqueXArray, function (value, key, array) {
                    var groupTmp = self._options._dataset.filter(function (el) {
                        return value === el.x;
                    });
                    stackGroupTmp.push(d3.sum(groupTmp, function (d) {
                        return parseFloat(d.value);
                    }));
                });
                self._options.maxDefault = d3.max(stackGroupTmp);
            } else {
                if (!bChart.existy(self._options.max)) {
                    self._options.maxDefault = d3.max(self._options._dataset, function (d) {
                        return parseFloat(d.value);
                    });
                } else {
                    self._options.maxDefault = self._options.max;
                }
            }
        }

        return self;
    };
    /**
     * Created by CaptainMao on 5/22/15.
     */
    bChart.prototype.min2  = function (options) {
        var self = this;
        if (!bChart.existy(options)) {
            return self._options.minDefault2;
        }

        if (bChart.typeNumber(options)) {
            self._options.min2 = options;
            self._options.minDefault2 = options;
        } else if (bChart.typeString(options) && options === 'refresh') {
            if (!bChart.existy(self._options.min2)) {
                self._options.minDefault2 = d3.min(self._options._dataset, function (d) {
                    if (d._secondAxis) {
                        return parseFloat(d.value);
                    }
                });
            } else {
                self._options.minDefault2 = self._options.min2;
            }
        }

        return self;
    };



    bChart.prototype.min = function (options) {
        var self = this;
        if (!bChart.existy(options)) {
            return self._options.minDefault;
        }

        if (bChart.typeNumber(options)) {
            self._options.min = options;
            self._options.minDefault = options;
        } else if (bChart.typeString(options) && options === 'refresh') {
            if (!bChart.existy(self._options.min)) {
                self._options.minDefault = d3.min(self._options._dataset, function (d) {
                    return parseFloat(d.value);
                });
            } else {
                self._options.minDefault = self._options.min;
            }
        }


        return self;
    };

    bChart.prototype.updateMin2 = function () {
        var self = this;
        if (!bChart.existy(self._options.max2) && !bChart.existy(self._options.min2)) {
            self._options.minDefault2 -= (self._options.maxDefault2 - self._options.minDefault2) / self._options.yAxis2.tickNumber;
        }
        self._options.minDefault2 = self._options.minDefault2 <= 0 ? 0: self._options.minDefault2;
        return self;
    };

    bChart.prototype.updateMin = function () {
        var self = this;
        if (!bChart.existy(self._options.max) && !bChart.existy(self._options.min)) {
            self._options.minDefault -= (self._options.maxDefault - self._options.minDefault) / self._options.yAxis.tickNumber;
        }

        self._options.minDefault = self._options.minDefault < 0 ? 0: self._options.minDefault;
        return self;
    };
    /**
     * Created by CaptainMao on 5/22/15.
     */
    bChart.prototype.node = function (options) {
        var self = this;
        if (!bChart.existy(options)) {
            return self._options.node;
        }

        self._setSpecificPropertiesByChart(options, 'node');
        return self;

    };

    bChart.prototype._drawNodeSVG = function (options) {
        var self = this;
        var	_datasetTmp = self._options._dataset;
        var	groupConcat = self._options._uniqueGroupTmp.length ? self._options._uniqueGroupTmp : self._options._uniqueGroupArrayAll;
        var _parentSVG;
        if (d3.select(self._options.selector).select('.bChart_wrapper').empty()) {
            _parentSVG = d3.select(self._options.selector).append('div')
                .attr('class', 'bChart_wrapper');
        } else {
            _parentSVG = d3.select(self._options.selector).select('.bChart_wrapper');
        }
        var chartSVG = _parentSVG.select('g.bChart');

        var nodeSVG, nodePathSVG;
        if (chartSVG.select('.bChart_nodes').empty()) {
            nodeSVG = chartSVG.append('g')
                .attr('class', 'bChart_nodes');
        } else {
            nodeSVG = chartSVG.select('.bChart_nodes');
        }

        var nodeGenerator = d3.svg.symbol()
            .type(function (d) {
                var groupIndex = groupConcat.indexOf(d.group);

                return self._options.node.type[groupIndex];
            }).size(function (d) {
                var groupIndex = groupConcat.indexOf(d.group);

                return bChart.existy(d.size) ? d.size : self._options.node.size[groupIndex];
            });

        if (bChart.existy(options)) {
            nodePathSVG = nodeSVG.selectAll('.bChart_groups')
                .data(_datasetTmp);

            nodePathSVG.enter().append('path');

            nodePathSVG.exit().remove();

            nodePathSVG.attr('class', function(d) {
                    return 'bChart_groups bChart_groups_' + groupConcat.indexOf(d.group);
                })
                .attr('d', nodeGenerator)
                .attr('transform', function (d) {
                    var translateX;
                    if (self._options.xAxis.isTimeSeries) {
                        translateX = options.x0(new Date(d.x));
                    } else {
                        translateX = options.x0(d.x);
                    }
                    return d._secondAxis? "translate(" + translateX + "," + options.y2(d.value) + ")": "translate(" + translateX + "," + options.y(d.value) + ")";
                })
                .style('opacity', 0)
                .transition()
                .duration(self._options.duration)
                .style('opacity', 1);
        } else {
            nodePathSVG = nodeSVG.selectAll('.bChart_groups');
        }

        if (!nodePathSVG.empty()) {
            nodePathSVG.attr('fill', function (d) {
                    var groupIndex = groupConcat.indexOf(d.group);

                    if (self._options.node.solidCircle[groupIndex]) {
                        return self._options.background.color;
                    } else {
                        var nodeFill = self._options._colorMap[d.group];
                        var colorElem = nodeFill.split(',');
                        return colorElem[0] + ',' + colorElem[1] + ',' + colorElem[2] + ',' + self._options.node.fillOpacity[groupIndex] + ')';
                    }
                })
                .attr('stroke', function (d) {
                    return self._options._colorMap[d.group];
                })
                .attr('stroke-width', function (d) {
                    var groupIndex = groupConcat.indexOf(d.group);

                    return self._options.node.strokeWidth[groupIndex];
                })
                .attr('d', nodeGenerator)
                .style('display', function (d) {
                    var groupIndex = groupConcat.indexOf(d.group);
                    return self._options.node.display[groupIndex] ? 'block': 'none';
                });
        }

        return self;

    };

    bChart.initNodeDisplay = bChart.initStyleProperty('display', 'node');
    bChart.initNodeType = bChart.initStyleProperty('type', 'node');
    bChart.initNodeSize = bChart.initStyleProperty('size', 'node');
    bChart.initNodeFillOpacity = bChart.initStyleProperty('fillOpacity', 'node');
    bChart.initNodeStrokeWidth = bChart.initStyleProperty('strokeWidth', 'node');
    bChart.initNodeStrokeOpacity = bChart.initStyleProperty('strokeOpacity', 'node');
    bChart.initNodeSolidCircle = bChart.initStyleProperty('solidCircle', 'node');

    bChart.removeNodeDisplay = bChart.removeStyleProperty('display', 'node');
    bChart.removeNodeType = bChart.removeStyleProperty('type', 'node');
    bChart.removeNodeSize = bChart.removeStyleProperty('size', 'node');
    bChart.removeNodeFillOpacity = bChart.removeStyleProperty('fillOpacity', 'node');
    bChart.removeNodeStrokeWidth = bChart.removeStyleProperty('strokeWidth', 'node');
    bChart.removeNodeStrokeOpacity = bChart.removeStyleProperty('strokeOpacity', 'node');
    bChart.removeNodeSolidCircle = bChart.removeStyleProperty('solidCircle', 'node');
    /**
     * Created by CaptainMao on 5/22/15.
     */
    var _defaultsPie = {
        width: 400,
        height: 400,
        _textRadiusDefault: '',
        _outerRadiusDefault: '',
        _innerRadiusDefault: '',
        valueDisplay: {
            display: true
        },
        title: {
            "text": "Pie Chart"
        },
        _originCentroid: [],
        isDonut: false,
        isPullOut: false,
        pullOutSize: 10,
        tooltip: {
            "type": 0
        }
    };

    var PieChart = function (options) {
        return bChart._customConstructor(this, options, arguments, 'pie');
    };

    bChart.PieChart = PieChart;

    PieChart.prototype = Object.create(bChart.prototype);
    PieChart.prototype.constructor = PieChart;

    PieChart.prototype.draw = function () {
        var self = this;
        if (!bChart.getLength(d3.select(self._options.selector))) {
            console.log("Please make sure the element exists in your template.");
            return void 0;
        }

        self.colors('refresh')._drawChartSVG();

        self.background('refresh').title('refresh').legend('refresh').tooltip('refresh');


    };


    PieChart.prototype._drawPieChart = function () {
        var self = this;
        self._updateChartSize();

        var	_datasetTmp = self._options._dataset;
        var	groupConcat = self._options._uniqueGroupTmp.length? self._options._uniqueGroupTmp: self._options._uniqueGroupArrayAll;
        var _parentSVG;
        if (d3.select(self._options.selector).select('.bChart_wrapper').empty()) {
            _parentSVG = d3.select(self._options.selector).append('div')
                .attr('class', 'bChart_wrapper');
        } else {
            _parentSVG = d3.select(self._options.selector).select('.bChart_wrapper');
        }
        var chartSVG = _parentSVG.select('g.bChart');
        var pieSUM = d3.sum(_datasetTmp, function (d) {
            return parseFloat(d.value);
        });
        if (bChart.existy(self._options.outerRadius) && self._options.outerRadius) {
            self._options._outerRadiusDefault = self._options.outerRadius;
        } else {
            self._options._outerRadiusDefault = self._options._chartSVGWidth > self._options._chartSVGHeight ? self._options._chartSVGHeight /2 : self._options._chartSVGWidth / 2;
        }
        if (bChart.existy(self._options.textRadius) && self._options.textRadius) {
            self._options._textRadiusDefault = self._options.textRadius;
        } else {
            self._options._textRadiusDefault = self._options._outerRadiusDefault * 2 / 3;
        }

        if (bChart.existy(self._options.innerRadius) && self._options.innerRadius) {
            self._options._innerRadiusDefault = self._options.innerRadius;
        } else {
            self._options._innerRadiusDefault = self._options._outerRadiusDefault / 3;
        }

        var arc = self.getArc();

        var pie = d3.layout.pie()
            .value(function (d) {
                return d.value;
            })
            .sort(null);

        var pieSVG, arcSVG, pieDataset, textSVG, pieSVGParent;
        pieDataset = pie(_datasetTmp);

        if (chartSVG.select('.bChart_pie').empty()) {
            pieSVG = chartSVG.append('g')
                .attr('class', 'bChart_pie');
        } else {
            pieSVG = chartSVG.select('.bChart_pie');
        }
        pieSVG.attr('transform', 'translate(' + self._options._chartSVGWidth / 2 + ',' + self._options._chartSVGHeight/ 2 + ')');
        var arcTween = function (a) {
            var interpolate = d3.interpolate(this._current, a);
            this._current = interpolate(0);
            return function(t) {
                return arc(interpolate(t));
            };
        };

        pieSVGParent = pieSVG.selectAll('.bChart_groups')
            .data(pieDataset);

        pieSVGParent.enter().append('g')
            .attr('class', function (d) {
                return 'bChart_groups bChart_groups_' + groupConcat.indexOf(d.data.group);
            });

        pieSVGParent.exit()
            .remove();

        arcSVG = pieSVGParent.selectAll('.bChart_arc')
            .data(function (d) {
                return [d];
            });

        arcSVG.exit()
            .remove();

        arcSVG.enter().append('path')
            .attr('class', function (d) {
                return 'bChart_arc';
            })
            .attr('fill', function (d) {
                return self._options._colorMap[d.data.group];
            })
            .attr('stroke', '#ffffff')
            .each(function (d, i) {
                if (i > 0) {
                    this._current = pieDataset[i-1];
                } else {
                    this._current = {startAngle: 0, endAngle: 0};

                }
            })
            .transition()
            .duration(self._options.duration)
            .attr('d', arcTween);

        arcSVG
            .attr('class', function (d) {
                return 'bChart_arc';
            })
            .attr('fill', function (d) {
                return self._options._colorMap[d.data.group];
            })
            .transition()
            .duration(self._options.duration)
            .attrTween("d", arcTween);


        textSVG = pieSVGParent.selectAll('.bChart_arc_text')
            .data(function (d) {
                return [d];
            });
        if (self._options.valueDisplay.display) {
            textSVG.style('display', 'block');

            textSVG.exit().remove();
            textSVG.enter().append('text')
                .attr('class', function (d) {
                    return 'bChart_arc_text';
                });

            textSVG
                .attr('class', function (d) {
                    return 'bChart_arc_text';
                })
                .attr('transform', function (d) {
                    return 'translate(' + Math.cos((d.startAngle + d.endAngle - Math.PI) / 2) * self._options._textRadiusDefault + ',' + Math.sin((d.startAngle + d.endAngle - Math.PI) / 2) * self._options._textRadiusDefault + ')';
                })
                .attr('text-anchor', 'middle')
                .text(function (d) {
                    return d3.format('%')(d.data.value / pieSUM);
                })
                .attr('fill', '#ffffff');
        } else {
            textSVG.style('display', 'none');
        }

        return self;

    };

    PieChart.prototype.pullOutSegement = function (that) {
        var self = this;
        var selectedArc = d3.select(that);
        var arc = self.getArc();
        selectedArc
            .transition()
            .duration(self._options.duration)
            .attr('transform', function(d) {
            self._options._originCentroid = arc.centroid(d);
            var x = self._options._originCentroid[0],
                y = self._options._originCentroid[1],
                h = Math.sqrt(x*x + y*y);
            return 'translate(' + ((x/h) * self._options.pullOutSize) + ',' + ((y/h) * self._options.pullOutSize) + ')';
        });
    };

    PieChart.prototype.restoreOutSegement = function (that) {
        var self = this;
        var selectedArc = d3.select(that);
        var arc = self.getArc();

        selectedArc
            .transition()
            .duration(self._options.duration)
            .attr('transform', function(d) {
            var centroid = arc.centroid(d),
                x = centroid[0],
                y = centroid[1];
            return 'translate(' + (self._options._originCentroid[0] - x) + ',' + (self._options._originCentroid[1] - y) + ')';
        });
    };

    PieChart.prototype.getArc = function () {
        var self = this;
        var arc;
        if (self._options.isDonut) {
            arc = d3.svg.arc()
                .innerRadius(self._options._innerRadiusDefault)
                .outerRadius(self._options._outerRadiusDefault)
                .startAngle(function (d) {
                    return d.startAngle;
                })
                .endAngle(function (d) {
                    return d.endAngle;
                });
        } else {
            arc = d3.svg.arc()
                .outerRadius(self._options._outerRadiusDefault)
                .startAngle(function (d) {
                    return d.startAngle;
                })
                .endAngle(function (d) {
                    return d.endAngle;
                });
        }
        return arc;
    };
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
    /**
     * Created by CaptainMao on 5/22/15.
     */
    bChart.prototype.title = function (options) {
        var self = this;
        if (!bChart.existy(options)) {
            return self._options.title;
        } else {
            if (bChart.typeString(options) && options === 'refresh') {
                drawTitle();
            } else {
                self.setOptions(arguments, 'title');
                drawTitle();
            }

            return self;
        }


        function drawTitle () {
            var chartSVG = d3.select(self._options.selector).select('g.bChart');
            var titleSVG;
            if (self._options.title.display) {
                if (chartSVG.select('.bChart_title').empty()) {
                    titleSVG = chartSVG.append('g').append('text')
                        .attr('class', 'bChart_title');
                } else {
                    titleSVG = chartSVG.select('.bChart_title').style('display', 'block');
                }
                titleSVG.attr('x', (self._options._chartSVGWidth/2) + self._options.title.offsetAdjust.horizontal)
                    .attr('y', -self._options.padding.top + self._options.title.offsetAdjust.vertical + 30)
                    .attr('text-anchor', 'middle')
                    .style('font-size', self._options.title.fontSize)
                    .style('font-family', self._options.title.fontType)
                    .style('fill', self._options.title.fontColor)
                    .style('text-decoration', function () {
                        return self._options.title.fontUnderline ? 'underline': 'none';
                    })
                    .style('font-weight', function () {
                        return self._options.title.fontBold ? 'bold': 'normal';
                    })
                    .style('font-style', function () {
                        return self._options.title.fontItalic ? 'italic' : 'normal';
                    })
                    .text(self._options.title.text);
            } else {
                chartSVG.select('.bChart_title').style('display', 'none');
            }
        }
    };
    /**
     * Created by CaptainMao on 5/22/15.
     */
    bChart.prototype.tooltip = function (options) {
        var self = this;

        if (!bChart.existy(options)) {
            return self._options.tooltip;

        } else {
            if (bChart.typeString(options) && options === 'refresh') {
                drawTooltip();
            } else {
                self.setOptions(arguments, 'tooltip');
                drawTooltip();

            }

            return self;
        }

        function drawTooltip () {
            var tooltipDIV;
            if (self._options.tooltip.display) {
                var _parentSVG;
                if (d3.select(self._options.selector).select('.bChart_wrapper').empty()) {
                    _parentSVG = d3.select(self._options.selector).append('div')
                        .attr('class', 'bChart_wrapper');
                } else {
                    _parentSVG = d3.select(self._options.selector).select('.bChart_wrapper');
                }
                if (_parentSVG.select('.bChart_tooltip').empty()) {
                    tooltipDIV = _parentSVG.append('div')
                        .attr('class', 'bChart_tooltip')
                        .style('opacity', 0);
                } else {
                    tooltipDIV = _parentSVG.select('.bChart_tooltip')
                        .style('opacity', 0);
                }

                if (self._options.tooltip.type === 1) {
                    drawGroupTooltip(_parentSVG);
                } else {
                    drawSingleTooltip(_parentSVG);
                }

            } else {
                tooltipDIV.remove();
            }

            var parseSingleCustomTooltip = function (tooltipHTML, d, group) {
                var regExpress = /\#([^#]+)\#/g;
                var matches = tooltipHTML.match(regExpress),
                    parsedString = tooltipHTML;
                for (var i = 0; i < matches.length; i++) {
                    var obj = matches[i];
                    var matchValue = obj.substring(1, obj.length - 1).toLowerCase(),
                        value;
                    switch (matchValue) {
                        case "group":
                            if (bChart.existy(group)) {
                                value = group;
                            } else {
                                value = d.group;
                            }
                            break;
                        case "x":
                            value = d.x;
                            break;
                        case "value":
                            if (bChart.existy(group)) {
                                value = d[group];
                            } else {
                                value = d.value;
                            }
                            break;
                    }
                    parsedString = parsedString.replace(obj, value);
                }
                return parsedString;
            };

            var parseGroupCustomTooltip = function (tooltipHTML, d) {
                var regExpress = /\{\{([^{}]+)\}\}/g;
                var matches = tooltipHTML.match(regExpress);
                var parsedHTML = tooltipHTML;
                var parsedSingleHTML = "";
                for (var i = 0; i < matches.length; i++) {
                    var obj = matches[i];
                    var matchValue = obj.split(':');
                    var objHTML = "";

                    if (matchValue[0].indexOf('group')>=0) {
                        if (!self._options.tooltip.groupHTML) {
                            self._options.tooltip._groupHTML = matchValue[1].slice(0, -2);
                            objHTML = obj;
                        } else {
                            self._options.tooltip._groupHTML = self._options.tooltip.groupHTML;
                            objHTML = self._options.tooltip._groupHTML;
                            parsedHTML = parsedHTML.replace(obj, objHTML);
                        }
                        for (var j = 0; j < self._options._uniqueGroupArrayAll.length; j++) {
                            var obj1 = self._options._uniqueGroupArrayAll[j];
                            parsedSingleHTML = parseSingleCustomTooltip(self._options.tooltip._groupHTML, d, obj1);
                            parsedHTML = parsedHTML.replace(objHTML, parsedSingleHTML);
                            if (j < self._options._uniqueGroupArrayAll.length - 1) {
                                parsedHTML += objHTML;
                            }
                        }
                    } else if (matchValue[0].indexOf('x')>= 0){

                        if (!self._options.tooltip.xHTML) {
                            self._options.tooltip._xHTML = matchValue[1].slice(0, -2);
                            objHTML = obj;
                        } else {
                            self._options.tooltip._xHTML = self._options.tooltip.xHTML;
                            objHTML = self._options.tooltip._xHTML;
                            parsedHTML = parsedHTML.replace(obj, objHTML);
                        }
                        parsedSingleHTML = parseSingleCustomTooltip(self._options.tooltip._xHTML, d);
                        parsedHTML = parsedHTML.replace(objHTML, parsedSingleHTML);
                    }
                }
                return parsedHTML;
            };

            function drawGroupTooltip(_parentSVG) {
                var bisectData = d3.bisector(function (d) {
                    return self._options.xAxis.isTimeSeries ? new Date(d.x) : d.x;
                }).left;

                var dataByX = [];
                bChart.each(self._options._uniqueXArray, function (obj) {
                    var dataTmp = {};
                    bChart.each(self._options._dataset, function (data) {
                        if (data.x === obj) {
                            dataTmp.x = obj;
                            dataTmp[data.group] = data.value;
                        }
                    });
                    dataByX.push(dataTmp);
                });

                var focus_x;
                if (_parentSVG.selectAll('.bchart-focus-x-line').empty()) {
                    focus_x = _parentSVG.select('.bChart').append('line')
                        .attr('class', 'bchart-focus-x-line');
                } else {
                    focus_x = _parentSVG.select('.bchart-focus-x-line');
                }

                focus_x.style('stroke', self._options.tooltip.xLine.stroke)
                    .style('stroke-width', self._options.tooltip.xLine.strokeWidth)
                    .style('opacity', 0)
                    .attr('y1', 0)
                    .attr('y2', self._options._chartSVGHeight);


                var focus_rect;
                if (_parentSVG.selectAll('.bchart-focus-rect').empty()) {
                    focus_rect = _parentSVG.select('.bChart').append('rect')
                        .attr('class', 'bchart-focus-rect');
                } else {
                    focus_rect = _parentSVG.select('.bchart-focus-rect');
                }

                focus_rect.attr('width', self._options._chartSVGWidth)
                    .attr('height', self._options._chartSVGHeight)
                    .style('fill', 'none')
                    .attr('pointer-events', 'all')
                    .on('mouseover', function () {
                        tooltipDIV.transition()
                            .duration(self._options.duration)
                            .style('opacity', 1)
                            .style('display', 'block');
                        focus_x.transition()
                            .duration(self._options.duration)
                            .style('opacity', 1);
                    })
                    .on('mousemove', mousemove)
                    .on('mouseout', function () {
                        tooltipDIV.transition()
                            .duration(self._options.duration)
                            .style('opacity', 0)
                            .style('display', 'none');
                        focus_x.transition()
                            .duration(self._options.duration)
                            .style('opacity', 0);
                    });

                function mousemove() {
                    var xOptions = self._getComputedX();
                    var d = {}, offx;
                    if (bChart.existy(xOptions.x0.invert)) {
                        var x0 = xOptions.x0.invert(d3.mouse(this)[0]),
                            i = bisectData(dataByX, x0, 1),
                            d0 = dataByX[i - 1],
                            d1 = dataByX[i];
                        if (!bChart.existy(d1)) {
                            d = d0;
                        } else {
                            if (bChart.existy(d0.x) && bChart.existy(d1.x)) {
                                if (self._options.xAxis.isTimeSeries) {
                                    d = x0.getTime() - (new Date(d0.x)).getTime() > (new Date(d1.x)).getTime() - x0.getTime() ? d1: d0;

                                } else {
                                    d = x0 - d0.x > d1.x - x0 ? d1: d0;

                                }
                            }
                        }
                        offx = self._options.xAxis.isTimeSeries? xOptions.x0(new Date(d.x)):xOptions.x0(d.x);
                        offx += 80;
                    } else {
                        var xPos = d3.mouse(this)[0];
                        var leftEdge = xOptions.x0.range();
                        var rangeWidth = xOptions.x0.rangeBand() === 0 ? ( leftEdge[1] - leftEdge[0] ) / 2 : xOptions.x0.rangeBand();
                        var j;
                        for (j = 0; xPos > (leftEdge[j] + rangeWidth); j++) {
                        }

                        if (j >= leftEdge.length) {
                            j = leftEdge.length - 1;
                        }
                        d = dataByX[j];
                        offx = xOptions.x0.rangeBand() === 0 ? leftEdge[j] + 80 : leftEdge[j] + rangeWidth / 2 + 80;
                    }
                    var tooltip_html = "";

                    if (bChart.existy(self._options.tooltip.html) && self._options.tooltip.html) {
                        tooltip_html = self._options.tooltip.html;
                        tooltip_html = parseGroupCustomTooltip(tooltip_html, d);
                    } else {
                        tooltip_html += "<div class='bchart-tooltip-header'>"+ d.x +"</div>";
                        for (var k = 0; k < self._options._uniqueGroupArrayAll.length; k++) {
                            var obj = self._options._uniqueGroupArrayAll[k];
                            tooltip_html += "<div class='bchart-tooltip-row'><div class='bchart-tooltip-group'>"+obj+"</div><div class='bchart-tooltip-value'>"+d[obj]+"</div></div>";
                        }
                    }

                    var offy = d3.event.hasOwnProperty('offsetY') ? d3.event.offsetY : d3.event.layerY;
                    focus_x.attr('x2', 0)
                        .attr('transform', 'translate(' + (offx - 80) + ',0)');

                    tooltipDIV
                        .style('background', self._options.tooltip.background)
                        .style('top', (offy+10) + 'px')
                        .style('left', (offx) + 'px')
                        .style('font-family', self._options.tooltip.fontType)
                        .style('text-decoration', function () {
                            return self._options.tooltip.fontUnderline ? 'underline' : 'none';
                        })
                        .style('font-weight', function () {
                            return self._options.tooltip.fontBold? 'bold': 'normal';
                        })
                        .style('font-style', function () {
                            return self._options.tooltip.fontItalic ? 'italic' : 'normal';
                        })
                        .style('font-size', self._options.tooltip.fontSize)
                        .style('color', self._options.tooltip.fontColor)
                        .html(tooltip_html);

                    tooltipDIV.selectAll('.bchart-tooltip-group')
                        .style('background', function (d, i) {
                            return self._options._colorMap[self._options._uniqueGroupArrayAll[i]];
                        });
                    tooltipDIV.selectAll('.bchart-tooltip-value')
                        .style('background', function (d, i) {
                            return self._options._colorMap[self._options._uniqueGroupArrayAll[i]];
                        });

                }
            }



            function drawSingleTooltip(_parentSVG) {
                var groupSVG = _parentSVG.selectAll('.bChart_groups');
                _parentSVG.select('.bchart-focus-rect').remove();
                _parentSVG.select('.bchart-focus-x-line').remove();
                groupSVG.on('mouseover', function (d) {
                        d3.select(this).style('opacity', 0.7);
                        tooltipDIV.transition()
                            .duration(self._options.duration)
                            .style('opacity', 1)
                            .style('display', 'block');

                        if (self.constructor === PieChart && self._options.isPullOut) {
                            self.pullOutSegement(this);
                        }

                    })
                    .on('mousemove', function (d) {
                        var tooltip_html;
                        if (self.constructor === PieChart) {
                            tooltip_html = d.data.group + " : " + d.value;
                        } else {
                            tooltip_html = d.group + '(' + d.x + ') :' + d.value;

                        }
                        var selectedColor;
                        if (self.constructor === PieChart) {
                            selectedColor = d3.select(this).select('.bChart_arc').style('fill');
                        } else {
                            selectedColor = d3.select(this).style('fill');
                        }

                        var offx = d3.event.hasOwnProperty('offsetX') ? d3.event.offsetX : d3.event.layerX;
                        var offy = d3.event.hasOwnProperty('offsetY') ? d3.event.offsetY : d3.event.layerY;
                        tooltipDIV.style('background', selectedColor)
                            .style('top', (offy-10) + 'px')
                            .style('left', (offx + 10) + 'px')
                            .style('font-family', self._options.tooltip.fontType)
                            .style('text-decoration', function () {
                                return self._options.tooltip.fontUnderline ? 'underline' : 'none';
                            })
                            .style('font-weight', function () {
                                return self._options.tooltip.fontBold? 'bold': 'normal';
                            })
                            .style('font-style', function () {
                                return self._options.tooltip.fontItalic ? 'italic' : 'normal';
                            })
                            .style('font-size', self._options.tooltip.fontSize)
                            .style('color', self._options.tooltip.fontColor)
                            .html(tooltip_html);

                    })
                    .on('mouseout', function (d) {
                        d3.select(this).style('opacity', 1);
                        tooltipDIV.transition()
                            .duration(self._options.duration)
                            .style('opacity', 0)
                            .style('display', 'none');
                        if (self.constructor === PieChart && self._options.isPullOut) {
                            self.restoreOutSegement(this);
                        }
                    });
                if (!_parentSVG.select('.bChart_lines').empty()) {
                    var groupLineSVG = _parentSVG.select('.bChart_lines').selectAll('.bChart_groups');
                    groupLineSVG.on('mouseover', null)
                        .on('mousemove', null)
                        .on('mouseout', null);
                }

                if (!_parentSVG.select('.bChart_areas').empty()) {
                    var groupAreaSVG = _parentSVG.select('.bChart_areas').selectAll('.bChart_groups');
                    groupAreaSVG.on('mouseover', null)
                        .on('mousemove', null)
                        .on('mouseout', null);
                }
            }
        }
    };
    /**
     * Created by CaptainMao on 5/22/15.
     */
    bChart.prototype._getComputedX = function () {
        var self = this;
        var x0, x1;
        if (!self._options.xAxis.isTimeSeries) {
            if (self.constructor === BarChart) {
                x0 = d3.scale.ordinal()
                    .rangeRoundBands([0, self._options._chartSVGWidth],0.1)
                    .domain(self._options._uniqueXArray);
                x1 = d3.scale.ordinal()
                    .rangeRoundBands([0, x0.rangeBand()])
                    .domain(self._options._uniqueGroupArrayAll);
            } else {
                x0 = d3.scale.ordinal()
                    .rangePoints([0, self._options._chartSVGWidth],0.1)
                    .domain(self._options._uniqueXArray);
            }
        } else {
            var lastDate, newLastDate, firstDate;
            if (self._options._uniqueXArray.length > 0) {
                bChart.sortByDate(self._options._uniqueXArray);
                lastDate = self._options._uniqueXArray[self._options._uniqueXArray.length - 1];
                newLastDate = new Date(lastDate);
                firstDate = new Date(self._options._uniqueXArray[0]);
                if (self._options._uniqueXArray.length === 1) {
                    firstDate.setHours(newLastDate.getHours() - 1);
                    newLastDate.setHours(newLastDate.getHours() + 1);
                } else {
                    newLastDate.setDate(newLastDate.getDate() + 1);
                }
            } else {
                newLastDate = new Date();
                firstDate = new Date();
            }

            x0 = d3.time.scale().range([0, self._options._chartSVGWidth])
                .domain([firstDate, newLastDate]);
        }

        self._options._dataset = bChart.sortedByArray(self._options._dataset, self._options._uniqueXArray);

        return {
            x0: x0,
            x1: x1
        };
    };

    bChart.prototype._getXAxis = function (x) {
        var self = this;

        var innerSize, outerSize;
        if (self._options.xAxis.innerTickSize === 'auto') {
            innerSize = -self._options._chartSVGHeight;
        } else {
            innerSize = self._options.xAxis.innerTickSize;
        }

        if (self._options.xAxis.outerTickSize === 'auto') {
            outerSize = -self._options._chartSVGHeight;
        } else {
            outerSize = self._options.xAxis.outerTickSize;
        }

        var axis = d3.svg.axis()
            .scale(x)
            .orient(self._options.xAxis.orientation)
            .tickPadding(self._options.xAxis.offsetAdjust + 3)
            .innerTickSize(innerSize)
            .outerTickSize(outerSize);
        if (!self._options.xAxis.isTimeSeries) {
            axis.ticks(self._options.xAxis.tickNumber);
        } else {
            var tickNumber, tickFormat;
            if (self._options.xAxis.timeTick) {
                tickNumber = d3.time[self._options.xAxis.timeTick];
            } else {
                if (self._options._uniqueXArray.length > 0) {
                    var timeRange = new Date(self._options._uniqueXArray[self._options._uniqueXArray.length - 1]).getTime() - new Date(self._options._uniqueXArray[0]).getTime();
                    tickNumber = bChart.computeTimeTick(timeRange);
                } else {
                    tickNumber = d3.time.days;
                }
            }

            if (self._options.xAxis.timeFormat) {
                tickFormat = bChart.generateDateFormatter(self._options.xAxis.timeFormat);
            } else {
                tickFormat = bChart.generateDateFormatter();
            }

            axis.ticks(tickNumber)
                .tickFormat(tickFormat);
        }
        return axis;

    };

    bChart.prototype._renderXAxis = function (xAxis) {
        var self = this;
        var chartSVG = d3.select(self._options.selector).select('g.bChart');
        if (chartSVG.select('.bChart_x_axis').empty()) {
            chartSVG.append('g')
                .attr('class', 'bChart_x_axis bChart_grid')
                .attr('transform', 'translate(0,' + self._options._chartSVGHeight + ')')
                .call(xAxis);
        } else {
            chartSVG.select('.bChart_x_axis')
                .attr('transform', 'translate(0,' + self._options._chartSVGHeight + ')')
                .transition()
                .duration(self._options.duration)
                .ease("sin-in-out")
                .call(xAxis);
        }
        if (!chartSVG.select('.bChart_x_axis').select('text').empty()) {
            self._updateXAxisStyle();
        }
        return self;
    };

    bChart.prototype._updateXAxisStyle = function () {
        var self = this;
        var chartSVG = d3.select(self._options.selector).select('g.bChart');
        var xAxisSVGAPath = chartSVG.select('.bChart_x_axis').selectAll('path');
        var xAxisSVGLine = chartSVG.select('.bChart_x_axis').selectAll('line');
        var xAxisSVGText = chartSVG.select('.bChart_x_axis').selectAll('text');
        if (self._options.xAxis.display) {

            xAxisSVGAPath.style('stroke-width', self._options.xAxis.axisWidth)
                .style('stroke', self._options.xAxis.axisColor)
                .style('display', 'block');
            xAxisSVGText.style('display', 'block');


            var textAnchor;
            switch(self._options.xAxis.rotation) {
                case -45:
                    textAnchor = 'end';
                    break;
                case -90:
                    textAnchor = 'end';
                    break;
                case 45:
                    textAnchor = 'start';
                    break;
                case 90:
                    textAnchor = 'start';
                    break;
                case 0:
                    textAnchor = 'middle';
                    break;
            }

            var xText = 0,
                yText = (+xAxisSVGText.attr('y'));

            xAxisSVGText
                .attr('transform', function (d) {
                    return 'rotate(' + self._options.xAxis.rotation + ' ' + xText +','+yText+  ')';
                })
                .style('text-anchor', textAnchor)
                .style('font-size', self._options.xAxis.fontSize)
                .style('fill', self._options.xAxis.fontColor)
                .style('text-decoration', function () {
                    return self._options.xAxis.fontUnderline ? 'underline': 'none';
                })
                .style('font-weight', function () {
                    return self._options.xAxis.fontBold ? 'bold' : 'normal';
                })
                .style('font-style', function () {
                    return self._options.xAxis.fontItalic ? 'italic' : 'normal';
                })
                .style('font-family', self._options.xAxis.fontType);

        } else {
            xAxisSVGAPath.style('display', 'none');
            xAxisSVGText.style('display', 'none');
        }

        if (self._options.xAxis.displayTicksLine) {
            xAxisSVGLine.style('stroke-width', self._options.xAxis.tickLineWidth)
                .style('stroke', self._options.xAxis.tickLineColor)
                .style('display', 'block');
        } else {
            xAxisSVGLine.style('display', 'none');
        }
    };

    bChart.prototype.xAxis = function (options) {
        var self = this;
        if (!bChart.existy(options)) {
            return self._options.xAxis;

        } else {
            if (bChart.typeString(options) && options === 'refresh') {
                drawXAxis();

            } else {
                self.setOptions(arguments, 'xAxis');
                drawXAxis();
            }

            return self;
        }

        function drawXAxis () {
            var x0 = self._getComputedX().x0;
            var xAxis = self._getXAxis(x0);
            self._renderXAxis(xAxis);
        }
    };
    /**
     * Created by CaptainMao on 5/22/15.
     */
    bChart.prototype.xLabel = function (options) {
        var self = this;
        if (!bChart.existy(options)) {
            return self._options.xLabel;

        } else {
            if (bChart.typeString(options) && options === 'refresh') {
                drawXLabel();

            } else {
                self.setOptions(arguments, 'xLabel');
                drawXLabel();
            }

            return self;
        }

        function drawXLabel () {
            var chartSVG = d3.select(self._options.selector).select('g.bChart');
            var xLabelSVG, xPos, yPos;
            if (self._options.xLabel.display) {
                if (chartSVG.select('.bChart_xlabel').empty()) {
                    xLabelSVG = chartSVG.append('g')
                        .append('text')
                        .attr('class', 'bChart_xlabel');
                } else {
                    xLabelSVG = chartSVG.select('.bChart_xlabel').style('display', 'block');
                }
                xPos = self._options._chartSVGWidth / 2 + self._options.xLabel.offsetAdjust.horizontal;
                yPos = self._options._chartSVGHeight + self._options.padding.bottom - 20 - self._options.xLabel.offsetAdjust.vertical;
                xLabelSVG.style('font-size', self._options.xLabel.fontSize)
                    .style('font-family', self._options.xLabel.fontType)
                    .style('fill', self._options.xLabel.fontColor)
                    .attr('x', xPos)
                    .attr('y', yPos)
                    .style('text-anchor', 'middle')
                    .style('text-decoration', function () {
                        return self._options.xLabel.fontUnderline ? 'underline' : 'none';
                    })
                    .style('font-weight', function () {
                        return self._options.xLabel.fontBold ? 'bold' : 'normal';
                    })
                    .style('font-style', function () {
                        return self._options.xLabel.fontItalic ? 'italic':'normal';
                    })
                    .attr('transform', function (d) {
                        return 'rotate(' + self._options.xLabel.rotation + ' ' + xPos.toString() + ' ' + yPos.toString() + ')';
                    })
                    .text(self._options.xLabel.text);
            } else {
                chartSVG.select('.bChart_xlabel').style('display', 'none');
            }
        }
    };
    /**
     * Created by CaptainMao on 5/22/15.
     */

    bChart.prototype._getComputedY = function () {
        var self = this;
        var y1, y2;
        y1 = d3.scale.linear()
            .range([self._options._chartSVGHeight, 0])
            .domain([self._options.minDefault, self._options.maxDefault]);
        if (self._options._secondAxis) {
            y2 = d3.scale.linear()
                .range([self._options._chartSVGHeight, 0])
                .domain([self._options.minDefault2, self._options.maxDefault2]);
        }

        return {
            y1 : y1,
            y2: y2
        };
    };

    bChart.prototype._getYAxis = function (y, isSecond) {
        var self = this;
        var yAxisType = "";
        if (bChart.existy(isSecond) && isSecond) {
            yAxisType = 'yAxis2';
        } else {
            yAxisType = 'yAxis';
        }

        var innerSize, outerSize;
        if (self._options[yAxisType].innerTickSize === 'auto') {
            innerSize = -self._options._chartSVGWidth;
        } else {
            innerSize = self._options[yAxisType].innerTickSize;
        }

        if (self._options[yAxisType].outerTickSize === 'auto') {
            outerSize = -self._options._chartSVGWidth;
        } else {
            outerSize = self._options[yAxisType].outerTickSize;
        }

        return d3.svg.axis()
            .scale(y)
            .orient(self._options[yAxisType].orientation)
            .tickFormat(self._options[yAxisType].tickFormat)
            .tickPadding(self._options[yAxisType].offsetAdjust + 3)
            .ticks(self._options[yAxisType].tickNumber)
            .innerTickSize(innerSize)
            .outerTickSize(outerSize);

    };

    bChart.prototype._renderYAxis = function (yAxis, isSecond) {
        var self = this;
        var chartSVG = d3.select(self._options.selector).select('g.bChart');
        if (bChart.existy(isSecond) && isSecond) {
            if (chartSVG.select('.bChart_y_axis_2').empty()) {
                chartSVG.append('g')
                    .attr('class', 'bChart_y_axis_2 bChart_grid')
                    .attr('transform', 'translate(' + self._options._chartSVGWidth + ',0)')
                    .call(yAxis);
            } else {
                chartSVG.select('.bChart_y_axis_2')
                    .attr('transform', 'translate(' + self._options._chartSVGWidth + ',0)')
                    .transition()
                    .duration(self._options.duration)
                    .ease("sin-in-out")
                    .call(yAxis);
            }
            if (!chartSVG.select('.bChart_y_axis_2').select('text').empty()) {
                self._updateYAxisStyle(isSecond);
            }
        } else {
            if (chartSVG.select('.bChart_y_axis').empty()) {
                chartSVG.append('g')
                    .attr('class', 'bChart_y_axis bChart_grid')
                    .call(yAxis);
            } else {
                chartSVG.select('.bChart_y_axis')
                    .transition()
                    .duration(self._options.duration)
                    .ease("sin-in-out")
                    .call(yAxis);
            }
            if (!chartSVG.select('.bChart_y_axis').select('text').empty()) {
                self._updateYAxisStyle();
            }
        }
        return self;

    };

    bChart.prototype.yAxis2 = function (options) {
        var self = this;



        if (!bChart.existy(options)) {
            return self._options.yAxis2;

        } else {
            if (!(bChart.typeString(options) && options === 'refresh')) {
                self.setOptions(arguments,'yAxis2');
            }
            if (!self._options._secondAxis) {
                var chartSVG = d3.select(self._options.selector).select('g.bChart');
                chartSVG.select('.bChart_y_axis_2').style('display', 'none');
            } else {
                self.yAxis('yAxis2');
            }

            return self;
        }
    };

    bChart.prototype._updateYAxisStyle = function (drawSecAxis) {
        var self = this;
        var chartSVG = d3.select(self._options.selector).select('g.bChart');
        var axisType, yAxisSVG, yAxisSVGAPath, yAxisSVGLine, yAxisSVGText;
        if (bChart.existy(drawSecAxis) && drawSecAxis) {
            axisType = 'yAxis2';
            yAxisSVG = chartSVG.select('.bChart_y_axis_2');
            yAxisSVGAPath = chartSVG.select('.bChart_y_axis_2').selectAll('path');
            yAxisSVGLine = chartSVG.select('.bChart_y_axis_2').selectAll('line');
            yAxisSVGText = chartSVG.select('.bChart_y_axis_2').selectAll('text');
        } else {
            axisType = 'yAxis';
            yAxisSVG = chartSVG.select('.bChart_y_axis');
            yAxisSVGAPath = chartSVG.select('.bChart_y_axis').selectAll('path');
            yAxisSVGLine = chartSVG.select('.bChart_y_axis').selectAll('line');
            yAxisSVGText = chartSVG.select('.bChart_y_axis').selectAll('text');
        }

        if (self._options[axisType].display) {

            yAxisSVG.style('display', 'block');

            yAxisSVGAPath.style('stroke-width', self._options[axisType].axisWidth)
                .style('stroke', self._options[axisType].axisColor)
                .style('display', 'block');
            yAxisSVGText.style('display', 'block');

            var textAnchor;
            switch(self._options[axisType].rotation) {
                case -45:
                    if (drawSecAxis) {
                        textAnchor = 'start';
                    } else {
                        textAnchor = 'end';
                    }

                    break;
                case -90:
                    if (drawSecAxis) {
                        textAnchor = 'middle';
                    } else {
                        textAnchor = 'middle';
                    }

                    break;
                case 45:
                    if (drawSecAxis) {
                        textAnchor = 'start';
                    } else {
                        textAnchor = 'end';
                    }


                    break;
                case 90:
                    if (drawSecAxis) {
                        textAnchor = 'middle';
                    } else {
                        textAnchor = 'middle';
                    }

                    break;
                case 0:
                    if (drawSecAxis) {
                        textAnchor = 'start';
                    } else {
                        textAnchor = 'end';
                    }

                    break;
            }

            var xText = (+yAxisSVGText.attr('x')),
                yText = 0;

            yAxisSVGText.style('text-anchor', textAnchor)
                .attr('transform', function () {
                    return 'rotate(' + self._options[axisType].rotation + ' ' + xText +','+yText+ ')';
                })
                .style('font-size', self._options[axisType].fontSize)
                .style('fill', self._options[axisType].fontColor)
                .style('text-decoration', function () {
                    return self._options[axisType].fontUnderline ? 'underline': 'none';
                })
                .style('font-weight', function () {
                    return self._options[axisType].fontBold ? 'bold' : 'normal';
                })
                .style('font-style', function () {
                    return self._options[axisType].fontItalic ? 'italic' : 'normal';
                })
                .style('font-family', self._options[axisType].fontType);

        } else {
            yAxisSVGAPath.style('display', 'none');
            yAxisSVGText.style('display', 'none');
        }

        if (self._options[axisType].displayTicksLine) {
            yAxisSVGLine.style('stroke-width', self._options[axisType].tickLineWidth)
                .style('stroke', self._options[axisType].tickLineColor)
                .style('display', 'block');
        } else {
            yAxisSVGLine.style('display', 'none');
        }
    };

    bChart.prototype.yAxis = function (options) {
        var self = this;
        if (!bChart.existy(options)) {
            return self._options.yAxis;
        } else {
            if (bChart.typeString(options) && options === 'refresh') {
                drawYAxis();

            } else if (options === 'yAxis2') {
                drawYAxis(true);
            } else {
                self.setOptions(arguments, 'yAxis');
                drawYAxis();
            }
            return self;

        }

        function drawYAxis (drawSecAxis) {
            var yTmp = self._getComputedY();
            var y, yAxis;
            if (bChart.existy(drawSecAxis) && drawSecAxis) {
                y = yTmp.y2;
                yAxis = self._getYAxis(y, true);
                self._renderYAxis(yAxis, true);
            } else {
                y = yTmp.y1;
                yAxis = self._getYAxis(y, false);
                self._renderYAxis(yAxis, false);
            }
        }
    };
    /**
     * Created by CaptainMao on 5/22/15.
     */
    bChart.prototype.yLabel2 = function (options) {
        var self = this;

        if (!bChart.existy(options)) {
            return self._options.yLabel2;

        } else {
            if (!(bChart.typeString(options) && options === 'refresh')) {
                self.setOptions(arguments,'yLabel2');
            }

            if (!self._options._secondAxis) {
                var chartSVG = d3.select(self._options.selector).select('g.bChart');
                chartSVG.select('.bChart_ylabel_2').style('display', 'none');
            } else {
                self.yLabel('yLabel2');

            }

            return self;
        }
    };

    bChart.prototype.yLabel = function (options) {
        var self = this;
        if (!bChart.existy(options)) {
            return self._options.yLabel;
        } else {
            if (bChart.typeString(options) && options === 'refresh') {
                drawYLabel();

            } else if (options === 'yLabel2') {
                drawYLabel(true);
            } else {
                self.setOptions(arguments, 'yLabel');
                drawYLabel();
            }
            return self;

        }

        function drawYLabel (drawSecAxis) {
            var labelType, yPos, xPos, yLabelSVG;

            if (bChart.existy(drawSecAxis) && drawSecAxis) {
                labelType = 'yLabel2';
            } else {
                labelType = 'yLabel';
            }
            var chartSVG = d3.select(self._options.selector).select('g.bChart');
            if (self._options[labelType].display) {
                if (bChart.existy(drawSecAxis) && drawSecAxis) {
                    if (chartSVG.select('.bChart_ylabel_2').empty()) {
                        yLabelSVG = chartSVG.append('g')
                            .append('text')
                            .attr('class', 'bChart_ylabel_2');
                    } else {
                        yLabelSVG = chartSVG.select('.bChart_ylabel_2').style('display', 'block');
                    }
                } else {
                    if (chartSVG.select('.bChart_ylabel').empty()) {
                        yLabelSVG = chartSVG.append('g')
                            .append('text')
                            .attr('class', 'bChart_ylabel');
                    } else {
                        yLabelSVG = chartSVG.select('.bChart_ylabel').style('display', 'block');
                    }
                }

                yPos = self._options._chartSVGHeight/2 - self._options[labelType].offsetAdjust.vertical;
                if (bChart.existy(drawSecAxis) &&  drawSecAxis) {
                    xPos = self._options.padding.left + self._options._chartSVGWidth + self._options[labelType].offsetAdjust.horizontal;

                } else {
                    xPos = -self._options.padding.left + 25 + self._options[labelType].offsetAdjust.horizontal;

                }
                yLabelSVG.style('text-anchor', 'middle')
                    .style('fill', self._options[labelType].fontColor)
                    .attr('y', yPos)
                    .attr('x', xPos)
                    .attr('transform', function (d) {
                        return 'rotate(' + self._options[labelType].rotation + ' ' + xPos.toString() + ' ' + yPos.toString() + ')';
                    })
                    .style('font-size', self._options[labelType].fontSize)
                    .style('font-family', self._options[labelType].fontType)
                    .style('text-decoration', function () {
                        return self._options[labelType].fontUnderline? 'underline' : 'none';
                    })
                    .style('font-weight', function () {
                        return self._options[labelType].fontBold? 'bold': 'normal';
                    })
                    .style('font-style', function () {
                        return self._options[labelType].fontItalic ? 'italic' : 'normal';
                    })
                    .text(self._options[labelType].text);
            } else {
                if (bChart.existy(drawSecAxis) && drawSecAxis) {
                    chartSVG.select('.bChart_ylabel_2').style('display', 'none');

                } else {
                    chartSVG.select('.bChart_ylabel').style('display', 'none');

                }
            }

        }
    };
        return bChart;
    });
