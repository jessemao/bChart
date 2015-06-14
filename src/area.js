/**
 * Created by CaptainMao on 5/23/15.
 */
bChart.prototype.area = function (options) {
    var self = this;

    if (!bChart.existy(options)) {
        return self._options.area;
    }

    self._setSpecificPropertiesByChart(options, 'area');
    return self;

};

bChart.prototype._drawAreaSVG = function (options) {
    var self = this;
    var	_datasetTmp = self._options._dataset;
    var	groupConcat = self._options._uniqueGroupTmp.length ? self._options._uniqueGroupTmp : self._options._uniqueGroupArrayAll;
    var _parentSVG;
    if (d3.select(self._options.selector).select('.bChart_wrapper').empty()) {
        _parentSVG = d3.select(self._options.selector).append('div')
            .attr('class', 'bChart_wrapper');
    } else {
        _parentSVG = d3.select(self._options.selector).select('.bChart_wrapper');
    }
    var chartSVG = _parentSVG.select('g.bChart');
    var areaSVG, areaPathSVG;
    var dataArea = [];

    if (chartSVG.select('.bChart_areas').empty()) {
        areaSVG = chartSVG.append('g')
            .attr('class', 'bChart_areas');
    } else {
        areaSVG = chartSVG.select('.bChart_areas');
    }

    if (bChart.existy(options)) {
        if (self._options.isStack) {
            _datasetTmp = self.stackDataset(_datasetTmp, self._options._uniqueGroupArrayAll, self._options._uniqueXArray);

        }
        var drawLineCallBack = function (elem) {
            var singleAreaArray = _datasetTmp.filter(function (el) {
                return self._options.isStack ? el[0].group === elem : el.group === elem;
            });
            if (self._options.isStack) {
                dataArea.push(singleAreaArray[0]);
            } else {
                dataArea.push(singleAreaArray);
            }
        };
        bChart.each(self._options._uniqueGroupArrayAll, drawLineCallBack);

        areaPathSVG = areaSVG.selectAll('.bChart_groups')
            .data(dataArea);

        areaPathSVG.enter().append('path');

        areaPathSVG.exit().remove();

        var area = d3.svg.area()
            .x(function (d) {

                return self._options.xAxis.isTimeSeries ? options.x0(new Date(d.x)): options.x0(d.x);
            })
            .y0(function (d) {
                if (self._options.isStack) {
                    return d.y0 < self._options.minDefault ? options.y(self._options.minDefault) : options.y(d.y0);
                } else {
                    return self._options._chartSVGHeight;
                }
            })
            .y1(function (d) {
                if (self._options.isStack) {
                    return options.y(parseFloat(d.y0) + parseFloat(d.y));
                } else {
                    return d._secondAxis? options.y2(d.value) : options.y(d.value);

                }
            });
        areaPathSVG.attr('d', area);
    } else {
        areaPathSVG = areaSVG.selectAll('.bChart_groups');
    }

    if (!areaPathSVG.empty()) {
        areaPathSVG.attr('class', function (d, i) {
                var groupIndex = groupConcat.indexOf(d[i].group);
                return 'bChart_groups bChart_groups_' + groupIndex;
            })
            .attr('fill', function (d, i) {
                return self._options._colorMap[d[i].group];
            })
            .attr('fill-opacity', function (d,i) {
                var groupIndex = groupConcat.indexOf(d[i].group);

                return self._options.area.fillOpacity[groupIndex];
            })
            .attr('stroke', function (d, i) {
                return self._options._colorMap[d[i].group];
            })
            .attr('stroke-width', function (d, i) {
                var groupIndex = groupConcat.indexOf(d[i].group);

                return self._options.area.strokeWidth[groupIndex];
            })
            .attr('stroke-opacity', function (d, i) {
                var groupIndex = groupConcat.indexOf(d[i].group);

                return self._options.area.strokeOpacity[groupIndex];
            })
            .style('opacity', 0.1)
            .transition()
            .duration(self._options.duration)
            .style('opacity', 1);
    }


    return self;

};

bChart.initAreaType = bChart.initStyleProperty('type', 'area');
bChart.initAreaFillOpacity = bChart.initStyleProperty('fillOpacity', 'area');
bChart.initAreaStrokeWidth = bChart.initStyleProperty('strokeWidth', 'area');
bChart.initAreaStrokeOpacity = bChart.initStyleProperty('strokeOpacity', 'area');

bChart.removeAreaType = bChart.removeStyleProperty('type', 'area');
bChart.removeAreaStrokeWidth = bChart.removeStyleProperty('strokeWidth', 'area');
bChart.removeAreaStrokeOpacity = bChart.removeStyleProperty('strokeOpacity', 'area');
bChart.removeAreaFillOpacity = bChart.removeStyleProperty('fillOpacity', 'area');