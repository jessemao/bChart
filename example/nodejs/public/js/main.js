/*global define:true*/
define(['lib/bChart'], function (bChart) {
    'use strict';
    var barchart = bChart.BarChart('#skills', {
        "isStack": true,
        "barDistance": 4,
        "data": {
            dataValue: [['Label 1','45', '32', '15'],
                ['Label 2', '12', '33', '22']
            ],
            groups: ['Label 4'],
            groups2: ['Label 2'],
            x: ['2010', '2011', '2012']
        }
    });


    //var barchart1 = bChart('#skills2', 'BarChart');
    //var barchart2 = bChart('#skills2');
    //barchart1.options({
    //    'isStack': false,
    //    'width': 800
    //}).legend({
    //    offsetAdjust: {
    //        horizontal: -10,
    //        vertical: -100
    //    },
    //    "offsetSymbol": 20
    //});
    //barchart2.xLabel('display', false)
    //   .load({
    //        dataValue: [['Label 1','45', '32', '15']],
    //        //groups: ['Label 4'],
    //        x: ['2010', '2011', '2012']
    //    }).yAxis('tickNumber', 3).yLabel2('display', false);
    //
    setTimeout(function () {
        barchart.unload({
            x: ['2010']
        });
    }, 1000)

    //console.log(barchart.options())
    //$('#skills').button();
    //button("#skills");
    return {};
});