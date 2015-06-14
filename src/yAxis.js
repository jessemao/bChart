/**
 * Created by CaptainMao on 5/22/15.
 */

bChart.prototype._getComputedY = function () {
    var self = this;
    var y1, y2;
    y1 = d3.scale.linear()
        .range([self._options._chartSVGHeight, 0])
        .domain([self._options.minDefault, self._options.maxDefault]);
    if (self._options._secondAxis) {
        y2 = d3.scale.linear()
            .range([self._options._chartSVGHeight, 0])
            .domain([self._options.minDefault2, self._options.maxDefault2]);
    }

    return {
        y1 : y1,
        y2: y2
    };
};

bChart.prototype._getYAxis = function (y, isSecond) {
    var self = this;
    var yAxisType = "";
    if (bChart.existy(isSecond) && isSecond) {
        yAxisType = 'yAxis2';
    } else {
        yAxisType = 'yAxis';
    }
    return d3.svg.axis()
        .scale(y)
        .orient(self._options[yAxisType].orientation)
        .tickFormat(self._options[yAxisType].tickFormat)
        .tickPadding(self._options[yAxisType].offsetAdjust + 3)
        .ticks(self._options[yAxisType].tickNumber)
        .tickSize(self._options[yAxisType].tickSize, 0, 0);

};

bChart.prototype._renderYAxis = function (yAxis, isSecond) {
    var self = this;
    var chartSVG = d3.select(self._options.selector).select('g.bChart');
    if (bChart.existy(isSecond) && isSecond) {
        if (chartSVG.select('.bChart_y_axis_2').empty()) {
            chartSVG.append('g')
                .attr('class', 'bChart_y_axis_2 bChart_grid')
                .attr('transform', 'translate(' + self._options._chartSVGWidth + ',0)')
                .call(yAxis);
        } else {
            chartSVG.select('.bChart_y_axis_2')
                .attr('transform', 'translate(' + self._options._chartSVGWidth + ',0)')
                .transition()
                .duration(self._options.duration)
                .ease("sin-in-out")
                .call(yAxis);
        }
        if (!chartSVG.select('.bChart_y_axis_2').select('text').empty()) {
            self._updateYAxisStyle(isSecond);
        }
    } else {
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
        if (!chartSVG.select('.bChart_y_axis').select('text').empty()) {
            self._updateYAxisStyle();
        }
    }
    return self;

};

bChart.prototype.yAxis2 = function (options) {
    var self = this;



    if (!bChart.existy(options)) {
        return self._options.yAxis2;

    } else {
        if (bChart.typeString(options) && options === 'refresh') {
            self.yAxis('yAxis2');

        } else {
            self.setOptions(arguments,'yAxis2');
            if (!self._options._secondAxis) {
                var chartSVG = d3.select(self._options.selector).select('g.bChart');
                chartSVG.select('.bChart_y_axis_2').style('display', 'none');
            } else {
                self.yAxis('yAxis2');
            }
        }

        return self;
    }
};

bChart.prototype._updateYAxisStyle = function (drawSecAxis) {
    var self = this;
    var chartSVG = d3.select(self._options.selector).select('g.bChart');
    var axisType, yAxisSVG, yAxisSVGAPath, yAxisSVGLine, yAxisSVGText;
    if (bChart.existy(drawSecAxis) && drawSecAxis) {
        axisType = 'yAxis2';
        yAxisSVG = chartSVG.select('.bChart_y_axis_2');
        yAxisSVGAPath = chartSVG.select('.bChart_y_axis_2').selectAll('path');
        yAxisSVGLine = chartSVG.select('.bChart_y_axis_2').selectAll('line');
        yAxisSVGText = chartSVG.select('.bChart_y_axis_2').selectAll('text');
    } else {
        axisType = 'yAxis';
        yAxisSVG = chartSVG.select('.bChart_y_axis');
        yAxisSVGAPath = chartSVG.select('.bChart_y_axis').selectAll('path');
        yAxisSVGLine = chartSVG.select('.bChart_y_axis').selectAll('line');
        yAxisSVGText = chartSVG.select('.bChart_y_axis').selectAll('text');
    }

    if (self._options[axisType].display) {

        yAxisSVG.style('display', 'block');

        yAxisSVGAPath.style('stroke-width', self._options[axisType].axisWidth)
            .style('stroke', self._options[axisType].axisColor)
            .style('display', 'block');
        yAxisSVGText.style('display', 'block');

        var textAnchor;
        switch(self._options[axisType].rotation) {
            case -45:
                if (drawSecAxis) {
                    textAnchor = 'start';
                } else {
                    textAnchor = 'end';
                }

                break;
            case -90:
                if (drawSecAxis) {
                    textAnchor = 'middle';
                } else {
                    textAnchor = 'middle';
                }

                break;
            case 45:
                if (drawSecAxis) {
                    textAnchor = 'start';
                } else {
                    textAnchor = 'end';
                }


                break;
            case 90:
                if (drawSecAxis) {
                    textAnchor = 'middle';
                } else {
                    textAnchor = 'middle';
                }

                break;
            case 0:
                if (drawSecAxis) {
                    textAnchor = 'start';
                } else {
                    textAnchor = 'end';
                }

                break;
        }

        var xText = (+yAxisSVGText.attr('x')),
            yText = 0;

        yAxisSVGText.style('text-anchor', textAnchor)
            .attr('transform', function () {
                return 'rotate(' + self._options[axisType].rotation + ' ' + xText +','+yText+ ')';
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

    if (self._options[axisType].displayTicksLine) {
        yAxisSVGLine.style('stroke-width', self._options[axisType].tickLineWidth)
            .style('stroke', self._options[axisType].tickLineColor)
            .style('display', 'block');
    } else {
        yAxisSVGLine.style('display', 'none');
    }
};

bChart.prototype.yAxis = function (options) {
    var self = this;
    if (!bChart.existy(options)) {
        return self._options.yAxis;
    } else {
        if (bChart.typeString(options) && options === 'refresh') {
            drawYAxis();

        } else if (options === 'yAxis2') {
            drawYAxis(true);
        } else {
            self.setOptions(arguments, 'yAxis');
            drawYAxis();
        }
        return self;

    }

    function drawYAxis (drawSecAxis) {
        var yTmp = self._getComputedY();
        var y, yAxis;
        if (bChart.existy(drawSecAxis) && drawSecAxis) {
            y = yTmp.y2;
            yAxis = self._getYAxis(y, true);
            self._renderYAxis(yAxis, true);
        } else {
            y = yTmp.y1;
            yAxis = self._getYAxis(y, false);
            self._renderYAxis(yAxis, false);
        }
    }
};