/**
 * Created by CaptainMao on 5/22/15.
 */
bChart.prototype.tooltip = function (options) {
    var self = this;

    if (!bChart.existy(options)) {
        return self._options.tooltip;

    } else {
        if (bChart.typeString(options) && options === 'refresh') {
            drawTooltip();
        } else {
            self.setOptions(arguments, 'tooltip');
            drawTooltip();

        }

        return self;
    }

    function drawTooltip () {
        var tooltipDIV;
        if (self._options.tooltip.display) {
            var _parentSVG;
            if (d3.select(self._options.selector).select('.bChart_wrapper').empty()) {
                _parentSVG = d3.select(self._options.selector).append('div')
                    .attr('class', 'bChart_wrapper');
            } else {
                _parentSVG = d3.select(self._options.selector).select('.bChart_wrapper');
            }
            if (_parentSVG.select('.bChart_tooltip').empty()) {
                tooltipDIV = _parentSVG.append('div')
                    .attr('class', 'bChart_tooltip')
                    .style('opacity', 0);
            } else {
                tooltipDIV = _parentSVG.select('.bChart_tooltip')
                    .style('opacity', 0);
            }

            if (self._options.tooltip.type === 1) {
                drawGroupTooltip(_parentSVG);
            } else {
                drawSingleTooltip(_parentSVG);
            }

        } else {
            tooltipDIV.remove();
        }

        var parseSingleCustomTooltip = function (tooltipHTML, d, group) {
            var regExpress = /\#([^#]+)\#/g;
            var matches = tooltipHTML.match(regExpress),
                parsedString = tooltipHTML;
            for (var i = 0; i < matches.length; i++) {
                var obj = matches[i];
                var matchValue = obj.substring(1, obj.length - 1).toLowerCase(),
                    value;
                switch (matchValue) {
                    case "group":
                        if (bChart.existy(group)) {
                            value = group;
                        } else {
                            value = d.group;
                        }
                        break;
                    case "x":
                        value = d.x;
                        break;
                    case "value":
                        if (bChart.existy(group)) {
                            value = d[group];
                        } else {
                            value = d.value;
                        }
                        break;
                }
                parsedString = parsedString.replace(obj, value);
            }
            return parsedString;
        };

        var parseGroupCustomTooltip = function (tooltipHTML, d) {
            var regExpress = /\{\{([^{}]+)\}\}/g;
            var matches = tooltipHTML.match(regExpress);
            var parsedHTML = tooltipHTML;
            var parsedSingleHTML = "";
            for (var i = 0; i < matches.length; i++) {
                var obj = matches[i];
                var matchValue = obj.split(':');
                var objHTML = "";

                if (matchValue[0].indexOf('group')>=0) {
                    if (!self._options.tooltip.groupHTML) {
                        self._options.tooltip._groupHTML = matchValue[1].slice(0, -2);
                        objHTML = obj;
                    } else {
                        self._options.tooltip._groupHTML = self._options.tooltip.groupHTML;
                        objHTML = self._options.tooltip._groupHTML;
                        parsedHTML = parsedHTML.replace(obj, objHTML);
                    }
                    for (var j = 0; j < self._options._uniqueGroupArrayAll.length; j++) {
                        var obj1 = self._options._uniqueGroupArrayAll[j];
                        parsedSingleHTML = parseSingleCustomTooltip(self._options.tooltip._groupHTML, d, obj1);
                        parsedHTML = parsedHTML.replace(objHTML, parsedSingleHTML);
                        if (j < self._options._uniqueGroupArrayAll.length - 1) {
                            parsedHTML += objHTML;
                        }
                    }
                } else if (matchValue[0].indexOf('x')>= 0){

                    if (!self._options.tooltip.xHTML) {
                        self._options.tooltip._xHTML = matchValue[1].slice(0, -2);
                        objHTML = obj;
                    } else {
                        self._options.tooltip._xHTML = self._options.tooltip.xHTML;
                        objHTML = self._options.tooltip._xHTML;
                        parsedHTML = parsedHTML.replace(obj, objHTML);
                    }
                    parsedSingleHTML = parseSingleCustomTooltip(self._options.tooltip._xHTML, d);
                    parsedHTML = parsedHTML.replace(objHTML, parsedSingleHTML);
                }
            }
            return parsedHTML;
        };

        function drawGroupTooltip(_parentSVG) {
            var bisectData = d3.bisector(function (d) {
                return self._options.xAxis.isTimeSeries ? new Date(d.x) : d.x;
            }).left;

            var dataByX = [];
            bChart.each(self._options._uniqueXArray, function (obj) {
                var dataTmp = {};
                bChart.each(self._options._dataset, function (data) {
                    if (data.x === obj) {
                        dataTmp.x = obj;
                        dataTmp[data.group] = data.value;
                    }
                });
                dataByX.push(dataTmp);
            });

            var focus_x;
            if (_parentSVG.selectAll('.bchart-focus-x-line').empty()) {
                focus_x = _parentSVG.select('.bChart').append('line')
                    .attr('class', 'bchart-focus-x-line');
            } else {
                focus_x = _parentSVG.select('.bchart-focus-x-line');
            }

            focus_x.style('stroke', self._options.tooltip.xLine.stroke)
                .style('stroke-width', self._options.tooltip.xLine.strokeWidth)
                .style('opacity', 0)
                .attr('y1', 0)
                .attr('y2', self._options._chartSVGHeight);


            var focus_rect;
            if (_parentSVG.selectAll('.bchart-focus-rect').empty()) {
                focus_rect = _parentSVG.select('.bChart').append('rect')
                    .attr('class', 'bchart-focus-rect');
            } else {
                focus_rect = _parentSVG.select('.bchart-focus-rect');
            }

            focus_rect.attr('width', self._options._chartSVGWidth)
                .attr('height', self._options._chartSVGHeight)
                .style('fill', 'none')
                .attr('pointer-events', 'all')
                .on('mouseover', function () {
                    tooltipDIV.transition()
                        .duration(self._options.duration)
                        .style('opacity', 1)
                        .style('display', 'block');
                    focus_x.transition()
                        .duration(self._options.duration)
                        .style('opacity', 1);
                })
                .on('mousemove', mousemove)
                .on('mouseout', function () {
                    tooltipDIV.transition()
                        .duration(self._options.duration)
                        .style('opacity', 0)
                        .style('display', 'none');
                    focus_x.transition()
                        .duration(self._options.duration)
                        .style('opacity', 0);
                });

            function mousemove() {
                var xOptions = self._getComputedX();
                var d = {}, offx;
                if (bChart.existy(xOptions.x0.invert)) {
                    var x0 = xOptions.x0.invert(d3.mouse(this)[0]),
                        i = bisectData(dataByX, x0, 1),
                        d0 = dataByX[i - 1],
                        d1 = dataByX[i];
                    if (!bChart.existy(d1)) {
                        d = d0;
                    } else {
                        if (bChart.existy(d0.x) && bChart.existy(d1.x)) {
                            if (self._options.xAxis.isTimeSeries) {
                                d = x0.getTime() - (new Date(d0.x)).getTime() > (new Date(d1.x)).getTime() - x0.getTime() ? d1: d0;

                            } else {
                                d = x0 - d0.x > d1.x - x0 ? d1: d0;

                            }
                        }
                    }
                    offx = self._options.xAxis.isTimeSeries? xOptions.x0(new Date(d.x)):xOptions.x0(d.x);
                    offx += 80;
                } else {
                    var xPos = d3.mouse(this)[0];
                    var leftEdge = xOptions.x0.range();
                    var rangeWidth = xOptions.x0.rangeBand() === 0 ? ( leftEdge[1] - leftEdge[0] ) / 2 : xOptions.x0.rangeBand();
                    var j;
                    for (j = 0; xPos > (leftEdge[j] + rangeWidth); j++) {
                    }

                    if (j >= leftEdge.length) {
                        j = leftEdge.length - 1;
                    }
                    d = dataByX[j];
                    offx = xOptions.x0.rangeBand() === 0 ? leftEdge[j] + 80 : leftEdge[j] + rangeWidth / 2 + 80;
                }
                var tooltip_html = "";

                if (bChart.existy(self._options.tooltip.html) && self._options.tooltip.html) {
                    tooltip_html = self._options.tooltip.html;
                    tooltip_html = parseGroupCustomTooltip(tooltip_html, d);
                } else {
                    tooltip_html += "<div class='bchart-tooltip-header'>"+ d.x +"</div>";
                    for (var k = 0; k < self._options._uniqueGroupArrayAll.length; k++) {
                        var obj = self._options._uniqueGroupArrayAll[k];
                        tooltip_html += "<div class='bchart-tooltip-row'><div class='bchart-tooltip-group'>"+obj+"</div><div class='bchart-tooltip-value'>"+d[obj]+"</div></div>";
                    }
                }

                var offy = d3.event.hasOwnProperty('offsetY') ? d3.event.offsetY : d3.event.layerY;
                focus_x.attr('x2', 0)
                    .attr('transform', 'translate(' + (offx - 80) + ',0)');

                tooltipDIV
                    .style('background', self._options.tooltip.background)
                    .style('top', (offy+10) + 'px')
                    .style('left', (offx) + 'px')
                    .style('font-family', self._options.tooltip.fontType)
                    .style('text-decoration', function () {
                        return self._options.tooltip.fontUnderline ? 'underline' : 'none';
                    })
                    .style('font-weight', function () {
                        return self._options.tooltip.fontBold? 'bold': 'normal';
                    })
                    .style('font-style', function () {
                        return self._options.tooltip.fontItalic ? 'italic' : 'normal';
                    })
                    .style('font-size', self._options.tooltip.fontSize)
                    .style('color', self._options.tooltip.fontColor)
                    .html(tooltip_html);

                tooltipDIV.selectAll('.bchart-tooltip-group')
                    .style('background', function (d, i) {
                        return self._options._colorMap[self._options._uniqueGroupArrayAll[i]];
                    });
                tooltipDIV.selectAll('.bchart-tooltip-value')
                    .style('background', function (d, i) {
                        return self._options._colorMap[self._options._uniqueGroupArrayAll[i]];
                    });

            }
        }



        function drawSingleTooltip(_parentSVG) {
            var groupSVG = _parentSVG.selectAll('.bChart_groups');
            _parentSVG.select('.bchart-focus-rect').remove();
            _parentSVG.select('.bchart-focus-x-line').remove();
            groupSVG.on('mouseover', function (d) {
                    d3.select(this).style('opacity', 0.7);
                    tooltipDIV.transition()
                        .duration(self._options.duration)
                        .style('opacity', 1)
                        .style('display', 'block');

                    if (self.constructor === PieChart && self._options.isPullOut) {
                        self.pullOutSegement(this);
                    }

                })
                .on('mousemove', function (d) {
                    var tooltip_html;
                    if (self.constructor === PieChart) {
                        tooltip_html = d.data.group + " : " + d.value;
                    } else {
                        tooltip_html = d.group + '(' + d.x + ') :' + d.value;

                    }
                    var selectedColor;
                    if (self.constructor === PieChart) {
                        selectedColor = d3.select(this).select('.bChart_arc').style('fill');
                    } else {
                        selectedColor = d3.select(this).style('fill');
                    }

                    var offx = d3.event.hasOwnProperty('offsetX') ? d3.event.offsetX : d3.event.layerX;
                    var offy = d3.event.hasOwnProperty('offsetY') ? d3.event.offsetY : d3.event.layerY;
                    tooltipDIV.style('background', selectedColor)
                        .style('top', (offy-10) + 'px')
                        .style('left', (offx + 10) + 'px')
                        .style('font-family', self._options.tooltip.fontType)
                        .style('text-decoration', function () {
                            return self._options.tooltip.fontUnderline ? 'underline' : 'none';
                        })
                        .style('font-weight', function () {
                            return self._options.tooltip.fontBold? 'bold': 'normal';
                        })
                        .style('font-style', function () {
                            return self._options.tooltip.fontItalic ? 'italic' : 'normal';
                        })
                        .style('font-size', self._options.tooltip.fontSize)
                        .style('color', self._options.tooltip.fontColor)
                        .html(tooltip_html);

                })
                .on('mouseout', function (d) {
                    d3.select(this).style('opacity', 1);
                    tooltipDIV.transition()
                        .duration(self._options.duration)
                        .style('opacity', 0)
                        .style('display', 'none');
                    if (self.constructor === PieChart && self._options.isPullOut) {
                        self.restoreOutSegement(this);
                    }
                });
            if (!_parentSVG.select('.bChart_lines').empty()) {
                var groupLineSVG = _parentSVG.select('.bChart_lines').selectAll('.bChart_groups');
                groupLineSVG.on('mouseover', null)
                    .on('mousemove', null)
                    .on('mouseout', null);
            }

            if (!_parentSVG.select('.bChart_areas').empty()) {
                var groupAreaSVG = _parentSVG.select('.bChart_areas').selectAll('.bChart_groups');
                groupAreaSVG.on('mouseover', null)
                    .on('mousemove', null)
                    .on('mouseout', null);
            }
        }
    }
};