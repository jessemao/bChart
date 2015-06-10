/**
 * Created by CaptainMao on 5/31/15.
 */
bChart.prototype._drawStackBarSVG = function (options) {
    var self = this;
    var	_datasetTmp = self._options._dataset;
    var	groupTmp = self._options._uniqueGroupTmp.length ? self._options._uniqueGroupTmp : self._options._uniqueGroupArrayAll;
    var chartSVG = d3.select(self._options.selector).select('g.bChart');

    var barParentSVG;
    if (chartSVG.select('.bChart_bar_parent').empty()) {
        barParentSVG = chartSVG.append('g')
            .attr('class', 'bChart_bar_parent');
    } else {
        barParentSVG = chartSVG.select('.bChart_bar_parent');
    }

    var stackBarArray = self.stackDataset(_datasetTmp, self._options._uniqueGroupArrayAll, self._options._uniqueXArray);
    var stackBarSVG = barParentSVG.selectAll('.bChart_Bars')
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
            if (!bChart.existy(this._current)) {
                this._current = {};
            }
            this._current.x = bChart.existy(this._current.x)? this._current.x : options.x0(d.x) + self._options.barDistance/2;
            return this._current.x;
        })
        .attr('y', function (d) {
            return bChart.existy(this._current.y) ? this._current.y : self._options._chartSVGHeight;
        })
        .attr('height', function (d) {
            return bChart.existy(this._current.height) ? this._current.height : 0;
        })
        .style('fill', function (d) {
            return self._options._colorMap[d.group];
        })
        .style('stroke', function(d, i) {
            return self._options._colorMap[d.group];
        })
        .style('stroke-width', 0)
        .transition()
        .duration(self._options.duration)
        .attr('x', function (d) {
            this._current.x = options.x0(d.x) + self._options.barDistance/2;
            return this._current.x;
        })
        .attr('y', function (d) {
            this._current.y = options.y(d.y0 + d.y);
            return this._current.y;
        })
        .attr('height', function (d, i) {
            var heightTmp;
            if(d.group === self._options._uniqueGroupArrayAll[0]) {
                heightTmp = self._options._chartSVGHeight - options.y(d.y + d.y0);
            } else {
                heightTmp = options.y(d.y0) - options.y(d.y + d.y0);

            }
            this._current.height = heightTmp;
            return heightTmp;
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

    var barParentSVG;
    if (chartSVG.select('.bChart_bar_parent').empty()) {
        barParentSVG = chartSVG.append('g')
            .attr('class', 'bChart_bar_parent');
    } else {
        barParentSVG = chartSVG.select('.bChart_bar_parent');
    }

    var groupBarSVG = barParentSVG.selectAll('.bChart_Bars')
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
            if (!bChart.existy(this._current)) {
                this._current = {};
            }
            this._current.group = bChart.existy(this._current.group)? this._current.group: d.group;
            this._current.value = bChart.existy(this._current.value)? this._current.value: d.value;
            this._current._secondAxis = bChart.existy(this._current._secondAxis) ? this._current._secondAxis : d._secondAxis;
            this._current.x = bChart.existy(this._current.x) ? this._current.x : options.x0(d.x) + options.x1(d.group) + self._options.barDistance/2;
            return this._current.x;
        })
        .attr('y', function () {
            return bChart.existy(this._current.y) ? this._current.y : self._options._chartSVGHeight;
        })
        .attr('height', function () {
            return bChart.existy(this._current.height) ? this._current.height : 0;
        })
        .style('fill', function (d, i) {
            return self._options._colorMap[this._current.group];
        })
        .style('stroke', function(d, i) {
            return self._options._colorMap[this._current.group];
        })
        .style('stroke-width', 0)
        .transition()
        .duration(self._options.duration)
        .attr('x', function (d) {
            this._current.x = options.x0(d.x) + options.x1(this._current.group) + self._options.barDistance/2;
            return this._current.x;
        })
        .attr('y', function (d) {
            this._current.y = this._current._secondAxis? options.y2(this._current.value) : options.y(this._current.value);
            return this._current.y;

        })
        .attr('height', function (d) {
            this._current.height = this._current._secondAxis? self._options._chartSVGHeight - options.y2(this._current.value) : self._options._chartSVGHeight - options.y(this._current.value);
            return this._current.height;
        });
};