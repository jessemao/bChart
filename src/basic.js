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
            self._updateChartSize()._drawChartSVG().xAxis('refresh').xLabel('refresh');
        } else if (bChart.typeString(options) && options === 'refresh') {
            self._updateChartSize()._drawChartSVG().xAxis('refresh').xLabel('refresh');
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
            self._updateChartSize()._drawChartSVG().yAxis('refresh').yAxis2('refresh').yLabel('refresh').yLabel2('refresh');
        } else if (bChart.typeString(options) && options === 'refresh') {
            self._updateChartSize()._drawChartSVG().yAxis('refresh').yAxis2('refresh').yLabel('refresh').yLabel2('refresh');
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

    var chartSVG = d3.select(self._options.selector).select('g.bChart');
    var x0, y, y2, yAxis, yAxis2, xAxis;
    if (!self._options.xAxis.isTimeSeries) {
        x0 = d3.scale.ordinal()
            .rangePoints([0, self._options._chartSVGWidth],0.1)
            .domain(self._options._uniqueXArray);
    }

    // set default tickSize;
    self._options.xAxis.tickSize = -self._options._chartSVGHeight;
    self._options.yAxis.tickSize = -self._options._chartSVGWidth;

    xAxis = d3.svg.axis()
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

    y = d3.scale.linear()
        .range([self._options._chartSVGHeight, 0])
        .domain([self._options.minDefault, self._options.maxDefault]);

    yAxis = d3.svg.axis()
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

    if (self._options._secondAxis) {
        y2 = d3.scale.linear()
            .range([self._options._chartSVGHeight, 0])
            .domain([self._options.minDefault2, self._options.maxDefault2]);
        yAxis2 = d3.svg.axis()
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

    return {
        x0: x0,
        y: y,
        y2: y2
    };
};