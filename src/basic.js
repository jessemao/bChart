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
        self._options.padding.right = 150;
    } else {
        self._options.padding.right = 90;
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

