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
        var parentSVG = d3.select(self._options.selector);
        if (self._options.tooltip.display) {
            if (parentSVG.select('.bChart_tooltip').empty()) {
                tooltipDIV = parentSVG.append('div')
                    .attr('class', 'bChart_tooltip')
                    .style('opacity', 0);
            } else {
                tooltipDIV = parentSVG.select('.bChart_tooltip')
                    .style('opacity', 0);
            }

            if (self._options.tooltip.type === 1) {
                drawGroupTooltip(parentSVG);
            } else {
                drawSingleTooltip(parentSVG);
            }

        } else {
            tooltipDIV.remove();
        }

        function drawGroupTooltip(parentSVG) {
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
            if (parentSVG.selectAll('.bchart-focus-x-line').empty()) {
                focus_x = parentSVG.select('.bChart').append('line')
                    .attr('class', 'bchart-focus-x-line');
            } else {
                focus_x = parentSVG.select('.bchart-focus-x-line');
            }

            focus_x.style('stroke', self._options.tooltip.xLine.stroke)
                .style('stroke-width', self._options.tooltip.xLine.strokeWidth)
                .style('opacity', 0)
                .attr('y1', 0)
                .attr('y2', self._options._chartSVGHeight);


            var focus_rect;
            if (parentSVG.selectAll('.bchart-focus-rect').empty()) {
                focus_rect = parentSVG.select('.bChart').append('rect')
                    .attr('class', 'bchart-focus-rect');
            } else {
                focus_rect = parentSVG.select('.bchart-focus-rect');
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
                tooltip_html += "<div class='bchart-tooltip-header'>"+ d.x +"</div>";
                for (var k = 0; k < self._options._uniqueGroupArrayAll.length; k++) {
                    var obj = self._options._uniqueGroupArrayAll[k];
                    tooltip_html += "<div class='bchart-tooltip-row'><div class='bchart-tooltip-group'>"+obj+"</div><div class='bchart-tooltip-value'>"+d[obj]+"</div></div>";
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

        function drawSingleTooltip(parentSVG) {
            var groupSVG = parentSVG.selectAll('.bChart_groups');
            parentSVG.select('.bchart-focus-rect').remove();
            parentSVG.select('.bchart-focus-x-line').remove();
            groupSVG.on('mouseover', function (d) {
                d3.select(this).style('opacity', 0.7);
                tooltipDIV.transition()
                    .duration(self._options.duration)
                    .style('opacity', 1)
                    .style('display', 'block');
            })
                .on('mousemove', function (d) {
                    var tooltip_html;
                    if (self.constructor === PieChart) {
                        tooltip_html = d.data.group + " : " + d.value;
                    } else {
                        tooltip_html = d.group + '(' + d.x + ') :' + d.value;

                    }
                    var selectedColor = d3.select(this).style('fill');
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
                });
            if (!parentSVG.select('.bChart_lines').empty()) {
                var groupLineSVG = parentSVG.select('.bChart_lines').selectAll('.bChart_groups');
                groupLineSVG.on('mouseover', null)
                    .on('mousemove', null)
                    .on('mouseout', null);
            }

            if (!parentSVG.select('.bChart_areas').empty()) {
                var groupAreaSVG = parentSVG.select('.bChart_areas').selectAll('.bChart_groups');
                groupAreaSVG.on('mouseover', null)
                    .on('mousemove', null)
                    .on('mouseout', null);
            }

            if (!parentSVG.select('.bChart_pie').empty()) {
                var groupPieTextSVG = parentSVG.select('.bChart_pie').selectAll('.bChart_arc_text');
                groupPieTextSVG.on('mouseover', null)
                    .on('mousemove', null)
                    .on('mouseout', null);
            }
        }
    }
};