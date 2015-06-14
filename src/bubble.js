/**
 * Created by CaptainMao on 5/23/15.
 */
bChart.prototype.bubble = function (options) {
    var self = this;
    if (!bChart.existy(options)) {
        return self._options.bubble;
    }

    if (bChart.isArrayLike(options)) {
        var objOption = {};
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
        self._setSpecificPropertiesByChart(options, 'bubble');
    }

    return self;

};