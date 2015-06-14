/**
 * Created by CaptainMao on 5/23/15.
 */
bChart.prototype.line = function (options) {
    var self = this;
    if (!bChart.existy(options)) {
        return self._options.line;
    }

    self._setSpecificPropertiesByChart(options, 'line');

    return self;
};

bChart.prototype._drawLineSVG = function (options) {
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

    var lineSVG, linePathSVG;
    var dataLine = [];


    if (chartSVG.select('.bChart_lines').empty()) {
        lineSVG = chartSVG.append('g')
            .attr('class', 'bChart_lines');
    } else {
        lineSVG = chartSVG.select('.bChart_lines');
    }

    if (bChart.existy(options)) {
        var drawLineCallBack = function (elem) {
            var singleLineArray = _datasetTmp.filter(function (el) {
                return el.group === elem;
            });
            dataLine.push(singleLineArray);
        };
        bChart.each(self._options._uniqueGroupArrayAll, drawLineCallBack);

        linePathSVG = lineSVG.selectAll('.bChart_groups')
            .data(dataLine);
        linePathSVG.enter().append('path');

        linePathSVG.exit().remove();

        var line = d3.svg.line()
            .x(function (d) {
                return self._options.xAxis.isTimeSeries ? options.x0(new Date(d.x)): options.x0(d.x);
            })
            .y(function (d) {
                return d._secondAxis? options.y2(d.value): options.y(d.value);
            });
        linePathSVG.attr('d', line);
    } else {
        linePathSVG = lineSVG.selectAll('.bChart_groups');
    }

    if (!linePathSVG.empty()) {
        linePathSVG.attr('class', function (d, i) {
                return 'bChart_groups bChart_groups_' + groupConcat.indexOf(d[i].group);
            })
            .attr('fill-opacity', function () {
                return 0;
            })
            .attr('stroke', function (d, i) {
                return self._options._colorMap[d[i].group];
            })
            .attr('stroke-width', function (d, i) {
                return self._options.line.strokeWidth[groupConcat.indexOf(d[i].group)];
            })

            .style('opacity', 0.1)
            .transition()

            .duration(self._options.duration)
            .style('opacity', function (d, i) {
                return self._options.line.strokeOpacity[groupConcat.indexOf(d[i].group)];
            });
    }

    return self;

};

bChart.initLineType = bChart.initStyleProperty('type', 'line');
bChart.initLineStrokeWidth = bChart.initStyleProperty('strokeWidth', 'line');
bChart.initLineStrokeOpacity = bChart.initStyleProperty('strokeOpacity', 'line');

bChart.removeLineType = bChart.removeStyleProperty('type', 'line');
bChart.removeLineStrokeWidth = bChart.removeStyleProperty('strokeWidth', 'line');
bChart.removeLineStrokeOpacity = bChart.removeStyleProperty('strokeOpacity', 'line');