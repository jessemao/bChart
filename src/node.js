/**
 * Created by CaptainMao on 5/22/15.
 */
bChart.prototype.node = function (options) {
    var self = this;
    if (!bChart.existy(options)) {
        return self._options.node;
    } else {
        if (bChart.typeString(options) && options === "refresh") {
            self._drawNodeSVG();
        } else {
            if (arguments.length === 2 && arguments[0].indexOf('.') >= 0 && arguments[0].indexOf('$') >= 0) {
                var groupIndex = parseInt(arguments[0].split('.')[1].split('$')[1]);
                var groupKey = self._options._uniqueGroupArrayAll[groupIndex - 1];
                arguments[0] = arguments[0].split('.')[0] + '.' + groupKey;
            }
            self.setOptions(arguments, 'node');
            self._drawNodeSVG();
        }
        return self;
    }

};

bChart.prototype._drawNodeSVG = function (options) {
    var self = this;
    var	_datasetTmp = self._options._dataset;
    var	groupConcat = self._options._uniqueGroupArrayAll;
    var chartSVG = d3.select(self._options.selector).select('g.bChart');

    var nodeSVG, nodePathSVG;
    if (chartSVG.select('.bChart_nodes').empty()) {
        nodeSVG = chartSVG.append('g')
            .attr('class', 'bChart_nodes');
    } else {
        nodeSVG = chartSVG.select('.bChart_nodes');
    }

    var nodeGenerator = d3.svg.symbol()
        .type(function (d) {
            return self._options.node.type[d.group];
        }).size(function (d) {
            return bChart.existy(d.size) ? d.size : self._options.node.size[d.group];
        });

    if (bChart.existy(options)) {
        nodePathSVG = nodeSVG.selectAll('.bChart_groups')
            .data(_datasetTmp);


        nodePathSVG.exit().remove();

        nodePathSVG.enter().append('path');

        nodePathSVG.attr('class', function(d) {
                return 'bChart_groups bChart_groups' + groupConcat.indexOf(d.group);
            })
            .attr('d', nodeGenerator)
            .attr('transform', function (d) {
                return d.secondAxis? "translate(" + options.x0(d.x) + "," + options.y2(d.value) + ")": "translate(" + options.x0(d.x) + "," + options.y(d.value) + ")";
            })
            .style('opacity', 0)
            .transition()
            .duration(self._options.duration)
            .style('opacity', 1);
    } else {
        nodePathSVG = nodeSVG.selectAll('.bChart_groups');
        if (self._options.node.display) {
            nodePathSVG.style('display', 'block');
            nodePathSVG.attr('fill', function (d) {
                    var nodeFill = self._options._colorMap[d.group];
                    var colorElem = nodeFill.split(',');
                    return colorElem[0] + ',' + colorElem[1] + ',' + colorElem[2] + ',' + self._options.node.fillOpacity[d.group] + ')';
                })
                .attr('stroke-width', function (d) {
                    return self._options.node.strokeWidth[d.group];
                })
                .attr('d', nodeGenerator);
        } else {
            nodePathSVG.style('display', 'none');
        }
    }

    return self;

};

bChart.initNodeStyle = function (property) {
    return function (group, value) {
        var self = this;
        self._options.node[property][group] = bChart.hasProperty(self._options.node[property], group)?self._options.node[property][group]: value;
    };
};

bChart.initNodeType = bChart.initNodeStyle('type');
bChart.initNodeSize = bChart.initNodeStyle('size');
bChart.initNodeFillOpacity = bChart.initNodeStyle('fillOpacity');
bChart.initNodeStrokeWidth = bChart.initNodeStyle('strokeWidth');
bChart.initNodeStrokeOpacity = bChart.initNodeStyle('strokeOpacity');

bChart.removeNodeProperty = function (property) {
    return function (group) {
        var self = this;
        if (bChart.hasProperty(self._options.node[property], group)) {
            delete self._options.node[property][group];
        }
    };
};

bChart.removeNodeType = bChart.removeNodeProperty('type');
bChart.removeNodeSize = bChart.removeNodeProperty('size');
bChart.removeNodeFillOpacity = bChart.removeNodeProperty('fillOpacity');
bChart.removeNodeStrokeWidth = bChart.removeNodeProperty('strokeWidth');
bChart.removeNodeStrokeOpacity = bChart.removeNodeProperty('strokeOpacity');