/**
 * Created by CaptainMao on 5/22/15.
 */
bChart.prototype.title = function (options) {
    var self = this;
    if (!bChart.existy(options)) {
        return self._options.title;
    } else {
        if (bChart.typeString(options) && options === 'refresh') {
            drawTitle();
        } else {
            self.setOptions(arguments, 'title');
            drawTitle();
        }

        return self;
    }


    function drawTitle () {
        var chartSVG = d3.select(self._options.selector).select('g.bChart');
        var titleSVG;
        if (self._options.title.display) {
            if (chartSVG.select('.bChart_title').empty()) {
                titleSVG = chartSVG.append('g').append('text')
                    .attr('class', 'bChart_title');
            } else {
                titleSVG = chartSVG.select('.bChart_title').style('display', 'block');
            }
            titleSVG.attr('x', (self._options._chartSVGWidth/2) + self._options.title.offsetAdjust.horizontal)
                .attr('y', -self._options.padding.top + self._options.title.offsetAdjust.vertical + 30)
                .attr('text-anchor', 'middle')
                .style('font-size', self._options.title.fontSize)
                .style('font-family', self._options.title.fontType)
                .style('fill', self._options.title.fontColor)
                .style('text-decoration', function () {
                    return self._options.title.fontUnderline ? 'underline': 'none';
                })
                .style('font-weight', function () {
                    return self._options.title.fontBold ? 'bold': 'normal';
                })
                .style('font-style', function () {
                    return self._options.title.fontItalic ? 'italic' : 'normal';
                })
                .text(self._options.title.text);
        } else {
            chartSVG.select('.bChart_title').style('display', 'none');
        }
    }
};