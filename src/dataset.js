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
        if (self.constructor === PieChart) {
            self.colors('refresh')._drawChartSVG();

            self.title('refresh').legend('refresh').tooltip('refresh');
        } else {
            if (self._options.secondAxis) {
                self.min2('refresh').max2('refresh').updateMin2();
            }
            self.min('refresh').max('refresh').updateMin().colors('refresh')._drawChartSVG().legend('refresh').tooltip('refresh');
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
    var isUniqueXNotEmpty = self._options._uniqueXArray.length > 0;
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
                    if (bChart.existy(obj) && bChart.hasProperty(obj, 'nodeType')) {
                        bChart.initNodeType.call(self, groupName, obj.nodeType[i]);
                    } else {
                        bChart.initNodeType.call(self, groupName, "circle");
                    }
                    bChart.initNodeSize.call(self, groupName, 128);
                    bChart.initNodeFillOpacity.call(self, groupName, 1);
                    bChart.initNodeStrokeWidth.call(self, groupName, 1);

                }

                if (bChart.hasProperty(self._options, 'line')) {
                    bChart.initLineType.call(self, groupName, 'linear');
                    bChart.initLineStrokeWidth.call(self, groupName, '3');
                    bChart.initLineStrokeOpacity.call(self, groupName, '1');
                }

                if (bChart.hasProperty(self._options, 'area')) {
                    if (self.options.isStack) {
                        bChart.initAreaFillOpacity.call(self, groupName, '0.8');

                    } else {
                        bChart.initAreaFillOpacity.call(self, groupName, '0.4');
                    }
                    bChart.initAreaStrokeOpacity.call(self, groupName, '1');
                    bChart.initAreaStrokeWidth.call(self, groupName, '1');
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
    var unloadGroup = function (collection) {
        bChart.each(collection, function (elem) {
            bChart.removeElementFromArray(elem, self._options._uniqueGroupArrayAll);
            self._options._dataset = self._options._dataset.filter(function (el) {
                return elem !== el.group;
            });
            if (bChart.isElementInArray(elem, self._options._uniqueGroupArray2)) {
                bChart.removeElementFromArray(elem, self._options._uniqueGroupArray2);
                    self._options.secondAxis = !!self._options._uniqueGroupArray2.length;
            }

            if (bChart.hasProperty(self._options, 'node') && bChart.existy(self._options.node.type[elem.group])) {
                bChart.removeNodeType.call(self, elem.group);
                bChart.removeNodeSize.call(self, elem.group);
                bChart.removeNodeStrokeWidth.call(self, elem.group);
                bChart.removeNodeStrokeOpacity.call(self, elem.group);
                bChart.removeNodeFillOpacity.call(self, elem.group);
            }

            if (bChart.hasProperty(self._options, 'line') && bChart.existy(self._options.line.type[elem.group])) {
                bChart.removeLineType.call(self, elem.group);
                bChart.removeLineStrokeWidth.call(self, elem.group);
                bChart.removeLineStrokeOpacity.call(self, elem.group);
            }

            if (bChart.hasProperty(self._options, 'area') && bChart.existy(self._options.area.fillOpacity[elem.group])) {
                bChart.removeAreaFillOpacity.call(self, elem.group);
                bChart.removeAreaStrokeOpacity.call(self, elem.group);
                bChart.removeAreaStrokeWidth.call(self, elem.group);
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
                        return elem !== el.x;
                    });
                });
            }
            
            if (bChart.hasProperty(options, 'groups') && bChart.isArrayLike(options.groups)) {
                unloadGroup(options.groups);
            }
        }

    }

    if (!d3.select(self._options.selector).select('svg').empty()) {
        if (self.constructor === PieChart) {
            self.colors('refresh')._drawChartSVG();

            self.title('refresh').legend('refresh').tooltip('refresh');
        } else {
            if (self._options.secondAxis) {
                self.min2('refresh').max2('refresh').updateMin2();
            }
            self.min('refresh').max('refresh').updateMin().colors('refresh')._drawChartSVG().yAxis2('refresh').yLabel2('refresh').legend('refresh').tooltip('refresh');
        }

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