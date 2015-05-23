var _selectorToChartObject = {};
var _options = {};

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
	}
	_options = bChart.clone(defaultType);
	if (bChart.typeString(options) && bChart.isSelector(options)) {
		_options.selector = options;
	} else if (bChart.typeObject(options)) {
		bChart.each(options, function (value, key) {
			_options[key] = value;
		});
	}
	switch (chartType) {
		case 'bar':
			return new BarChart(_options.selector, _options);
		case 'scatter':
			return new ScatterChart(_options.selector, _options);
	}
};

bChart._runMethodsInConstructor = function (self, options, args, chartType) {
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
				self.setOptions(bChart.clone(args[1])).draw();
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

