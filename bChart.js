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
var bChart = function (options) {
	var self = this;
	if (bChart.existy(options) && bChart.typeString(options)) {
		if (arguments.length === 2) {
			var chart = new bChart[arguments[1]](arguments[0]);
			//_selectorToType[arguments[0]] = arguments[1];
			return chart;
		} else if (arguments.length === 1) {
			if (bChart.isSelector(options)) {
				return _selectorToChartObject[options];
			}
		}
	}
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

bChart.sorted = function (collection, sortFunc) {
	return collection.sort(sortFunc);
};

bChart.typeDate = function(obj) {
	return isNaN(new Date(obj).getTime());
};

bChart.each = function (obj, iteratee, context) {
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
	if (bChart.hasProperty(obj, key)) {
		if (bChart.typeString(key)) {
			if (key.indexOf('.') >= 0) {
				var keys = key.split('.');
				obj[keys[0]][keys[1]] = value;
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

bChart.prototype = {
	options: function (options) {
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
	},
	setOptions: function (options, type) {
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
								self.load(value);
							} else {
								bChart.setProperty(self._options, key, value);
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
	},
	getOptions: function(key) {
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
	},

	min2 : function () {
		var self = this;
		if (!bChart.existy(self._options.min2)) {
			self._options.minDefault2 = d3.min(self._options._dataset, function (d) {
				if (d.secondAxis) {
					return parseFloat(d.value);
				}
			});
		} else {
			self._options.minDefault2 = self._options.min2;
		}

		return self;
	},



	min : function () {
		var self = this;

		if (!bChart.existy(self._options.min)) {
			self._options.minDefault = d3.min(self._options._dataset, function (d) {
				return parseFloat(d.value);
			});
		} else {
			self._options.minDefault = self._options.min;
		}

		return self;
	},

	max2 : function () {
		var self = this;
		if (self._options.isStack) {
			var stackGroupTmp = [];
			bChart.each(self._options._uniqueXArray, function (value, key, array) {
				var groupTmp = self._options._dataset.filter(function (el) {
					return value === el.x && el.secondAxis;
				});
				stackGroupTmp.push(d3.sum(groupTmp, function (d) {
					return parseFloat(d.value);
				}));
			});
			self._options.maxDefault2 = d3.max(stackGroupTmp);
		} else {
			if (!bChart.existy(self._options.max2)) {
				self._options.maxDefault2 = d3.max(self._options._dataset, function (d) {
					if (d.secondAxis) {
						return parseFloat(d.value);
					}
				});
			} else {
				self._options.maxDefault2 = self._options.max2;
			}
		}

		return self;
	},

	max : function () {
		var self = this;
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

		return self;
	},

	updateMin2 : function () {
		var self = this;
		if (!bChart.existy(self._options.max2) && !bChart.existy(self._options.min2)) {
			self._options.minDefault2 -= (self._options.maxDefault2 - self._options.minDefault2) / self._options.yAxis2.tickNumber;
		}
		//self._options.minDefault <= 0 ? 0: self._options.minDefault;
		return self;
	},

	updateMin : function () {
		var self = this;
		if (!bChart.existy(self._options.max) && !bChart.existy(self._options.min)) {
			self._options.minDefault -= (self._options.maxDefault - self._options.minDefault) / self._options.yAxis.tickNumber;
		}
		return self;
	},
	stackDataset : function (_datasetInputs, groupArray, xArray) {
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
					return {x: d.x, value: +parseFloat(d.value), secondAxis: d.secondAxis,  y: +parseFloat(d.value),  group: d.group};
				});


			}
		));
		return stackGroup;

	},
	colors : function (options) {
		var self = this;
		if (bChart.existy(options) && bChart.typeString(options) && options === 'option') {
			return self._options.colors;
		} else {
			self.setOptions(arguments);
			updateColors();
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
	},

	load: function (options) {
		var self = this;
		if (bChart.existy(options)) {
			if (bChart.isArrayLike(options)) {
				self.loadArrayData(options);
			}
			else if (bChart.typeObject(options)) {
				self.loadObjectData(options);
			}
		}

		if (!d3.select(self._options.selector).select('svg').empty()) {
			if (self._options.secondAxis) {
				self.min2().max2().updateMin2();
			}
			self.min().max().updateMin().colors().drawChartSVG().legend().tooltip();
		}

		return self;
	},
	loadObjectData: function (obj) {
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
				self._options.secondAxis = true;
				self._options._uniqueGroupArray2 = bChart.concatNoDuplicate(self._options._uniqueGroupArray2, obj.groups2);
				self._options._uniqueGroupArray = bChart.removeArrayFromArray(self._options._uniqueGroupArrayAll, self._options._uniqueGroupArray2);
			}

			if (bChart.isArrayLike(obj.dataValue)) {
				if (bChart.isArrayLike(obj.dataValue[0])) {
					if (bChart.hasProperty(obj, 'groups') || !bChart.typeNumber(obj.dataValue[0][0])) {
						for (var i = 0; i < obj.dataValue.length; i += 1) {
							var groupName = "";
							if (bChart.existy(obj.groups)&&bChart.existy(obj.groups[i])) {
								groupName = obj.groups[i];
							} else {
								groupName = bChart.typeNumber(obj.dataValue[i][0]) ? "unknown": obj.dataValue[i][0];
							}
							if (!bChart.isElementInArray(groupName, self._options._uniqueGroupArrayAll)) {
								self._options._uniqueGroupArrayAll.push(groupName);
							}
							bChart.each(obj.dataValue[i], function (elem, idx, array) {
								if (bChart.typeNumber(obj.dataValue[i][idx])) {

									var dataItem = {x: "", group: groupName, value: obj.dataValue[i][idx]};
									if (bChart.typeNumber(obj.dataValue[i][0])) {
										if (bChart.existy(obj.x[idx])) {

											dataItem.x = obj.x[idx];
										} else {
											dataItem.x = idx;
										}
									} else {
										if (idx === 0) {
											return;
										} else {
											if (bChart.existy(obj.x[idx - 1])) {

												dataItem.x = obj.x[idx - 1];
											} else {
												dataItem.x = idx;
											}
										}

									}


									if (bChart.isElementInArray(groupName, self._options._uniqueGroupArray2)) {
										dataItem.secondAxis = true;
									} else {
										dataItem.secondAxis = false;
									}
									self._options._dataset.push(dataItem);
								}
							});
						}
					}
				}
			}
		}

	},
	loadArrayData: function (array) {
		var self = this;
	}

};

var _options = {};
var _defaults = {
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
	secondAxis: false,
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
		"displayLine": true,
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
		"displayLine": false,
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
		"displayLine": true,
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
	var self = this;
	var newOptions = {};
	var _init = function (options) {
		_options = {};
		_options = bChart.clone(_defaults);
		if (bChart.typeString(options) && bChart.isSelector(options)) {
			_options.selector = options;
		} else if (bChart.typeObject(options)) {
			bChart.each(options, function (value, key) {
				_options[key] = value;
			});

		}
		self = new BarChart(_options.selector, _options);
	};
	if (bChart.existy(options)) { // check if options exists first.
		if (arguments.length === 1) { // selector.
			if (bChart.existy(bChart.getObjectBySelector(options)) && bChart.isSelector(options)) {
				return bChart.getObjectBySelector(options);
			} else {
				if (_options.selector !== options ||!bChart.truthy(_options.selector)) {
					_init(options);
				}

			}
		} else {
			if (arguments[0] !== _options.selector ||!bChart.truthy(_options.selector)) {
				newOptions = arguments[1];
				newOptions.selector = options;
				_init(newOptions);
			} else {
				self._options = bChart.clone(arguments[1]);
				bChart.setObjectOfSelector(options, self);
				self.setOptions(bChart.clone(arguments[1])).draw();
			}

		}
	}
	return self;
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


	self.min().max().updateMin();
	if (self._options.secondAxis) {
		self.min2().max2().updateMin2();
	}

	self.colors().drawChartSVG();

	self.title().legend().tooltip().xLabel().yLabel().xAxis().yAxis();
	if (self._options.secondAxis) {
		self.yLabel2().yAxis2();
	}

};


BarChart.prototype.unLoad = function (options) {
	var self = this;
	if (bChart.existy(options)) {
		if (options === '_dataset') {
			self._options._dataset = self._options._dataset2;

		}
	}
	self._options._dataset2 = [];
	self._options._uniqueGroupArray2 = [];
	self._options._uniqueGroupTmp2 = [];
	self._options.secondAxis = false;
	self.yLabel2().yAxis2().draw();
	return self;
};


BarChart.prototype._dataset = function (options) {
	var self = this;
	if (bChart.existy(options) && bChart.typeString(options) && options === 'option') {
		return self._options._dataset;
	} else {
		self.setOptions(arguments, '_dataset').draw();
		return self;
	}
};

BarChart.prototype.updateChartSize = function (options) {
	var self = this;
	var childSVG, chartSVG;
	if (self._options.legend.position.indexOf('right')>=0 && self._options.secondAxis) {
		self._options.padding.right = 150;
	}

	self._options._chartSVGWidth = self._options.width - self._options.padding.left - self._options.padding.right;
	self._options._chartSVGHeight = self._options.height - self._options.padding.top - self._options.padding.bottom;

	var parentSVG = d3.select(self._options.selector);

	if (!parentSVG.select('svg').empty()) {
		childSVG = parentSVG.select('svg');
	} else {
		childSVG = parentSVG.append("svg");
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

BarChart.prototype.drawChartSVG = function () {
	var self = this;
	self.updateChartSize();

	var chartSVG = d3.select(self._options.selector).select('g.bChart');


	var x0 = d3.scale.ordinal()
		.rangeRoundBands([0, self._options._chartSVGWidth],0.1)
		.domain(self._options._uniqueXArray);
	var	x1 = d3.scale.ordinal()
		.rangeRoundBands([0, x0.rangeBand()])
		.domain(self._options._uniqueGroupArrayAll);



	// set default tickSize;
	self._options.xAxis.tickSize = -self._options._chartSVGHeight;
	self._options.yAxis.tickSize = -self._options._chartSVGWidth;

	var	xAxis = d3.svg.axis()
		.scale(x0)
		.orient(self._options.xAxis.orientation)
		.ticks(self._options.xAxis.tickNumber)
		.tickSize(self._options.xAxis.tickSize, 0, 0);


	if (chartSVG.select('.bChart_x_axis').empty()) {
		chartSVG.append('g')
			.attr('class', 'bChart_x_axis bChart_grid')
			.attr('transform', 'translate(0,' + self._options._chartSVGHeight + ')')
			.call(xAxis);
	} else {
		chartSVG.select('.bChart_x_axis')
			.transition()
			.duration(self._options.duration)
			.ease("sin-in-out")
			.call(xAxis);
	}

	var	y = d3.scale.linear()
		.range([self._options._chartSVGHeight, 0])
		.domain([self._options.minDefault, self._options.maxDefault]);

	var	yAxis = d3.svg.axis()
		.scale(y)
		.orient(self._options.yAxis.orientation)
		.tickFormat(self._options.yAxis.tickFormat)
		.ticks(self._options.yAxis.tickNumber)
		.tickSize(self._options.yAxis.tickSize, 0, 0);

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

	if (self._options.secondAxis) {
		var	y2 = d3.scale.linear()
			.range([self._options._chartSVGHeight, 0])
			.domain([self._options.minDefault2, self._options.maxDefault2]);
		var	yAxis2 = d3.svg.axis()
			.scale(y2)
			.orient(self._options.yAxis2.orientation)
			.tickFormat(self._options.yAxis2.tickFormat)
			.ticks(self._options.yAxis2.tickNumber)
			.tickSize(self._options.yAxis2.tickSize, 0, 0);
		if (chartSVG.select('.bChart_y_axis_2').empty()) {
			chartSVG.append('g')
				.attr('class', 'bChart_y_axis_2 bChart_grid')
				.attr('transform', 'translate(' + self._options._chartSVGWidth + ',0)')
				.call(yAxis2);
		} else {
			chartSVG.select('.bChart_y_axis_2')
				.attr('transform', 'translate(' + self._options._chartSVGWidth + ',0)')
				.transition()
				.duration(self._options.duration)
				.ease("sin-in-out")
				.call(yAxis2);
		}
	}

	if (self._options.isStack) {
		drawStackSVG();
	} else {
		drawBarSVG();
	}
	return self;

	function drawStackSVG () {

		var	_datasetTmp = self._options._dataset;
		var	groupTmp = self._options._uniqueGroupArrayAll;

		var stackBarArray = self.stackDataset(_datasetTmp, groupTmp, self._options._uniqueXArray);
		var stackBarSVG = chartSVG.selectAll('.bChart_groupBar')
			.data(stackBarArray);

		stackBarSVG.exit().remove();
		stackBarSVG.enter().append('g')
			.attr('class', function (d,i) {
				return 'bChart_groupBar';

			});

		var barRects = stackBarSVG.selectAll('rect')
			.data(function (d) {
				return d;
			});
		barRects.exit().remove();
		barRects.enter().append('rect');

		barRects.attr('width', x0.rangeBand() - self._options.barDistance)
			.attr('x', function (d) {
				return x0(d.x) + self._options.barDistance/2;
			})
			.attr('y', self._options._chartSVGHeight)
			.attr('height', 0)
			.style('fill', function (d) {
				return self._options._colorMap[d.group];
			})
			.style('stroke', function(d, i) {
				return self._options._colorMap[d.group];
			})
			.style('stroke-width', 0)
			.transition()
			.duration(self._options.duration)
			.attr('y', function (d) {
				return y(d.y0 + d.y);
			})
			.attr('height', function (d, i) {
				if(d.group === self._options._uniqueGroupArrayAll[0]) {
					return self._options._chartSVGHeight - y(d.y + d.y0);
				} else {
					return y(d.y0) - y(d.y + d.y0);

				}
			})
			.attr('class', function (d) {
				return 'bChart_groups bChart_groups' + self._options._uniqueGroupArrayAll.indexOf(d.group);
			});
	}

	function drawBarSVG(){
		var	_datasetTmp = self._options._dataset;
		var	groupConcat = self._options._uniqueGroupArrayAll;
		var groupBarArray = [];
		bChart.each(self._options._uniqueXArray, function (value, key) {
			var groupBarValue = _datasetTmp.filter(function (el) {
				return el.x === value;
			});

			groupBarArray.push({x: value, data: groupBarValue});
		});

		var groupBarSVG = chartSVG.selectAll('.bChart_groupBar')
			.data(groupBarArray);

		groupBarSVG.exit().remove();
		groupBarSVG.enter().append('g')
			.attr('class', function (d, i) {
				return 'bChart_groupBar';
			});

		groupBarSVG.attr('transform', function (d) {
			return 'translate(' + x0(d.x) + ',0)';
		});

		var barRects = groupBarSVG.selectAll('rect')
			.data(function (d) {
				return d.data;
			});

		barRects.exit().transition().attr('height', 0).remove();
		barRects.enter().append('rect');

		barRects.attr('width', x1.rangeBand() - self._options.barDistance)
			.attr('x', function (d, i) {
				return x1(d.group) + self._options.barDistance/2;
			})
			.attr('y', self._options._chartSVGHeight)
			.attr('height', 0)
			.style('fill', function (d, i) {
				return self._options._colorMap[d.group];
			})
			.style('stroke', function(d, i) {
				return self._options._colorMap[d.group];
			})
			.style('stroke-width', 0)
			.transition()
			.duration(self._options.duration)
			.attr('y', function (d) {
				return d.secondAxis? y2(d.value) : y(d.value);

			})
			.attr('height', function (d) {
				return d.secondAxis? self._options._chartSVGHeight - y2(d.value) : self._options._chartSVGHeight - y(d.value);
			})
			.attr('class', function (d) {
				return 'bChart_groups bChart_groups' + groupConcat.indexOf(d.group);
			});
	}
};



BarChart.prototype.background = function (options) {
	var self = this;
	if (bChart.existy(options) && bChart.typeString(options) && options === 'option') {
		return self._options.background;
	} else {
		self.setOptions(arguments, 'bChart_background');
		drawBackground();
		return self;
	}
	function drawBackground () {
		var backgroundDIV;
		var parentSVG = d3.select(self._options.selector);
		if (parentSVG.select('.bChart_background').empty()) {
			backgroundDIV = parentSVG.append('div')
				.attr('class', 'bChart_background');
		} else {
			backgroundDIV = parentSVG.select('.bChart_background');
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

BarChart.prototype.title = function (options) {
	var self = this;
	if (bChart.existy(options) && bChart.typeString(options) && options === 'option') {
		return self._options.title;
	} else {
		self.setOptions(arguments, 'title');
		drawTitle();
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

BarChart.prototype.legend = function (options) {
	var self = this;
	if (bChart.existy(options) && bChart.typeString(options) && options === 'option') {
		return self._options.legend;
	} else {
		self.setOptions(arguments, 'legend');
		drawLegend();
		return self;
	}

	function drawLegend () {
		var _checkedLegend = [];
		var chartSVG = d3.select(self._options.selector).select('g.bChart');

		if (self._options.legend.display) {
			if (!chartSVG.selectAll('.bChart_legend').empty()) {
				chartSVG.selectAll('.bChart_legend').remove();
			}
			var legendRectX, legendRectY, legendTextX, legendTextY, legendTextAnchor;

			var groupConcat = self._options._uniqueGroupArrayAll;
			var legendSVG = chartSVG.selectAll('.bChart_legend')
				.data(groupConcat)
				.enter().append('g')
				.attr('class', 'bChart_legend');

			switch (self._options.legend.position) {
				case 'topright':
					legendRectX = self._options._chartSVGWidth + self._options.padding.right + self._options.legend.offsetAdjust.horizontal - 20;
					legendRectY = -60 - self._options.legend.offsetAdjust.vertical;
					legendTextX = self._options._chartSVGWidth + self._options.padding.right + self._options.legend.offsetAdjust.horizontal - 20- self._options.legend.offsetText;
					legendTextY = -56 - self._options.legend.offsetAdjust.vertical;
					legendTextAnchor = 'end';

					break;
				case 'right':
					legendRectX = self._options._chartSVGWidth + self._options.padding.right + self._options.legend.offsetAdjust.horizontal - 20;
					legendRectY = self._options._chartSVGHeight / 2 - self._options.legend.offsetAdjust.vertical - 60;
					legendTextX = self._options._chartSVGWidth + self._options.padding.right + self._options.legend.offsetAdjust.horizontal - 20 - self._options.legend.offsetText;
					legendTextY = self._options._chartSVGHeight / 2 - self._options.legend.offsetAdjust.vertical - 56;
					legendTextAnchor = 'end';
					break;
				case 'bottomright':
					legendRectX = self._options._chartSVGWidth + self._options.padding.right + self._options.legend.offsetAdjust.horizontal - 20;
					legendRectY = self._options._chartSVGHeight + 15 - self._options.legend.offsetAdjust.vertical - 60;
					legendTextX = self._options._chartSVGWidth + self._options.padding.right + self._options.legend.offsetAdjust.horizontal - 20 - self._options.legend.offsetText;
					legendTextY = self._options._chartSVGHeight + 15 - self._options.legend.offsetAdjust.vertical - 56;
					legendTextAnchor = 'end';
			}

			legendSVG.attr('transform', function (d, i) {
				return 'translate(0, ' + (i * self._options.legend.offsetSymbol) + ')';
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
				.style('fill', function (d, i) {
					return self._options._colorMap[d];
				});

			legendSVG.on('mouseover', function(d) {
					chartSVG.selectAll('.bChart_legend').classed('unhover',true);
					chartSVG.selectAll('.bChart_groups').classed('unhover',true);
					d3.select(this).classed('unhover',false);

					var groupConcat = self._options._uniqueGroupArrayAll;

					var matchingBarIndex = groupConcat.indexOf(d);
					var matchingClass = '.bChart_groups' + matchingBarIndex;
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

					self._options.secondAxis = bChart.isOverlapArray(self._options._uniqueGroupArray2, _checkedLegend) || (!_checkedLegend.length && self._options._uniqueGroupArray2.length);


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

BarChart.prototype._updateDatasetBySelection = function (selections) {
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
	self.setOptions([displayDataset], '_dataset').min().max().yAxis2().updateMin().drawChartSVG().tooltip();

};

BarChart.prototype.yLabel2 = function (options) {
	var self = this;
	if (!self._options.secondAxis) {
		var chartSVG = d3.select(self._options.selector).select('g.bChart');
		chartSVG.select('.bChart_ylabel_2').style('display', 'none');
		return self;
	}
	if (bChart.existy(options) && bChart.typeString(options) && options === 'option') {
		return self._options.yLabel2;

	} else {
		self.setOptions(arguments,'yLabel2');
		self.yLabel('yLabel2');
		return self;
	}
};

BarChart.prototype.yLabel = function (options) {
	var self = this;
	if (bChart.existy(options)) {
		if (bChart.typeString(options) && options === 'option') {
			return self._options.yLabel;

		} else if (options === 'yLabel2') {
			drawYLabel(true);
		} else {
			self.setOptions(arguments, 'yLabel');
			drawYLabel();
			return self;
		}
	} else {
		drawYLabel();
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

BarChart.prototype.xLabel = function (options) {
	var self = this;
	if (bChart.existy(options) && bChart.typeString(options) && options === 'option') {
		return self._options.xLabel;

	} else {
		self.setOptions(arguments, 'xLabel');
		drawXLabel();
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
			yPos = self._options._chartSVGHeight + self._options.padding.bottom - 10 - self._options.xLabel.offsetAdjust.vertical;
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

BarChart.prototype.xAxis = function (options) {
	var self = this;
	if (bChart.existy(options) && bChart.typeString(options) && options === 'option') {
		return self._options.xAxis;

	} else {
		self.setOptions(arguments, 'xAxis');
		drawXAxis();
		return self;
	}

	function drawXAxis () {
		var chartSVG = d3.select(self._options.selector).select('g.bChart');
		var xAxisSVGAPath = chartSVG.select('.bChart_x_axis').selectAll('path');
		var xAxisSVGLine = chartSVG.select('.bChart_x_axis').selectAll('line');
		var xAxisSVGText = chartSVG.select('.bChart_x_axis').selectAll('text');
		if (self._options.xAxis.display) {

			xAxisSVGAPath.style('stroke-width', self._options.xAxis.axisWidth)
				.style('stroke', self._options.xAxis.axisColor)
				.style('display', 'block');
			xAxisSVGText.style('display', 'block');

			var rotateDxXAxis, rotateDyXAxis, textAnchor;
			switch(self._options.xAxis.rotation) {
				case -45:
					rotateDxXAxis = '0';
					rotateDyXAxis = '1em';
					textAnchor = 'end';
					break;
				case -90:
					rotateDxXAxis = '-.5em';
					rotateDyXAxis = '0';
					textAnchor = 'end';
					break;
				case 45:
					rotateDxXAxis = '0em';
					rotateDyXAxis = '1em';
					textAnchor = 'start';
					break;
				case 90:
					rotateDxXAxis = '.5em';
					rotateDyXAxis = '0';
					textAnchor = 'start';
					break;
				case 0:
					rotateDxXAxis = '0';
					rotateDyXAxis = '1em';
					textAnchor = 'middle';
					break;
			}

			xAxisSVGText.style('text-anchor', textAnchor)
				.attr('dx', rotateDxXAxis)
				.attr('dy', rotateDyXAxis)
				.attr('transfrom', function (d) {
					return 'rotate(' + self._options.xAxis.rotation + ')';
				})
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

		if (self._options.xAxis.displayLine) {
			xAxisSVGLine.style('stroke-width', self._options.xAxis.tickLineWidth)
				.style('stroke', self._options.xAxis.tickLineColor)
				.style('display', 'block');
		} else {
			xAxisSVGLine.style('display', 'none');
		}


	}
};

BarChart.prototype.yAxis2 = function (options) {
	var self = this;
	if (!self._options.secondAxis) {
		var chartSVG = d3.select(self._options.selector).select('g.bChart');
		chartSVG.select('.bChart_y_axis_2').style('display', 'none');
		return self;
	}
	if (bChart.existy(options) && bChart.typeString(options) && options === 'option') {
		return self._options.yAxis2;

	} else {
		self.setOptions(arguments,'yAxis2');
		self.yAxis('yAxis2');
		return self;
	}
};

BarChart.prototype.yAxis = function (options) {
	var self = this;
	if (bChart.existy(options)) {
		if (bChart.typeString(options) && options === 'option') {
			return self._options.yAxis;

		} else if (options === 'yAxis2') {
			drawYAxis(true);
		} else {
			self.setOptions(arguments, 'yAxis');
			drawYAxis();
			return self;
		}
	} else {
		drawYAxis();
		return self;
	}

	function drawYAxis (drawSecAxis) {
		var chartSVG = d3.select(self._options.selector).select('g.bChart');
		var axisType, yAxisSVG, yAxisSVGAPath, yAxisSVGLine, yAxisSVGText, minY, maxY;
		if (bChart.existy(drawSecAxis) && drawSecAxis) {
			axisType = 'yAxis2';
			yAxisSVG = chartSVG.select('.bChart_y_axis_2');
			yAxisSVGAPath = chartSVG.select('.bChart_y_axis_2').selectAll('path');
			yAxisSVGLine = chartSVG.select('.bChart_y_axis_2').selectAll('line');
			yAxisSVGText = chartSVG.select('.bChart_y_axis_2').selectAll('text');
			minY = self._options.minDefault2;
			maxY = self._options.maxDefault2;
		} else {
			axisType = 'yAxis';
			yAxisSVG = chartSVG.select('.bChart_y_axis');

			yAxisSVGAPath = chartSVG.select('.bChart_y_axis').selectAll('path');
			yAxisSVGLine = chartSVG.select('.bChart_y_axis').selectAll('line');
			yAxisSVGText = chartSVG.select('.bChart_y_axis').selectAll('text');
			minY = self._options.minDefault;
			maxY = self._options.maxDefault;
		}

		if (self._options[axisType].display) {

			var	y = d3.scale.linear()
				.range([self._options._chartSVGHeight, 0])
				.domain([minY, maxY]);

			var	yAxis = d3.svg.axis()
				.scale(y)
				.orient(self._options[axisType].orientation)
				.tickFormat(self._options[axisType].tickFormat)
				.ticks(self._options[axisType].tickNumber)
				.tickSize(self._options[axisType].tickSize, 0, 0);


			yAxisSVG
				.transition()
				.duration(self._options.duration)
				.ease("sin-in-out")
				.call(yAxis);

			yAxisSVG.style('display', 'block');

			yAxisSVGAPath.style('stroke-width', self._options[axisType].axisWidth)
				.style('stroke', self._options[axisType].axisColor)
				.style('display', 'block');
			yAxisSVGText.style('display', 'block');

			var rotateDxyAxis, rotateDyyAxis, textAnchor;
			switch(self._options[axisType].rotation) {
				case -45:
					if (drawSecAxis) {
						rotateDxyAxis = '.1em';
						rotateDyyAxis = '-1em';
						textAnchor = 'start';
					} else {
						rotateDxyAxis = '-.1em';
						rotateDyyAxis = '-1em';
						textAnchor = 'end';
					}

					break;
				case -90:
					if (drawSecAxis) {
						rotateDxyAxis = '0.5em';
						rotateDyyAxis = '-.5em';
						textAnchor = 'middle';
					} else {
						rotateDxyAxis = '0.5em';
						rotateDyyAxis = '-.5em';
						textAnchor = 'middle';
					}

					break;
				case 45:
					if (drawSecAxis) {
						rotateDxyAxis = '.1em';
						rotateDyyAxis = '1em';
						textAnchor = 'start';
					} else {
						rotateDxyAxis = '.1em';
						rotateDyyAxis = '1em';
						textAnchor = 'end';
					}


					break;
				case 90:
					if (drawSecAxis) {
						rotateDxyAxis = '0em';
						rotateDyyAxis = '1em';
						textAnchor = 'middle';
					} else {
						rotateDxyAxis = '0em';
						rotateDyyAxis = '1em';
						textAnchor = 'middle';
					}

					break;
				case 0:
					if (drawSecAxis) {
						rotateDxyAxis = '0em';
						rotateDyyAxis = '0.3em';
						textAnchor = 'start';
					} else {
						rotateDxyAxis = '0em';
						rotateDyyAxis = '0.3em';
						textAnchor = 'end';
					}

					break;
			}

			yAxisSVGText.style('text-anchor', textAnchor)
				.attr('dx', rotateDxyAxis)
				.attr('dy', rotateDyyAxis)
				.attr('transfrom', function (d) {
					return 'rotate(' + self._options[axisType].rotation + ')';
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

		if (self._options[axisType].displayLine) {
			yAxisSVGLine.style('stroke-width', self._options[axisType].tickLineWidth)
				.style('stroke', self._options[axisType].tickLineColor)
				.style('display', 'block');
		} else {
			yAxisSVGLine.style('display', 'none');
		}


	}
};

BarChart.prototype.tooltip = function (options) {
	var self = this;
	if (bChart.existy(options) && bChart.typeString(options) && options === 'option') {
		return self._options.tooltip;

	} else {
		self.setOptions(arguments, 'tooltip');
		drawTooltip();
		return self;
	}

	function drawTooltip () {
		var tooltipDIV;
		var parentSVG = d3.select(self._options.selector);
		if (self._options.tooltip.display) {
			if (parentSVG.select('.bChart_tooltip').empty()) {
				tooltipDIV = parentSVG.append('div')
					.attr('class', 'bChart_tooltip')
					.style('opacity', 0);
			} else {
				tooltipDIV = parentSVG.select('.bChart_tooltip')
					.style('opacity', 0);
			}

			var groupBarSVG = parentSVG.selectAll('.bChart_groupBar').selectAll('rect');
			groupBarSVG.on('mouseover', function (d) {
				d3.select(this).style('opacity', 0.7);
				tooltipDIV.transition()
					.duration(self._options.duration)
					.style('opacity', 1)
					.style('display', 'block');
			})
				.on('mousemove', function (d) {
					var selectedBar = this;
					var tooltip_html = d.group + '(' + d.x + ') :' + d.value;
					var selectedBarColor = d3.select(this).style('fill');
					var offx = d3.event.hasOwnProperty('offsetX') ? d3.event.offsetX : d3.event.layerX;
					var offy = d3.event.hasOwnProperty('offsetY') ? d3.event.offsetY : d3.event.layerY;
					tooltipDIV.style('background', selectedBarColor)
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
				});
		} else {
			tooltipDIV.remove();
		}
	}
};

    return bChart;
});
