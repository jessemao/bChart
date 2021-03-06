/**
 * Created by CaptainMao on 5/18/15.
 */
//document.onload('ready', function () {
    //bChart
    //bChart('#skills', 'BarChart');

    var barchart = bChart.BarChart('#skills', {
        //"isStack": true
        //"data": {
        //    dataValue: [['Label 1','45', '32', '15'],
        //        ['Label 2', '12', '33', '22']
        //    ],
        //    groups: ['Label 4'],
        //    //groups2: ['Label 2'],
        //    x: ['2010', '2011', '2012']
        //}
    });
    barchart.loadCSV('/dataset/sample3.csv', {
        groups: ['data1','data4'],
        groups2: ['data1'],
        x:'date'
    });

    barchart.tooltip({
            'type': 1,
            "xHTML": "<div class='bchart-tooltip-header'> #x# </div>",
            "groupHTML": "<div class='bchart-tooltip-row'><div class='bchart-tooltip-group'>#group#</div><div class='bchart-tooltip-value'>#value#</div></div>",
            "html": "{{x}}{{group}}",
            //"fontSize": '20px'
        })
        .xAxis({
            "isTimeSeries": false,
            "rotation": -45
            //'timeFormat': 'Mm-yyyy',
            //'offsetAdjust': 10,
            //'fontSize': '13px',

            //"html": "{{x:<div class='bchart-tooltip-header'> #x# </div>}}{{group: <div class='bchart-tooltip-row'><div class='bchart-tooltip-group'>#group#</div><div class='bchart-tooltip-value'>#value#</div></div>}}"
        })
        //.line({
        //    //"fillOpacity.$0": 1,
        //    "strokeWidth.$1": 5,
        //    "strokeOpacity": 1
        //})
        //.node({
        //    'display': true,
        //    'fillOpacity': 0,
        //    'strokeWidth': 4,
        //    'solidCircle': true,
        //    'size': 64
        //})
        .legend({
            //'textFirst': false,
            //'symbolSize': 20
            'position': 'bottom'
        })
        .yAxis({
            //'rotation': -45,
            'offsetAdjust': 10,
            'tickLineColor': '#ff0000',
            'tickLineWidth': 2,
            'axisColor': '#00ff00',
            'axisWidth': 2,
            'innerTickSize': '-10',
            'tickNumber': 4
            //'tickFormat': d3.format(' $0.f')
        })
        .yAxis2({
            'offsetAdjust': 10,
            'tickLineColor': '#ff0000',
            'tickLineWidth': 2,
            'axisColor': '#00ff00',
            'axisWidth': 2,
            'innerTickSize': '-10',
            'tickNumber': 4

        });

    //setTimeout(function () {
    //    barchart.options("isStack", false);
    //}, 1000);

    //barchart.background('color', '#cc0000');

    //var barchart1 = bChart('#skills');
    //setTimeout(function () {
    //    barchart1.unload({
    //        x: ['2010']
    //    });
    //}, 1000);
    setTimeout(function () {
        //barchart.load([['Label 4', '42', '53', '32']]);
    }, 2000);

    var pie = bChart.PieChart('#skills2', {
        "data": {
            dataValue: [['Label 1','45'],
                ['Label 2', '12']
            ]
        },
        "isDonut": true
    })
    //.node("type.Label 1", "cross");
    setTimeout(function () {
        bChart("#skills2").load([['Label 3', '33']]);
    }, 1000);

    setTimeout(function () {
        bChart("#skills2").unload(['Label 3']);
    }, 1500);

    //var scatter = bChart.AreaChart('#skills2', {
    //    "data": {
    //        dataValue: [['Label 1','45', '32', '15'],
    //            ['Label 2', '12', '33', '22']
    //        ],
    //        x: ['2010', '2011', '2012']
    //    }
    //})
    //    //.node("type.Label 1", "cross");
    //setTimeout(function () {
    //    scatter.load([['Label 3', '33', '12', '54']]);
    //}, 1000);
    //setTimeout(function () {
    //    scatter.bubble({
    //        "Label 1": ['420', '730', '420'],
    //        "Label 2": ['1000', '320', '15']
    //    });
    //}, 500);
    //setTimeout(function () {
    //    scatter.unload({
    //        x: ['2010']
    //    });
    //}, 1000);
    //setTimeout(function () {
    //    scatter.unload(['Label 2']);
    //}, 2000);

    //barchart.load([['data', '45', '32', '15']]);

//})

//if (bChart.isArrayLike(obj.dataValue[0])) {
//    if (bChart.hasProperty(obj, 'groups') || !bChart.typeNumber(obj.dataValue[0][0])) {
//        for (var i = 0; i < obj.dataValue.length; i += 1) {
//            var groupName = "";
//            if (bChart.existy(obj.groups)&&bChart.existy(obj.groups[i])) {
//                groupName = obj.groups[i];
//            } else {
//                groupName = bChart.typeNumber(obj.dataValue[i][0]) ? "unknown": obj.dataValue[i][0];
//            }
//            if (!bChart.isElementInArray(groupName, self._options._uniqueGroupArrayAll)) {
//                self._options._uniqueGroupArrayAll.push(groupName);
//            }
//            bChart.each(obj.dataValue[i], function (elem, idx, array) {
//                if (bChart.typeNumber(obj.dataValue[i][idx])) {
//
//                    var dataItem = {x: "", group: groupName, value: obj.dataValue[i][idx]};
//                    if (bChart.typeNumber(obj.dataValue[i][0])) {
//                        if (bChart.existy(obj.x[idx])) {
//
//                            dataItem.x = obj.x[idx];
//                        } else {
//                            dataItem.x = idx;
//                        }
//                    } else {
//                        if (idx === 0) {
//                            return;
//                        } else {
//                            if (bChart.existy(obj.x[idx - 1])) {
//                                self.loadArrayData(obj.dataValue);
//                            }
//                        }
//
//                        dataItem.x = obj.x[idx - 1];
//                    } else {
//                        dataItem.x = idx;
//                    }
//                }