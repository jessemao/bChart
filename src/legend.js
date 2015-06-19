/**
 * Created by CaptainMao on 5/22/15.
 */
bChart.prototype.legend = function (options) {
    var self = this;
    if (!bChart.existy(options)) {
        return self._options.legend;
    } else {
        if (bChart.typeString(options) && options === 'refresh') {
            drawLegend();
        } else {
            self.setOptions(arguments, 'legend');
            drawLegend();
        }
        return self;
    }

    function drawLegend () {
        var _checkedLegend = [];
        var chartSVG = d3.select(self._options.selector).select('g.bChart');

        if (self._options.legend.display) {
            if (!chartSVG.selectAll('.bChart_legend').empty()) {
                chartSVG.selectAll('.bChart_legend').remove();
            }
            var legendRectX, legendRectY, legendTextX, legendTextY, legendTextAnchor, layoutStyle;

            var groupConcat = self._options._uniqueGroupArrayAll;
            var legendSVG = chartSVG.selectAll('.bChart_legend')
                .data(groupConcat)
                .enter().append('g')
                .attr('class', 'bChart_legend');

            switch (self._options.legend.position) {
                case 'topright':
                    if (self._options.legend.textFirst) {
                        legendRectX = self._options._chartSVGWidth + self._options.padding.right + self._options.legend.offsetAdjust.horizontal - 20;
                        legendRectY = -60 - self._options.legend.offsetAdjust.vertical;
                        legendTextX = self._options._chartSVGWidth + self._options.padding.right + self._options.legend.offsetAdjust.horizontal - 20- self._options.legend.offsetAdjust.textToSymbol;
                        legendTextY = -56 - self._options.legend.offsetAdjust.vertical;
                        legendTextAnchor = 'end';
                    } else {
                        legendTextX = self._options._chartSVGWidth + self._options.padding.right + self._options.legend.offsetAdjust.horizontal - 50;
                        legendTextY = -56 - self._options.legend.offsetAdjust.vertical;
                        legendRectX = self._options._chartSVGWidth + self._options.padding.right + self._options.legend.offsetAdjust.horizontal - 60 - self._options.legend.offsetAdjust.textToSymbol;
                        legendRectY = -60 - self._options.legend.offsetAdjust.vertical;
                        legendTextAnchor = 'start';
                    }
                    layoutStyle = 1;

                    break;
                case 'right':
                    if (self._options.legend.textFirst) {
                        legendRectX = self._options._chartSVGWidth + self._options.padding.right + self._options.legend.offsetAdjust.horizontal - 20;
                        legendRectY = self._options._chartSVGHeight / 2 - self._options.legend.offsetAdjust.vertical - 60;
                        legendTextX = self._options._chartSVGWidth + self._options.padding.right + self._options.legend.offsetAdjust.horizontal - 20 - self._options.legend.offsetAdjust.textToSymbol;
                        legendTextY = self._options._chartSVGHeight / 2 - self._options.legend.offsetAdjust.vertical - 56;
                        legendTextAnchor = 'end';
                    } else {
                        legendTextX = self._options._chartSVGWidth + self._options.padding.right + self._options.legend.offsetAdjust.horizontal - 50;
                        legendTextY = self._options._chartSVGHeight / 2 - self._options.legend.offsetAdjust.vertical - 56;
                        legendRectX = self._options._chartSVGWidth + self._options.padding.right + self._options.legend.offsetAdjust.horizontal - 60 - self._options.legend.offsetAdjust.textToSymbol;
                        legendRectY = self._options._chartSVGHeight / 2 - self._options.legend.offsetAdjust.vertical - 60;
                        legendTextAnchor = 'start';
                    }
                    layoutStyle = 1;

                    break;
                case 'bottomright':
                    if (self._options.legend.textFirst) {
                        legendRectX = self._options._chartSVGWidth + self._options.padding.right + self._options.legend.offsetAdjust.horizontal - 20;
                        legendRectY = self._options._chartSVGHeight + 15 - self._options.legend.offsetAdjust.vertical - 60;
                        legendTextX = self._options._chartSVGWidth + self._options.padding.right + self._options.legend.offsetAdjust.horizontal - 20 - self._options.legend.offsetAdjust.textToSymbol;
                        legendTextY = self._options._chartSVGHeight + 15 - self._options.legend.offsetAdjust.vertical - 56;
                        legendTextAnchor = 'end';
                    } else {
                        legendTextX = self._options._chartSVGWidth + self._options.padding.right + self._options.legend.offsetAdjust.horizontal - 50;
                        legendTextY = self._options._chartSVGHeight + 15 - self._options.legend.offsetAdjust.vertical - 56;
                        legendRectX = self._options._chartSVGWidth + self._options.padding.right + self._options.legend.offsetAdjust.horizontal - 60 - self._options.legend.offsetAdjust.textToSymbol;
                        legendRectY = self._options._chartSVGHeight + 15 - self._options.legend.offsetAdjust.vertical - 60;
                        legendTextAnchor = 'start';
                    }
                    layoutStyle = 1;

                    break;
                case 'top':
                    if (self._options.legend.textFirst) {
                        legendRectX = self._options.legend.offsetAdjust.horizontal;
                        legendRectY = -30 + self._options.legend.offsetAdjust.vertical;
                        legendTextX = self._options.legend.offsetAdjust.horizontal - self._options.legend.offsetAdjust.textToSymbol;
                        legendTextY = -25 + self._options.legend.offsetAdjust.vertical;
                        legendTextAnchor = 'end';
                    } else {
                        legendTextX = self._options.legend.offsetAdjust.horizontal;
                        legendTextY = -25 + self._options.legend.offsetAdjust.vertical;
                        legendRectX = self._options.legend.offsetAdjust.horizontal - self._options.legend.offsetAdjust.textToSymbol - 10;
                        legendRectY = -30 + self._options.legend.offsetAdjust.vertical;
                        legendTextAnchor = 'start';
                    }
                    layoutStyle = 0;

                    break;
                case 'bottom':
                    if (self._options.legend.textFirst) {
                        legendRectX = self._options.legend.offsetAdjust.horizontal;
                        legendRectY = self._options.legend.offsetAdjust.vertical + self._options._chartSVGHeight + 45;
                        legendTextX = self._options.legend.offsetAdjust.horizontal - self._options.legend.offsetAdjust.textToSymbol;
                        legendTextY = self._options.legend.offsetAdjust.vertical + self._options._chartSVGHeight + 50;
                        legendTextAnchor = 'end';
                    } else {
                        legendTextX = self._options.legend.offsetAdjust.horizontal;
                        legendTextY = self._options.legend.offsetAdjust.vertical + self._options._chartSVGHeight + 50;
                        legendRectX = self._options.legend.offsetAdjust.horizontal - self._options.legend.offsetAdjust.textToSymbol - 10;
                        legendRectY = self._options.legend.offsetAdjust.vertical + self._options._chartSVGHeight + 45;
                        legendTextAnchor = 'start';
                    }
                    layoutStyle = 0;
                    break;
            }

            legendSVG.attr('transform', function (d, i) {
                    if (layoutStyle === 1) {
                        return 'translate(0, ' + (i * self._options.legend.offsetAdjust.between) + ')';

                    } else {
                        var startX = (self._options._chartSVGWidth - self._options._uniqueGroupArrayAll.length * 60) / 2;
                        return 'translate('+ (i * (self._options.legend.offsetAdjust.between + 50) + startX) + ',0)';
                    }

                })
                .append('text')
                .attr('x', legendTextX)
                .attr('y', legendTextY)
                .attr('dy', '.35em')
                .style('font-family', self._options.legend.fontType)
                .style('text-decoration', function () {
                    return self._options.legend.fontUnderline? "underline" : "none";
                })
                .style('font-weight', function () {
                    return self._options.legend.fontBold ? "bold":"normal";
                })
                .style('font-style', function () {
                    return self._options.legend.fontItalic? "italic" : "normal";
                })
                .style('text-anchor', legendTextAnchor)
                .style('font-size', self._options.legend.fontSize)
                .style('fill', self._options.legend.fontColor)
                .text(function (d) {
                    return d;
                });


            legendSVG.append('rect')
                .attr('x', legendRectX)
                .attr('y', legendRectY)
                .attr('width', self._options.legend.symbolSize)
                .attr('height', self._options.legend.symbolSize)
                .style('fill', function (d) {
                    return self._options._colorMap[d];
                });

            legendSVG.on('mouseover', function(d) {
                    chartSVG.selectAll('.bChart_legend').classed('unhover',true);
                    chartSVG.selectAll('.bChart_groups').classed('unhover',true);
                    d3.select(this).classed('unhover',false);

                    var groupConcat = self._options._uniqueGroupTmp.length? self._options._uniqueGroupTmp : self._options._uniqueGroupArrayAll;

                    var matchingBarIndex = groupConcat.indexOf(d);
                    var matchingClass = '.bChart_groups_' + matchingBarIndex;
                    chartSVG.selectAll(matchingClass)
                        .classed('unhover', false);


                })
                .on('mouseout', function (d) {
                    chartSVG.selectAll('.bChart_legend').classed('unhover',false);
                    chartSVG.selectAll('.bChart_groups').classed('unhover',false);


                })
                .on('click', function(d){
                    var allLegend = chartSVG.selectAll('.bChart_legend');

                    if (!_checkedLegend.length) {
                        allLegend.classed('inactive', true);
                        self._options._datasetTmp = self._options._dataset;

                        self._options._uniqueGroupTmp = self._options._uniqueGroupArrayAll;

                    }


                    if (!bChart.isElementInArray(d, _checkedLegend)) {
                        _checkedLegend.push(d);
                        d3.select(this).classed('inactive', false)
                            .classed('active', true);
                    } else {
                        _checkedLegend.splice(bChart.getIndexOfElement(d, _checkedLegend), 1);
                        d3.select(this).classed('inactive', true)
                            .classed('active', false);
                    }

                    self._options._uniqueGroupArrayAll = _checkedLegend;

                    self._options._uniqueGroupArrayAll.sort(function (a, b) {
                        return bChart.getIndexOfElement(a, self._options._uniqueGroupTmp) - bChart.getIndexOfElement(b, self._options._uniqueGroupTmp);
                    });

                    if (bChart.existy(self._options._secondAxis)) {
                        self._options._secondAxis = bChart.isOverlapArray(self._options._uniqueGroupArray2, _checkedLegend) || (!_checkedLegend.length && self._options._uniqueGroupArray2.length);
                    }

                    if (!_checkedLegend.length || _checkedLegend.length === self._options._uniqueGroupTmp.length) {
                        allLegend.classed('inactive', false)
                            .classed('active', false)
                            .classed('unhover', false);

                        self._options._uniqueGroupArrayAll = self._options._uniqueGroupTmp;

                    }

                    self._updateDatasetBySelection(_checkedLegend);
                    if (_checkedLegend.length === self._options._uniqueGroupTmp.length) {
                        _checkedLegend = [];
                    }
                });
        } else {
            chartSVG.select('.legend').style('display','none');
        }
    }
};

bChart.prototype._updateDatasetBySelection = function (selections) {
    var self = this;
    var displayDataset = [];

    if (!selections.length) {
        displayDataset = self._options._datasetTmp;
        self._options._datasetTmp = [];
        self._options._uniqueGroupTmp = [];

    } else {
        displayDataset = self._options._datasetTmp.filter(function (el, idx) {
            return selections.indexOf(el.group) >= 0;
        });
    }
    if (self.constructor === PieChart) {
        self.setOptions([displayDataset], '_dataset')._drawChartSVG().title('refresh').tooltip('refresh');
    } else {

        self.setOptions([displayDataset], '_dataset');

        self.min('refresh').max('refresh').updateMin();
        if (self._options._secondAxis) {
            self.min2('refresh').max2('refresh').updateMin2();
        }

        self._drawChartSVG();

        self.background('refresh').xLabel('refresh').yLabel('refresh').xAxis('refresh').yAxis('refresh').title('refresh').tooltip('refresh');
        self.yLabel2('refresh').yAxis2('refresh');
    }

};