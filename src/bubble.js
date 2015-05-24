/**
 * Created by CaptainMao on 5/23/15.
 */
bChart.prototype.bubble = function (options) {
    var self = this;
    if (!bChart.existy(options)) {
        return self._options.bubble;
    } else {
        if (bChart.typeString(options)) {
            if (options === 'refresh') {
                drawBubble();
            } else if (options === 'clear') {
                self._options.bubble = {};
            }
        } else {
            var objOption;
            if (bChart.isArrayLike(options)) {
                objOption = {};
                bChart.each(options, function (elem, idx) {
                    var groupName, valueArray;
                    if (bChart.typeNumber(elem[0])) {
                        if (bChart.existy(self._options._uniqueGroupArrayAll[idx])) {
                            groupName = self._options._uniqueGroupArrayAll[idx];
                            valueArray = elem;
                        }
                    } else {
                        groupName = elem[0];
                        valueArray = elem;
                        valueArray.shift();
                    }
                    objOption[groupName] = valueArray;
                    var indexOfBubble = 0;

                    bChart.each(self._options._dataset, function (el) {
                        if (el.group === groupName) {
                            el.size = valueArray[indexOfBubble];
                            indexOfBubble++;
                        }
                    });
                });
            } else {
                if (arguments.length === 2) {
                    var indexOfBubble = 0;
                    var args = arguments;
                    bChart.each(self._options._dataset, function (el) {
                        if (el.group === args[0]) {
                            el.size = args[1][indexOfBubble];
                            indexOfBubble++;
                        }
                    });

                    objOption = args;
                } else {
                    bChart.each(options, function (value, key) {
                        var indexOfBubble = 0;
                        bChart.each(self._options._dataset, function (el) {
                            if (el.group === key) {
                                el.size = value[indexOfBubble];
                                indexOfBubble++;
                            }
                        });
                    });

                    objOption = options;
                }

            }
            self.setOptions(objOption, 'bubble');

            drawBubble();
        }

        return self;
    }

    function drawBubble() {


        self._drawChartSVG();
    }
};