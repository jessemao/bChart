/**
 * Created by CaptainMao on 5/18/15.
 */
$(document).ready(function () {
    //bChart
    //bChart('#skills', 'BarChart');

    var barchart = bChart.AreaChart('#skills', {
        "isStack": true,
        "data": {
            dataValue: [['Label 1','45', '32', '15'],
                ['Label 2', '12', '33', '22']
            ],
            groups: ['Label 4'],
            //groups2: ['Label 2'],
            x: ['2010', '2011', '2012']
        }
    });

    //var barchart1 = bChart('#skills');
    //setTimeout(function () {
    //    barchart1.unload({
    //        x: ['2010']
    //    });
    //}, 1000);
    //setTimeout(function () {
    //    barchart1.unload(['Label 2']);
    //}, 2000);

    var pie = bChart.PieChart('#skills2', {
        "data": {
            dataValue: [['Label 1','45'],
                ['Label 2', '12']
            ]
        }
    })
    //.node("type.Label 1", "cross");
    setTimeout(function () {
        bChart("#skills2").load([['Label 3', '33']]);
    }, 1000);

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

})

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