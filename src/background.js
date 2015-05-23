/**
 * Created by CaptainMao on 5/22/15.
 */
bChart.prototype.background = function (options) {
    var self = this;
    if (!bChart.existy(options)) {
        return self._options.background;
    } else {
        if (bChart.typeString(options) && options === 'refresh') {
            drawBackground();
        } else {
            self.setOptions(arguments, 'bChart_background');
            drawBackground();
        }
        return self;
    }
    function drawBackground () {
        var backgroundDIV;
        var parentSVG = d3.select(self._options.selector);
        if (parentSVG.select('.bChart_background').empty()) {
            backgroundDIV = parentSVG.append('div')
                .attr('class', 'bChart_background');
        } else {
            backgroundDIV = parentSVG.select('.bChart_background');
        }
        backgroundDIV
            .style('width', self._options.width + 'px')
            .style('height', self._options.height + 'px');

        if (self._options.background.displayImage) {
            if (bChart.existy(self._options.background.imageURL)) {
                backgroundDIV.style('background-image', 'url(' + self._options.background.imageURL + ')')
                    .style('opacity', self._options.background.opacity);

            } else {
                self._options.background.displayImage = false;
            }
        } else {
            backgroundDIV.style('background-image', 'none')
                .style('background-color', self._options.background.color)
                .style('opacity', self._options.background.opacity);
        }
    }
};