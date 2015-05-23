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