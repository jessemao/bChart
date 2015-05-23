/**
 * Created by CaptainMao on 5/22/15.
 */
var _defaultsScatter = {
    selector: "",
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"],
    colorOpacity: 1,
    duration: 400,
    padding: {
        "top": 80,
        "right": 90,
        "bottom": 50,
        "left": 60
    },
    _colorMap: {},
    _datasetTmp: [],
    _uniqueGroupTmp: [],
    _uniqueXArray: [],
    _uniqueGroupArrayAll: [],
    _uniqueGroupArray2: [],
    _dataset: [

    ],
    minDefault: -1,
    maxDefault: -1,
    minDefault2: -1,
    maxDefault2: -1,
    width: 800,
    height: 350,
    background: {
        "imageURL": "",
        "color": "#ffffff",
        "displayImage": false,
        "opacity": 1
    },
    // border: {
    // 	"opacity": 1,
    // 	"color": {
    // 		"top": "#666",
    // 		"bottom": "#666",
    // 		"left": "#666",
    // 		"right": "#666"
    // 	},
    // 	"width": {
    // 		"top": 1,
    // 		"bottom": 1,
    // 		"left": 1,
    // 		"right": 1
    // 	},
    // 	"style": {
    // 		"top": "solid",
    // 		"bottom": "solid",
    // 		"left": "solid",
    // 		"right": "solid"
    // 	},
    // 	"radius": {
    // 		"topleft": 8,
    // 		"topright": 8,
    // 		"bottomleft": 8,
    // 		"bottomright": 8
    // 	},
    // 	"boxShadow": {
    // 		"display": false,
    // 		"vShadow": 0,
    // 		"hShadow": 0,
    // 		"blur": 0,
    // 		"spread": 0,
    // 		"color": "#000"
    // 	}
    // },
    secondAxis: false,
    legend: {
        "position": "topright",
        "offsetText": 5,
        "offsetSymbol": 15,
        "symbolSize": 10,
        "multipleLine": false,
        "textFirst": true,
        "display": true,
        "fontType": "helvetica",
        "fontSize": 12,
        "fontBold": false,
        "fontItalic": false,
        "fontUnderline": false,
        "fontColor": "#000000",
        "offsetAdjust": {
            "horizontal": 0,
            "vertical": 0
        }
    },

    title: {
        "display": true,
        "text": "Bar Chart",
        "fontType": "helvetica",
        "fontSize": 18,
        "fontBold": false,
        "fontItalic": false,
        "fontUnderline": false,
        "fontColor": "#000000",
        "offsetAdjust": {
            "horizontal": 0,
            "vertical": 0
        }
    },
    xLabel: {
        "display": true,
        "text": "x label",
        "rotation": 0,
        "fontType": "helvetica",
        "fontSize": 14,
        "fontBold": false,
        "fontItalic": false,
        "fontUnderline": false,
        "fontColor": "#000000",
        "offsetAdjust": {
            "horizontal": 0,
            "vertical": 0
        }
    },

    yLabel: {
        "display": true,
        "text": "y label",
        "rotation": -90,
        "fontType": "helvetica",
        "fontSize": 14,
        "fontBold": false,
        "fontItalic": false,
        "fontUnderline": false,
        "fontColor": "#000000",
        "offsetAdjust": {
            "horizontal": 0,
            "vertical": 0
        }
    },
    yLabel2: {
        "display": true,
        "text": "y label second",
        "rotation": -90,
        "fontType": "helvetica",
        "fontSize": 14,
        "fontBold": false,
        "fontItalic": false,
        "fontUnderline": false,
        "fontColor": "#000000",
        "offsetAdjust": {
            "horizontal": 0,
            "vertical": 0
        }
    },
    yAxis: {
        "display": true,
        "displayLine": true,
        "tickNumber": 8,
        "tickFormat": d3.format(",.0f"),
        "tickPadding": 3,
        "tickSize": 10,
        "orientation": "left",
        "tickValue": [],
        "fontColor": "#000",
        "fontType": "helvetica",
        "fontSize": 12,
        "fontBold": false,
        "fontItalic": false,
        "fontUnderline": false,
        "tickLineColor": "#ccc",
        "tickLineWidth": 0.2,
        "axisColor": '#000',
        "axisWidth": 1,
        "rotation": 0,
        "offsetAdjust": {
            "horizontal": 0,
            "vertical": 0
        }
    },
    yAxis2: {
        "display": true,
        "displayLine": false,
        "tickNumber": 8,
        "tickFormat": d3.format(",.0f"),
        "tickPadding": 3,
        "tickSize": 10,
        "orientation": "right",
        "tickValue": [],
        "fontColor": "#000",
        "fontType": "helvetica",
        "fontSize": 12,
        "fontBold": false,
        "fontItalic": false,
        "fontUnderline": false,
        "tickLineColor": "#ccc",
        "tickLineWidth": 0.2,
        "axisColor": '#000',
        "axisWidth": 1,
        "rotation": 0,
        "offsetAdjust": {
            "horizontal": 0,
            "vertical": 0
        }
    },
    xAxis: {
        "display": true,
        "isTimeSeries": false,
        "displayLine": true,
        "tickNumber": 5,
        "tickFormat": "",
        "tickPadding": 3,
        "tickSize": 10,
        "orientation": "bottom",
        "tickValue": [],
        "fontColor": "#000",
        "fontType": "helvetica",
        "fontSize": 12,
        "fontBold": false,
        "fontItalic": false,
        "fontUnderline": false,
        "tickLineColor": "#ccc",
        "tickLineWidth": 0.2,
        "axisColor": '#000',
        "axisWidth": 1,
        "rotation": 0,
        "offsetAdjust": {
            "horizontal": 0,
            "vertical": 0
        }
    },

    tooltip: {
        "display": true,
        "text": "tooltip",
        "fontType": "helvetica",
        "fontSize": 12,
        "fontBold": false,
        "fontItalic": false,
        "fontUnderline": false,
        "fontColor": "#fff",
        "width": "auto",
        "height": "auto"
    },
    node: {
        display: true,
        type: {},
        size: {},
        fillOpacity: {},
        strokeWidth: {}
    }

};

var ScatterChart = function (options) {
    return bChart._runMethodsInConstructor(this, options, arguments, 'scatter');
};

bChart.ScatterChart = ScatterChart;

ScatterChart.prototype = Object.create(bChart.prototype);
ScatterChart.prototype.constructor = ScatterChart;

ScatterChart.prototype.draw = function () {
    var self = this;
    if (!bChart.getLength(d3.select(self._options.selector))) {
        console.log("Please make sure the element exists in your template.");
        return void 0;
    }

    self.min('refresh').max('refresh').updateMin();
    if (self._options.secondAxis) {
        self.min2('refresh').max2('refresh').updateMin2();
    }

    self.colors('refresh')._drawChartSVG();

    self.title('refresh').legend('refresh').tooltip('refresh').xLabel('refresh').yLabel('refresh').xAxis('refresh').yAxis('refresh');
    if (self._options.secondAxis) {
        self.yLabel2('refresh').yAxis2('refresh');
    }

};


ScatterChart.prototype._drawScatterChart = function () {
    var self = this;
    self._updateChartSize();

    var chartSVG = d3.select(self._options.selector).select('g.bChart');
    var x0;
    if (!self._options.xAxis.isTimeSeries) {
        x0 = d3.scale.ordinal()
            .rangePoints([0, self._options._chartSVGWidth],0.1)
            .domain(self._options._uniqueXArray);
    }

    // set default tickSize;
    self._options.xAxis.tickSize = -self._options._chartSVGHeight;
    self._options.yAxis.tickSize = -self._options._chartSVGWidth;

    var	xAxis = d3.svg.axis()
        .scale(x0)
        .orient(self._options.xAxis.orientation)
        .ticks(self._options.xAxis.tickNumber)
        .tickSize(self._options.xAxis.tickSize, 0, 0);


    if (chartSVG.select('.bChart_x_axis').empty()) {
        chartSVG.append('g')
            .attr('class', 'bChart_x_axis bChart_grid')
            .attr('transform', 'translate(0,' + self._options._chartSVGHeight + ')')
            .call(xAxis);
    } else {
        chartSVG.select('.bChart_x_axis')
            .transition()
            .duration(self._options.duration)
            .ease("sin-in-out")
            .call(xAxis);
    }

    var	y = d3.scale.linear()
        .range([self._options._chartSVGHeight, 0])
        .domain([self._options.minDefault, self._options.maxDefault]);

    var	yAxis = d3.svg.axis()
        .scale(y)
        .orient(self._options.yAxis.orientation)
        .tickFormat(self._options.yAxis.tickFormat)
        .ticks(self._options.yAxis.tickNumber)
        .tickSize(self._options.yAxis.tickSize, 0, 0);

    if (chartSVG.select('.bChart_y_axis').empty()) {
        chartSVG.append('g')
            .attr('class', 'bChart_y_axis bChart_grid')
            .call(yAxis);
    } else {
        chartSVG.select('.bChart_y_axis')
            .transition()
            .duration(self._options.duration)
            .ease("sin-in-out")
            .call(yAxis);
    }

    if (self._options.secondAxis) {
        var	y2 = d3.scale.linear()
            .range([self._options._chartSVGHeight, 0])
            .domain([self._options.minDefault2, self._options.maxDefault2]);
        var	yAxis2 = d3.svg.axis()
            .scale(y2)
            .orient(self._options.yAxis2.orientation)
            .tickFormat(self._options.yAxis2.tickFormat)
            .ticks(self._options.yAxis2.tickNumber)
            .tickSize(self._options.yAxis2.tickSize, 0, 0);
        if (chartSVG.select('.bChart_y_axis_2').empty()) {
            chartSVG.append('g')
                .attr('class', 'bChart_y_axis_2 bChart_grid')
                .attr('transform', 'translate(' + self._options._chartSVGWidth + ',0)')
                .call(yAxis2);
        } else {
            chartSVG.select('.bChart_y_axis_2')
                .attr('transform', 'translate(' + self._options._chartSVGWidth + ',0)')
                .transition()
                .duration(self._options.duration)
                .ease("sin-in-out")
                .call(yAxis2);
        }
    }

    drawSVG();
    self.node('refresh');

    return self;

    function drawSVG(){
        var	_datasetTmp = self._options._dataset;
        var	groupConcat = self._options._uniqueGroupArrayAll;

        var scatterSVG, scatterPathSVG;
        if (chartSVG.select('.bChart_nodes').empty()) {
            scatterSVG = chartSVG.append('g')
                .attr('class', 'bChart_nodes');
        } else {
            scatterSVG = chartSVG.select('.bChart_nodes');
        }
        scatterPathSVG = scatterSVG.selectAll('.bChart_groups')
            .data(_datasetTmp);

        var nodeGenerator = d3.svg.symbol()
            .type(function (d) {
                return self._options.node.type[d.group];
            }).size(function (d) {
                return self._options.node.size[d.group];
            });

        scatterPathSVG.exit().remove();
        scatterPathSVG.enter().append('path')
            .attr('class', function(d) {
                return 'bChart_groups bChart_groups' + groupConcat.indexOf(d.group);
            })
            .attr('d', nodeGenerator)
            .attr('transform', function (d) {
                return d.secondAxis? "translate(" + x0(d.x) + "," + y2(d.value) + ")": "translate(" + x0(d.x) + "," + y(d.value) + ")";
            })
            .style('opacity', 0)
            .transition()
            .duration(self._options.duration)
            .style('opacity', 1);


    }
};