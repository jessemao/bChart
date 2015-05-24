/**
 * Created by CaptainMao on 5/23/15.
 */
bChart.prototype.line = function (options) {
    var self = this;
    if (!bChart.existy(options)) {
        return self._options.line;
    } else {
        if (bChart.typeString(options) && options === "refresh") {
            self._drawLineSVG();
        } else {
            if (arguments.length === 2 && arguments[0].indexOf('.') >= 0 && arguments[0].indexOf('$') >= 0) {
                var groupIndex = parseInt(arguments[0].split('.')[1].split('$')[1]);
                var groupKey = self._options._uniqueGroupArrayAll[groupIndex - 1];
                arguments[0] = arguments[0].split('.')[0] + '.' + groupKey;
            }

            self.setOptions(arguments, 'line');
            self._drawLineSVG();
        }
        return self;
    }


};

bChart.prototype._drawLineSVG = function (options) {
    var self = this;
    var	_datasetTmp = self._options._dataset;
    var	groupConcat = self._options._uniqueGroupArrayAll;
    var chartSVG = d3.select(self._options.selector).select('g.bChart');

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

        linePathSVG.exit().remove();

        linePathSVG.enter().append('path');
        var line = d3.svg.line()
            .x(function (d) {
                return options.x0(d.x);
            })
            .y(function (d) {
                return d.secondAxis? options.y2(d.value): options.y(d.value);
            });
        linePathSVG.attr('d', line);
    }

    linePathSVG.attr('class', function (d, i) {
            return 'bChart_groups bChart_groups' + groupConcat.indexOf(d[i].group);
        })
        .attr('fill-opacity', function () {
            return 0;
        })
        .attr('stroke', function (d, i) {
            return self._options._colorMap[d[i].group];
        })
        .attr('stroke-width', function (d, i) {
            return self._options.line.width[d[i].group];
        })
        .attr('stroke-opacity', function (d, i) {
            return self._options.line.opacity[d[i].group];
        })
        .style('opacity', 0.1)
        .transition()

        .duration(self._options.duration)
        .style('opacity', 1);

    return self;

};

bChart.initLineStyle = function (property) {
    return function (group, value) {
        var self = this;
        self._options.line[property][group] = bChart.hasProperty(self._options.line[property], group)?self._options.line[property][group]: value;
    };
};

bChart.initLineType = bChart.initLineStyle('type');
bChart.initLineStrokeWidth = bChart.initLineStyle('width');
bChart.initLineStrokeOpacity = bChart.initLineStyle('opacity');

bChart.removeLineProperty = function (property) {
    return function (group) {
        var self = this;
        if (bChart.hasProperty(self._options.line[property], group)) {
            delete self._options.line[property][group];
        }
    };
};

bChart.removeLineType = bChart.removeLineProperty('type');
bChart.removeLineStrokeWidth = bChart.removeLineProperty('width');
bChart.removeLineStrokeOpacity = bChart.removeLineProperty('opacity');