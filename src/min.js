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
    //self._options.minDefault <= 0 ? 0: self._options.minDefault;
    return self;
};

bChart.prototype.updateMin = function () {
    var self = this;
    if (!bChart.existy(self._options.max) && !bChart.existy(self._options.min)) {
        self._options.minDefault -= (self._options.maxDefault - self._options.minDefault) / self._options.yAxis.tickNumber;
    }
    return self;
};