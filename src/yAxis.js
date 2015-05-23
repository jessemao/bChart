/**
 * Created by CaptainMao on 5/22/15.
 */
bChart.prototype.yAxis2 = function (options) {
    var self = this;
    if (!self._options.secondAxis) {
        var chartSVG = d3.select(self._options.selector).select('g.bChart');
        chartSVG.select('.bChart_y_axis_2').style('display', 'none');
        return self;
    }
    if (!bChart.existy(options)) {
        return self._options.yAxis2;

    } else {
        if (bChart.typeString(options) && options === 'refresh') {
            self.yAxis('yAxis2');

        } else {
            self.setOptions(arguments,'yAxis2');
            self.yAxis('yAxis2');
        }


        return self;
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
        var chartSVG = d3.select(self._options.selector).select('g.bChart');
        var axisType, yAxisSVG, yAxisSVGAPath, yAxisSVGLine, yAxisSVGText, minY, maxY;
        if (bChart.existy(drawSecAxis) && drawSecAxis) {
            axisType = 'yAxis2';
            yAxisSVG = chartSVG.select('.bChart_y_axis_2');
            yAxisSVGAPath = chartSVG.select('.bChart_y_axis_2').selectAll('path');
            yAxisSVGLine = chartSVG.select('.bChart_y_axis_2').selectAll('line');
            yAxisSVGText = chartSVG.select('.bChart_y_axis_2').selectAll('text');
            minY = self._options.minDefault2;
            maxY = self._options.maxDefault2;
        } else {
            axisType = 'yAxis';
            yAxisSVG = chartSVG.select('.bChart_y_axis');

            yAxisSVGAPath = chartSVG.select('.bChart_y_axis').selectAll('path');
            yAxisSVGLine = chartSVG.select('.bChart_y_axis').selectAll('line');
            yAxisSVGText = chartSVG.select('.bChart_y_axis').selectAll('text');
            minY = self._options.minDefault;
            maxY = self._options.maxDefault;
        }

        if (self._options[axisType].display) {

            var	y = d3.scale.linear()
                .range([self._options._chartSVGHeight, 0])
                .domain([minY, maxY]);

            var	yAxis = d3.svg.axis()
                .scale(y)
                .orient(self._options[axisType].orientation)
                .tickFormat(self._options[axisType].tickFormat)
                .ticks(self._options[axisType].tickNumber)
                .tickSize(self._options[axisType].tickSize, 0, 0);


            yAxisSVG
                .transition()
                .duration(self._options.duration)
                .ease("sin-in-out")
                .call(yAxis);

            yAxisSVG.style('display', 'block');

            yAxisSVGAPath.style('stroke-width', self._options[axisType].axisWidth)
                .style('stroke', self._options[axisType].axisColor)
                .style('display', 'block');
            yAxisSVGText.style('display', 'block');

            var rotateDxyAxis, rotateDyyAxis, textAnchor;
            switch(self._options[axisType].rotation) {
                case -45:
                    if (drawSecAxis) {
                        rotateDxyAxis = '.1em';
                        rotateDyyAxis = '-1em';
                        textAnchor = 'start';
                    } else {
                        rotateDxyAxis = '-.1em';
                        rotateDyyAxis = '-1em';
                        textAnchor = 'end';
                    }

                    break;
                case -90:
                    if (drawSecAxis) {
                        rotateDxyAxis = '0.5em';
                        rotateDyyAxis = '-.5em';
                        textAnchor = 'middle';
                    } else {
                        rotateDxyAxis = '0.5em';
                        rotateDyyAxis = '-.5em';
                        textAnchor = 'middle';
                    }

                    break;
                case 45:
                    if (drawSecAxis) {
                        rotateDxyAxis = '.1em';
                        rotateDyyAxis = '1em';
                        textAnchor = 'start';
                    } else {
                        rotateDxyAxis = '.1em';
                        rotateDyyAxis = '1em';
                        textAnchor = 'end';
                    }


                    break;
                case 90:
                    if (drawSecAxis) {
                        rotateDxyAxis = '0em';
                        rotateDyyAxis = '1em';
                        textAnchor = 'middle';
                    } else {
                        rotateDxyAxis = '0em';
                        rotateDyyAxis = '1em';
                        textAnchor = 'middle';
                    }

                    break;
                case 0:
                    if (drawSecAxis) {
                        rotateDxyAxis = '0em';
                        rotateDyyAxis = '0.3em';
                        textAnchor = 'start';
                    } else {
                        rotateDxyAxis = '0em';
                        rotateDyyAxis = '0.3em';
                        textAnchor = 'end';
                    }

                    break;
            }

            yAxisSVGText.style('text-anchor', textAnchor)
                .attr('dx', rotateDxyAxis)
                .attr('dy', rotateDyyAxis)
                .attr('transfrom', function (d) {
                    return 'rotate(' + self._options[axisType].rotation + ')';
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

        if (self._options[axisType].displayLine) {
            yAxisSVGLine.style('stroke-width', self._options[axisType].tickLineWidth)
                .style('stroke', self._options[axisType].tickLineColor)
                .style('display', 'block');
        } else {
            yAxisSVGLine.style('display', 'none');
        }


    }
};