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
            var legendRectX, legendRectY, legendTextX, legendTextY, legendTextAnchor;

            var groupConcat = self._options._uniqueGroupArrayAll;
            var legendSVG = chartSVG.selectAll('.bChart_legend')
                .data(groupConcat)
                .enter().append('g')
                .attr('class', 'bChart_legend');

            switch (self._options.legend.position) {
                case 'topright':
                    legendRectX = self._options._chartSVGWidth + self._options.padding.right + self._options.legend.offsetAdjust.horizontal - 20;
                    legendRectY = -60 - self._options.legend.offsetAdjust.vertical;
                    legendTextX = self._options._chartSVGWidth + self._options.padding.right + self._options.legend.offsetAdjust.horizontal - 20- self._options.legend.offsetText;
                    legendTextY = -56 - self._options.legend.offsetAdjust.vertical;
                    legendTextAnchor = 'end';

                    break;
                case 'right':
                    legendRectX = self._options._chartSVGWidth + self._options.padding.right + self._options.legend.offsetAdjust.horizontal - 20;
                    legendRectY = self._options._chartSVGHeight / 2 - self._options.legend.offsetAdjust.vertical - 60;
                    legendTextX = self._options._chartSVGWidth + self._options.padding.right + self._options.legend.offsetAdjust.horizontal - 20 - self._options.legend.offsetText;
                    legendTextY = self._options._chartSVGHeight / 2 - self._options.legend.offsetAdjust.vertical - 56;
                    legendTextAnchor = 'end';
                    break;
                case 'bottomright':
                    legendRectX = self._options._chartSVGWidth + self._options.padding.right + self._options.legend.offsetAdjust.horizontal - 20;
                    legendRectY = self._options._chartSVGHeight + 15 - self._options.legend.offsetAdjust.vertical - 60;
                    legendTextX = self._options._chartSVGWidth + self._options.padding.right + self._options.legend.offsetAdjust.horizontal - 20 - self._options.legend.offsetText;
                    legendTextY = self._options._chartSVGHeight + 15 - self._options.legend.offsetAdjust.vertical - 56;
                    legendTextAnchor = 'end';
            }

            legendSVG.attr('transform', function (d, i) {
                return 'translate(0, ' + (i * self._options.legend.offsetSymbol) + ')';
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
                .style('fill', function (d, i) {
                    return self._options._colorMap[d];
                });

            legendSVG.on('mouseover', function(d) {
                chartSVG.selectAll('.bChart_legend').classed('unhover',true);
                chartSVG.selectAll('.bChart_groups').classed('unhover',true);
                d3.select(this).classed('unhover',false);

                var groupConcat = self._options._uniqueGroupArrayAll;

                var matchingBarIndex = groupConcat.indexOf(d);
                var matchingClass = '.bChart_groups' + matchingBarIndex;
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
        self.setOptions([displayDataset], '_dataset')._drawChartSVG();

        self.title('refresh').tooltip('refresh');
    } else {
        self.setOptions([displayDataset], '_dataset').min('refresh').max('refresh').updateMin()._drawChartSVG().yLabel2('refresh').yAxis2('refresh').tooltip('refresh');
    }

};