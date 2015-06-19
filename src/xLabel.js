/**
 * Created by CaptainMao on 5/22/15.
 */
bChart.prototype.xLabel = function (options) {
    var self = this;
    if (!bChart.existy(options)) {
        return self._options.xLabel;

    } else {
        if (bChart.typeString(options) && options === 'refresh') {
            drawXLabel();

        } else {
            self.setOptions(arguments, 'xLabel');
            drawXLabel();
        }

        return self;
    }

    function drawXLabel () {
        var chartSVG = d3.select(self._options.selector).select('g.bChart');
        var xLabelSVG, xPos, yPos;
        if (self._options.xLabel.display) {
            if (chartSVG.select('.bChart_xlabel').empty()) {
                xLabelSVG = chartSVG.append('g')
                    .append('text')
                    .attr('class', 'bChart_xlabel');
            } else {
                xLabelSVG = chartSVG.select('.bChart_xlabel').style('display', 'block');
            }
            xPos = self._options._chartSVGWidth / 2 + self._options.xLabel.offsetAdjust.horizontal;
            yPos = self._options._chartSVGHeight + self._options.padding.bottom - 20 - self._options.xLabel.offsetAdjust.vertical;
            xLabelSVG.style('font-size', self._options.xLabel.fontSize)
                .style('font-family', self._options.xLabel.fontType)
                .style('fill', self._options.xLabel.fontColor)
                .attr('x', xPos)
                .attr('y', yPos)
                .style('text-anchor', 'middle')
                .style('text-decoration', function () {
                    return self._options.xLabel.fontUnderline ? 'underline' : 'none';
                })
                .style('font-weight', function () {
                    return self._options.xLabel.fontBold ? 'bold' : 'normal';
                })
                .style('font-style', function () {
                    return self._options.xLabel.fontItalic ? 'italic':'normal';
                })
                .attr('transform', function (d) {
                    return 'rotate(' + self._options.xLabel.rotation + ' ' + xPos.toString() + ' ' + yPos.toString() + ')';
                })
                .text(self._options.xLabel.text);
        } else {
            chartSVG.select('.bChart_xlabel').style('display', 'none');
        }
    }
};