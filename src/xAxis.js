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
        outerSize = self._options.xAxis.outerTickSize
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