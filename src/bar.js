/**
 * Created by CaptainMao on 5/31/15.
 */
bChart.prototype._drawStackBarSVG = function (options) {
    var self = this;
    var	_datasetTmp = self._options._dataset;
    var	groupTmp = self._options._uniqueGroupTmp.length ? self._options._uniqueGroupTmp : self._options._uniqueGroupArrayAll;
    var chartSVG = d3.select(self._options.selector).select('g.bChart');

    var stackBarArray = self.stackDataset(_datasetTmp, self._options._uniqueGroupArrayAll, self._options._uniqueXArray);
    var stackBarSVG = chartSVG.selectAll('.bChart_Bars')
        .data(stackBarArray);

    stackBarSVG.enter().append('g')
        .attr('class', function (d,i) {
            return 'bChart_Bars';

        });
    stackBarSVG.exit().remove();

    var barRects = stackBarSVG.selectAll('rect')
        .data(function (d) {
            return d;
        });

    barRects.enter().append('rect')
        .attr('class', function (d) {
            return 'bChart_groups bChart_groups' + groupTmp.indexOf(d.group);
        });

    barRects
        .attr('class', function (d) {
            return 'bChart_groups bChart_groups' + groupTmp.indexOf(d.group);
        })
        .attr('width', options.x0.rangeBand() - self._options.barDistance)
        .attr('x', function (d) {
            return options.x0(d.x) + self._options.barDistance/2;
        })
        .attr('y', self._options._chartSVGHeight)
        .attr('height', 0)
        .style('fill', function (d) {
            return self._options._colorMap[d.group];
        })
        .style('stroke', function(d, i) {
            return self._options._colorMap[d.group];
        })
        .style('stroke-width', 0)
        .transition()
        .duration(self._options.duration)
        .attr('y', function (d) {
            return options.y(d.y0 + d.y);
        })
        .attr('height', function (d, i) {
            if(d.group === self._options._uniqueGroupArrayAll[0]) {
                return self._options._chartSVGHeight - options.y(d.y + d.y0);
            } else {
                return options.y(d.y0) - options.y(d.y + d.y0);

            }
        });

    barRects.exit().remove();

};

bChart.prototype._drawGroupBarSVG = function (options) {
    var self = this;
    var	_datasetTmp = self._options._dataset;
    var	groupConcat = self._options._uniqueGroupTmp.length ? self._options._uniqueGroupTmp : self._options._uniqueGroupArrayAll;
    var chartSVG = d3.select(self._options.selector).select('g.bChart');

    var groupBarArray = [];
    bChart.each(self._options._uniqueXArray, function (value, key) {
        var groupBarValue = _datasetTmp.filter(function (el) {
            return el.x === value;
        });

        groupBarArray.push({x: value, data: groupBarValue});
    });

    var groupBarSVG = chartSVG.selectAll('.bChart_Bars')
        .data(groupBarArray);

    groupBarSVG.enter().append('g')
        .attr('class', function (d, i) {
            return 'bChart_Bars';
        });

    groupBarSVG.exit().remove();


    var barRects = groupBarSVG.selectAll('rect')
        .data(function (d) {
            return d.data;
        });

    barRects.exit().transition().attr('height', 0).remove();
    barRects.enter().append('rect')
        .attr('class', function (d) {
            return 'bChart_groups bChart_groups' + groupConcat.indexOf(d.group);
        });

    barRects
        .attr('class', function (d) {
            return 'bChart_groups bChart_groups' + groupConcat.indexOf(d.group);
        })
        .attr('width', options.x1.rangeBand() - self._options.barDistance)
        .attr('x', function (d, i) {
            return options.x0(d.x) + options.x1(d.group) + self._options.barDistance/2;
        })
        .attr('y', self._options._chartSVGHeight)
        .attr('height', 0)
        .style('fill', function (d, i) {
            return self._options._colorMap[d.group];
        })
        .style('stroke', function(d, i) {
            return self._options._colorMap[d.group];
        })
        .style('stroke-width', 0)
        .transition()
        .duration(self._options.duration)
        .attr('y', function (d) {
            return d._secondAxis? options.y2(d.value) : options.y(d.value);

        })
        .attr('height', function (d) {
            return d._secondAxis? self._options._chartSVGHeight - options.y2(d.value) : self._options._chartSVGHeight - options.y(d.value);
        });
};