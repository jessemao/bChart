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
                return {x: d.x, value: +parseFloat(d.value), secondAxis: d.secondAxis,  y: +parseFloat(d.value),  group: d.group};
            });


        }
    ));
    return stackGroup;

};

bChart.prototype.load = function (options) {
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
            self.min2('refresh').max2('refresh').updateMin2();
        }
        self.min('refresh').max('refresh').updateMin().colors('refresh')._drawChartSVG().legend('refresh').tooltip('refresh');
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
            self._options.secondAxis = true;
            self._options._uniqueGroupArray2 = bChart.concatNoDuplicate(self._options._uniqueGroupArray2, obj.groups2);
            //self._options._uniqueGroupArray = bChart.removeArrayFromArray(self._options._uniqueGroupArrayAll, self._options._uniqueGroupArray2);
        }

        if (bChart.isArrayLike(obj.dataValue)) {
            self.loadArrayData(obj.dataValue, obj);
        }


    }

};

bChart.prototype.loadArrayData = function (array, obj) {
    var self = this;
    var isUniqueXEmpty = self._options._uniqueXArray.length > 0;
    if (bChart.isArrayLike(array[0])) {
        if (!bChart.typeNumber(array[0][0])) {
            for (var i = 0; i < array.length; i += 1) {
                var groupName = "";
                if (bChart.existy(obj) && bChart.hasProperty(obj, 'groups')&&bChart.existy(obj.groups[i])) {
                    groupName = obj.groups[i];
                } else {
                    groupName = bChart.typeNumber(array[i][0]) ? "data": array[i][0];
                }
                if (!bChart.isElementInArray(groupName, self._options._uniqueGroupArrayAll)) {
                    self._options._uniqueGroupArrayAll.push(groupName);
                }
                if (bChart.hasProperty(self._options, 'node')) {
                    if (bChart.hasProperty(obj, 'nodeType')) {
                        bChart.initNodeType.call(self, groupName, obj.nodeType[i]);
                    } else {
                        bChart.initNodeType.call(self, groupName, "circle");
                    }
                    bChart.initNodeSize.call(self, groupName, 128);
                    bChart.initNodeFillOpacity.call(self, groupName, 1);
                    bChart.initNodeStrokeWidth.call(self, groupName, 1);

                }
                loopDataValue(array, obj);
            }
        }
    }

    function loopDataValue (array, obj) {
        bChart.each(array[i], function (elem, idx) {
            if (bChart.typeNumber(array[i][idx])) {

                var dataItem = {x: "", group: groupName, value: array[i][idx]};
                if (bChart.typeNumber(array[i][0])) {
                    dataItem = setDataXValue(dataItem, obj, idx);
                } else {
                    dataItem = setDataXValue(dataItem, obj, idx-1);
                }

                if (!isUniqueXEmpty) {
                    self._options._uniqueXArray.push(dataItem.x);
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

    function setDataXValue(dataItem, obj, idx) {
        if (bChart.hasProperty(obj, 'x') && bChart.existy(obj.x[idx])) {
            dataItem.x = obj.x[idx];
        } else {
            dataItem.x = idx;
        }
        return dataItem;
    }
};

bChart.prototype.unload = function (options) {
    var self = this;
    var unloadGroup = function (collection) {
        bChart.each(collection, function (elem) {
            bChart.removeElementFromArray(elem, self._options._uniqueGroupArrayAll);
            self._options._dataset = self._options._dataset.filter(function (el) {
                return elem.group !== el;
            });
            if (bChart.isElementInArray(elem, self._options._uniqueGroupArray2)) {
                bChart.removeElementFromArray(elem, self._options._uniqueGroupArray2);
                    self._options.secondAxis = !!self._options._uniqueGroupArray2.length;
            }

            if (bChart.hasProperty(self._options, 'node') && bChart.existy(self._options.node.type[elem.group])) {
                bChart.removeNodeType.call(self, elem.group);
                bChart.removeNodeSize.call(self, elem.group);
                bChart.removeNodeFillOpacity.call(self, elem.group);
                bChart.removeNodeFillOpacity.call(self, elem.group);
            }
        });
    };
    if (bChart.existy(options)) {
        if (bChart.isArrayLike(options)) { // only allow groups array.
            unloadGroup(options);
        } else  {
            if(bChart.hasProperty(options, 'x') && bChart.isArrayLike(options.x)) {
                bChart.each(options.x, function (elem) {
                    bChart.removeElementFromArray(elem, self._options._uniqueXArray);
                    self._options._dataset = self._options._dataset.filter(function (el) {
                        return elem.x !== el;
                    });
                });
            }
            
            if (bChart.hasProperty(options, 'groups') && bChart.isArrayLike(options.groups)) {
                unloadGroup(options.groups);
            }
        }

    }

    if (!d3.select(self._options.selector).select('svg').empty()) {
        if (self._options.secondAxis) {
            self.min2('refresh').max2('refresh').updateMin2();
        }
        self.min('refresh').max('refresh').updateMin().colors('refresh').yAxis2('refresh').yLabel2('refresh')._drawChartSVG().legend('refresh').tooltip('refresh');
    }
};

bChart.prototype._dataset = function (options) {
    var self = this;
    if (bChart.existy(options) && bChart.typeString(options) && options === 'option') {
        return self._options._dataset;
    } else {
        self.setOptions(arguments, '_dataset').draw();
        return self;
    }
};