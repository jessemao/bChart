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
    }
    return {
        x0: x0,
        x1: x1
    };
};

bChart.prototype._getXAxis = function (x) {
    var self = this;
    return d3.svg.axis()
        .scale(x)
        .orient(self._options.xAxis.orientation)
        .ticks(self._options.xAxis.tickNumber)
        .tickSize(self._options.xAxis.tickSize, 0, 0);
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
        var chartSVG = d3.select(self._options.selector).select('g.bChart');
        var xAxisSVGAPath = chartSVG.select('.bChart_x_axis').selectAll('path');
        var xAxisSVGLine = chartSVG.select('.bChart_x_axis').selectAll('line');
        var xAxisSVGText = chartSVG.select('.bChart_x_axis').selectAll('text');
        if (self._options.xAxis.display) {

            xAxisSVGAPath.style('stroke-width', self._options.xAxis.axisWidth)
                .style('stroke', self._options.xAxis.axisColor)
                .style('display', 'block');
            xAxisSVGText.style('display', 'block');
            var x0 = self._getComputedX().x0;
            var xAxis = self._getXAxis(x0);
            self._renderXAxis(xAxis);

            var rotateDxXAxis, rotateDyXAxis, textAnchor;
            switch(self._options.xAxis.rotation) {
                case -45:
                    rotateDxXAxis = '0';
                    rotateDyXAxis = '1em';
                    textAnchor = 'end';
                    break;
                case -90:
                    rotateDxXAxis = '-.5em';
                    rotateDyXAxis = '0';
                    textAnchor = 'end';
                    break;
                case 45:
                    rotateDxXAxis = '0em';
                    rotateDyXAxis = '1em';
                    textAnchor = 'start';
                    break;
                case 90:
                    rotateDxXAxis = '.5em';
                    rotateDyXAxis = '0';
                    textAnchor = 'start';
                    break;
                case 0:
                    rotateDxXAxis = '0';
                    rotateDyXAxis = '1em';
                    textAnchor = 'middle';
                    break;
            }

            xAxisSVGText.style('text-anchor', textAnchor)
                .attr('dx', rotateDxXAxis)
                .attr('dy', rotateDyXAxis)
                .attr('transfrom', function (d) {
                    return 'rotate(' + self._options.xAxis.rotation + ')';
                })
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


    }
};