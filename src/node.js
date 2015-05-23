/**
 * Created by CaptainMao on 5/22/15.
 */
bChart.prototype.node = function (options) {
    var self = this;
    if (!bChart.existy(options)) {
        return self._options.node;
    } else {
        if (bChart.typeString(options) && options === "refresh") {
            drawNode();
        } else {
            self.setOptions(arguments, 'node');
            drawNode();
        }
        return self;
    }

    function drawNode() {
        var chartSVG = d3.select(self._options.selector).select('g.bChart');
        var nodeSVG;
        if (chartSVG.selectAll('.bChart_nodes').empty()) {
            nodeSVG = chartSVG.append('g').attr('class', 'bChart_nodes')
                .append('path').attr('class', 'bChart_groups');
        } else {
            nodeSVG = chartSVG.selectAll('.bChart_groups');
        }
        if (self._options.node.display) {
            nodeSVG.style('display', 'block');

            var nodeGenerator = d3.svg.symbol()
                .type(function (d) {
                    return self._options.node.type[d.group];
                }).size(function (d) {
                    return self._options.node.size[d.group];
                });

            nodeSVG.attr('fill', function (d) {
                    var nodeFill = self._options._colorMap[d.group];
                    var colorElem = nodeFill.split(',');
                    return colorElem[0] + ',' + colorElem[1] + ',' + colorElem[2] + ',' + self._options.node.fillOpacity[d.group] + ')';
                })
                .attr('stroke-width', function (d) {
                    return self._options.node.strokeWidth[d.group];
                })
                .attr('d', nodeGenerator);
        } else {
            nodeSVG.style('display', 'none');
        }

    }
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