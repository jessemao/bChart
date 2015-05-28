/**
 * Created by CaptainMao on 5/23/15.
 */
bChart.prototype.area = function (options) {
    var self = this;
    if (!bChart.existy(options)) {
        return self._options.area;
    } else {
        if (bChart.typeString(options) && options === "refresh") {
            self._drawAreaSVG();
        } else {
            if (arguments.length === 2 && arguments[0].indexOf('.') >= 0 && arguments[0].indexOf('$') >= 0) {
                var groupIndex = parseInt(arguments[0].split('.')[1].split('$')[1]);
                var groupKey = self._options._uniqueGroupArrayAll[groupIndex - 1];
                arguments[0] = arguments[0].split('.')[0] + '.' + groupKey;
            }

            self.setOptions(arguments, 'area');
            self._drawAreaSVG();
        }
        return self;
    }


};

bChart.prototype._drawAreaSVG = function (options) {
    var self = this;
    var	_datasetTmp = self._options._dataset;
    var	groupConcat = self._options._uniqueGroupArrayAll;
    var chartSVG = d3.select(self._options.selector).select('g.bChart');

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
            _datasetTmp = self.stackDataset(_datasetTmp, groupConcat, self._options._uniqueXArray);

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

        areaPathSVG.exit().remove();

        areaPathSVG.enter().append('path');
        var area = d3.svg.area()
            .x(function (d) {
                return options.x0(d.x);
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
    }

    areaPathSVG.attr('class', function (d, i) {
        return 'bChart_groups bChart_groups' + groupConcat.indexOf(d[i].group);
    })
        .attr('fill', function (d, i) {
            return self._options._colorMap[d[i].group];
        })
        .attr('fill-opacity', function (d, i) {
            return self._options.area.fillOpacity[d[i].group];
        })
        .attr('stroke', function (d, i) {
            return self._options._colorMap[d[i].group];
        })
        .attr('stroke-width', function (d, i) {
            return self._options.area.strokeWidth[d[i].group];
        })
        .attr('stroke-opacity', function (d, i) {
            return self._options.area.strokeOpacity[d[i].group];
        })
        .style('opacity', 0.1)
        .transition()
        .duration(self._options.duration)
        .style('opacity', 1);

    return self;

};

bChart.initAreaStyle = function (property) {
    return function (group, value) {
        var self = this;
        self._options.area[property][group] = bChart.hasProperty(self._options.area[property], group)?self._options.area[property][group]: value;
    };
};

bChart.initAreaType = bChart.initAreaStyle('type');
bChart.initAreaFillOpacity = bChart.initAreaStyle('fillOpacity');
bChart.initAreaStrokeWidth = bChart.initAreaStyle('strokeWidth');
bChart.initAreaStrokeOpacity = bChart.initAreaStyle('strokeOpacity');

bChart.removeAreaProperty = function (property) {
    return function (group) {
        var self = this;
        if (bChart.hasProperty(self._options.area[property], group)) {
            delete self._options.area[property][group];
        }
    };
};

bChart.removeAreaType = bChart.removeAreaProperty('type');
bChart.removeAreaStrokeWidth = bChart.removeAreaProperty('strokeWidth');
bChart.removeAreaStrokeOpacity = bChart.removeAreaProperty('strokeOpacity');
bChart.removeAreaFillOpacity = bChart.removeAreaProperty('fillOpacity');