/**
 * Created by CaptainMao on 5/22/15.
 */
bChart.prototype.colors = function (options) {
    var self = this;
    if (!bChart.existy(options)) {
        return self._options.colors;
    } else {
        if (bChart.typeString(options) && options === 'refresh') {
            updateColors();
        } else {
            self.setOptions(arguments, 'colors');
            updateColors();
        }
        return self;
    }

    function updateColors() {
        var colorTmp = "";
        bChart.each(self._options._uniqueGroupArrayAll, function (value, key) {
            if (self._options.colors[key].indexOf('#')>=0) {
                colorTmp = bChart.hexToRGBA(self._options.colors[(key % self._options.colors.length)], self._options.colorOpacity);
            } else {
                colorTmp = self._options.colors[(key % self._options.colors.length)];
            }
            self._options._colorMap[value] = colorTmp;
        });
    }
};