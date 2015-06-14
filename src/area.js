/**
 * Created by CaptainMao on 5/23/15.
 */
bChart.prototype.area = function (options) {
    var self = this;
    var args;

    var parseArguments = function (args) {
        if (args.length === 2) {
            if (args[0].indexOf('.') >= 0 && args[0].indexOf('$') >= 0) {
                var groupIndex = parseInt(args[0].split('.')[1].split('$')[1]);
                args[0] = args[0].split('.')[0] + '.' + groupIndex;
            } else {
                args[0] = args[0] + '.' + 'all';
            }

        }
        return args;
    }
    if (!bChart.existy(options)) {
        return self._options.area;
    } else {
        if (bChart.typeString(options)) {
            if (options === "refresh") {
                self._drawAreaSVG();

            } else {
                args = parseArguments(arguments);

                setTimeout(function () {
                    self.setOptions(args, 'area');
                    self._drawAreaSVG();

                }, 1);
            }
        } else {
            bChart.each(options, function (value, key, obj) {
                var newArgs = [key, value];
                delete obj[key];
                var newKey = parseArguments(newArgs);
                obj[newKey[0]] = value;

            });
            setTimeout(function () {
                self.setOptions(options, 'area');
                self._drawAreaSVG();

            }, 1);

        }
        return self;
    }


};

bChart.prototype._drawAreaSVG = function (options) {
    var self = this;
    var	_datasetTmp = self._options._dataset;
    var	groupConcat = self._options._uniqueGroupTmp.length ? self._options._uniqueGroupTmp : self._options._uniqueGroupArrayAll;
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

bChart.initAreaStyle = function (property) {
    return function (groupIndex, value) {
        var self = this;
        self._options.area[property][groupIndex] = bChart.existy(self._options.area[property][groupIndex])?self._options.area[property][groupIndex]: value;
    };
};

bChart.initAreaType = bChart.initAreaStyle('type');
bChart.initAreaFillOpacity = bChart.initAreaStyle('fillOpacity');
bChart.initAreaStrokeWidth = bChart.initAreaStyle('strokeWidth');
bChart.initAreaStrokeOpacity = bChart.initAreaStyle('strokeOpacity');

bChart.removeAreaProperty = function (property) {
    return function (groupIndex) {
        var self = this;
        if (bChart.existy(self._options.area[property][groupIndex])) {
            delete self._options.area[property][groupIndex];
        }
    };
};

bChart.removeAreaType = bChart.removeAreaProperty('type');
bChart.removeAreaStrokeWidth = bChart.removeAreaProperty('strokeWidth');
bChart.removeAreaStrokeOpacity = bChart.removeAreaProperty('strokeOpacity');
bChart.removeAreaFillOpacity = bChart.removeAreaProperty('fillOpacity');