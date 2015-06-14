/**
 * Created by CaptainMao on 5/22/15.
 */
var _defaultsPie = {

    width: 400,
    height: 400,
    textRadiusDefault: '',
    outerRadiusDefault: '',
    valueDisplay: {
        display: true

    },
    title: {
        "text": "Pie Chart",
    },

    tooltip: {
        "type": 0
    }
    //pie: {
    //    type: {},
    //    strokeWidth: {},
    //    strokeOpacity: {},
    //    fillOpacity: {}
    //}

};

var PieChart = function (options) {
    return bChart._customConstructor(this, options, arguments, 'pie');
};

bChart.PieChart = PieChart;

PieChart.prototype = Object.create(bChart.prototype);
PieChart.prototype.constructor = PieChart;

PieChart.prototype.draw = function () {
    var self = this;
    if (!bChart.getLength(d3.select(self._options.selector))) {
        console.log("Please make sure the element exists in your template.");
        return void 0;
    }

    self.colors('refresh')._drawChartSVG();

    self.background('refresh').title('refresh').legend('refresh').tooltip('refresh');


};


PieChart.prototype._drawPieChart = function () {
    var self = this;
    self._updateChartSize();

    var	_datasetTmp = self._options._dataset;
    var	groupConcat = self._options._uniqueGroupTmp.length? self._options._uniqueGroupTmp: self._options._uniqueGroupArrayAll;
    var _parentSVG;
    if (d3.select(self._options.selector).select('.bChart_wrapper').empty()) {
        _parentSVG = d3.select(self._options.selector).append('div')
            .attr('class', 'bChart_wrapper');
    } else {
        _parentSVG = d3.select(self._options.selector).select('.bChart_wrapper');
    }
    var chartSVG = _parentSVG.select('g.bChart');
    var pieSUM = d3.sum(_datasetTmp, function (d) {
        return parseFloat(d.value);
    });
    if (bChart.existy(self._options.outerRadius)) {
        self._options.outerRadiusDefault = self._options.outerRadius;
    } else {
        self._options.outerRadiusDefault = self._options._chartSVGWidth > self._options._chartSVGHeight ? self._options._chartSVGHeight /2 : self._options._chartSVGWidth / 2;
    }
    if (bChart.existy(self._options.textRadius)) {
        self._options.textRadiusDefault = self._options.textRadius;
    } else {
        self._options.textRadiusDefault = self._options.outerRadiusDefault / 2;
    }

    var arc = d3.svg.arc()
        .outerRadius(self._options.outerRadiusDefault)
        .startAngle(function (d) {
            return d.startAngle;
        })
        .endAngle(function (d) {
            return d.endAngle;
        });
    //var arc_init = d3.svg.arc()
    //    .outerRadius(1);

    var pie = d3.layout.pie()
        .value(function (d) {
            return d.value;
        })
        .sort(null);

    var pieSVG, arcSVG, pieDataset, textSVG;
    pieDataset = pie(_datasetTmp);

    if (chartSVG.select('.bChart_pie').empty()) {
        pieSVG = chartSVG.append('g')
            .attr('class', 'bChart_pie');
    } else {
        pieSVG = chartSVG.select('.bChart_pie');
    }
    pieSVG.attr('transform', 'translate(' + self._options._chartSVGWidth / 2 + ',' + self._options._chartSVGHeight/ 2 + ')');
    var arcTween = function (a) {
        var interpolate = d3.interpolate(this._current, a);
        this._current = interpolate(0);
        return function(t) {
            return arc(interpolate(t));
        };
    };
    arcSVG = pieSVG.selectAll('.bChart_arc')
        .data(pieDataset);

    arcSVG.exit()
        .remove();

    arcSVG.enter().append('path')
        .attr('class', function (d) {
            return 'bChart_arc bChart_groups bChart_groups_' + groupConcat.indexOf(d.data.group);
        })
        .attr('fill', function (d) {
            return self._options._colorMap[d.data.group];
        })
        .attr('stroke', '#ffffff')
        .each(function (d, i) {
            if (i > 0) {
                this._current = pieDataset[i-1];
            } else {
                this._current = {startAngle: 0, endAngle: 0};

            }
        })
        .transition()
        .duration(self._options.duration)
        .attr('d', arcTween);

    arcSVG
        .attr('class', function (d) {
            return 'bChart_arc bChart_groups bChart_groups_' + groupConcat.indexOf(d.data.group);
        })
        .attr('fill', function (d) {
            return self._options._colorMap[d.data.group];
        })
        .transition()
        .duration(self._options.duration)
        .attrTween("d", arcTween);


    textSVG = pieSVG.selectAll('.bChart_arc_text')
        .data(pieDataset);
    if (self._options.valueDisplay.display) {
        textSVG.style('display', 'block');

        textSVG.exit().remove();
        textSVG.enter().append('text')
            .attr('class', function (d) {
                return 'bChart_arc_text bChart_groups bChart_groups_' + groupConcat.indexOf(d.data.group);
            });

        textSVG
            .attr('class', function (d) {
                return 'bChart_arc_text bChart_groups bChart_groups_' + groupConcat.indexOf(d.data.group);
            })
            .attr('transform', function (d) {
                return 'translate(' + Math.cos((d.startAngle + d.endAngle - Math.PI) / 2) * self._options.textRadiusDefault + ',' + Math.sin((d.startAngle + d.endAngle - Math.PI) / 2) * self._options.textRadiusDefault + ')';
            })
            .attr('text-anchor', 'middle')
            .text(function (d) {
                return d3.format('%')(d.data.value / pieSUM);
            })
            .attr('fill', '#ffffff');
    } else {
        textSVG.style('display', 'none');
    }




    return self;

};
