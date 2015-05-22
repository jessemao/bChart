
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
