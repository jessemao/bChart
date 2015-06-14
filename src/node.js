/**
 * Created by CaptainMao on 5/22/15.
 */
bChart.prototype.node = function (options) {
    var self = this;
    if (!bChart.existy(options)) {
        return self._options.node;
    }

    self._setSpecificPropertiesByChart(options, 'node');
    return self;

};

bChart.prototype._drawNodeSVG = function (options) {
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

    var nodeSVG, nodePathSVG;
    if (chartSVG.select('.bChart_nodes').empty()) {
        nodeSVG = chartSVG.append('g')
            .attr('class', 'bChart_nodes');
    } else {
        nodeSVG = chartSVG.select('.bChart_nodes');
    }

    var nodeGenerator = d3.svg.symbol()
        .type(function (d) {
            var groupIndex = groupConcat.indexOf(d.group);

            return self._options.node.type[groupIndex];
        }).size(function (d) {
            var groupIndex = groupConcat.indexOf(d.group);

            return bChart.existy(d.size) ? d.size : self._options.node.size[groupIndex];
        });

    if (bChart.existy(options)) {
        nodePathSVG = nodeSVG.selectAll('.bChart_groups')
            .data(_datasetTmp);

        nodePathSVG.enter().append('path');

        nodePathSVG.exit().remove();

        nodePathSVG.attr('class', function(d) {
                return 'bChart_groups bChart_groups_' + groupConcat.indexOf(d.group);
            })
            .attr('d', nodeGenerator)
            .attr('transform', function (d) {
                var translateX;
                if (self._options.xAxis.isTimeSeries) {
                    translateX = options.x0(new Date(d.x));
                } else {
                    translateX = options.x0(d.x);
                }
                return d._secondAxis? "translate(" + translateX + "," + options.y2(d.value) + ")": "translate(" + translateX + "," + options.y(d.value) + ")";
            })
            .style('opacity', 0)
            .transition()
            .duration(self._options.duration)
            .style('opacity', 1);
    } else {
        nodePathSVG = nodeSVG.selectAll('.bChart_groups');
    }

    if (!nodePathSVG.empty()) {
        nodePathSVG.attr('fill', function (d) {
                var groupIndex = groupConcat.indexOf(d.group);

                if (self._options.node.solidCircle[groupIndex]) {
                    return self._options.background.color;
                } else {
                    var nodeFill = self._options._colorMap[d.group];
                    var colorElem = nodeFill.split(',');
                    return colorElem[0] + ',' + colorElem[1] + ',' + colorElem[2] + ',' + self._options.node.fillOpacity[groupIndex] + ')';
                }
            })
            .attr('stroke', function (d) {
                return self._options._colorMap[d.group];
            })
            .attr('stroke-width', function (d) {
                var groupIndex = groupConcat.indexOf(d.group);

                return self._options.node.strokeWidth[groupIndex];
            })
            .attr('d', nodeGenerator)
            .style('display', function (d) {
                var groupIndex = groupConcat.indexOf(d.group);
                return self._options.node.display[groupIndex] ? 'block': 'none';
            });
    }

    return self;

};

bChart.initNodeDisplay = bChart.initStyleProperty('display', 'node');
bChart.initNodeType = bChart.initStyleProperty('type', 'node');
bChart.initNodeSize = bChart.initStyleProperty('size', 'node');
bChart.initNodeFillOpacity = bChart.initStyleProperty('fillOpacity', 'node');
bChart.initNodeStrokeWidth = bChart.initStyleProperty('strokeWidth', 'node');
bChart.initNodeStrokeOpacity = bChart.initStyleProperty('strokeOpacity', 'node');
bChart.initNodeSolidCircle = bChart.initStyleProperty('solidCircle', 'node');

bChart.removeNodeDisplay = bChart.removeStyleProperty('display', 'node');
bChart.removeNodeType = bChart.removeStyleProperty('type', 'node');
bChart.removeNodeSize = bChart.removeStyleProperty('size', 'node');
bChart.removeNodeFillOpacity = bChart.removeStyleProperty('fillOpacity', 'node');
bChart.removeNodeStrokeWidth = bChart.removeStyleProperty('strokeWidth', 'node');
bChart.removeNodeStrokeOpacity = bChart.removeStyleProperty('strokeOpacity', 'node');
bChart.removeNodeSolidCircle = bChart.removeStyleProperty('solidCircle', 'node');