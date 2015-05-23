/**
 * Created by CaptainMao on 5/22/15.
 */
bChart.prototype.yLabel2 = function (options) {
    var self = this;
    if (!self._options.secondAxis) {
        var chartSVG = d3.select(self._options.selector).select('g.bChart');
        chartSVG.select('.bChart_ylabel_2').style('display', 'none');
        return self;
    }
    if (!bChart.existy(options)) {
        return self._options.yLabel2;

    } else {
        if (bChart.typeString(options) && options === 'refresh') {
            self.yLabel('yLabel2');

        } else {
            self.setOptions(arguments,'yLabel2');
            self.yLabel('yLabel2');
        }

        return self;
    }
};

bChart.prototype.yLabel = function (options) {
    var self = this;
    if (!bChart.existy(options)) {
        return self._options.yLabel;
    } else {
        if (bChart.typeString(options) && options === 'refresh') {
            drawYLabel();

        } else if (options === 'yLabel2') {
            drawYLabel(true);
        } else {
            self.setOptions(arguments, 'yLabel');
            drawYLabel();
        }
        return self;

    }

    function drawYLabel (drawSecAxis) {
        var labelType, yPos, xPos, yLabelSVG;

        if (bChart.existy(drawSecAxis) && drawSecAxis) {
            labelType = 'yLabel2';
        } else {
            labelType = 'yLabel';
        }
        var chartSVG = d3.select(self._options.selector).select('g.bChart');
        if (self._options[labelType].display) {
            if (bChart.existy(drawSecAxis) && drawSecAxis) {
                if (chartSVG.select('.bChart_ylabel_2').empty()) {
                    yLabelSVG = chartSVG.append('g')
                        .append('text')
                        .attr('class', 'bChart_ylabel_2');
                } else {
                    yLabelSVG = chartSVG.select('.bChart_ylabel_2').style('display', 'block');
                }
            } else {
                if (chartSVG.select('.bChart_ylabel').empty()) {
                    yLabelSVG = chartSVG.append('g')
                        .append('text')
                        .attr('class', 'bChart_ylabel');
                } else {
                    yLabelSVG = chartSVG.select('.bChart_ylabel').style('display', 'block');
                }
            }

            yPos = self._options._chartSVGHeight/2 - self._options[labelType].offsetAdjust.vertical;
            if (bChart.existy(drawSecAxis) &&  drawSecAxis) {
                xPos = self._options.padding.left + self._options._chartSVGWidth + self._options[labelType].offsetAdjust.horizontal;

            } else {
                xPos = -self._options.padding.left + 25 + self._options[labelType].offsetAdjust.horizontal;

            }
            yLabelSVG.style('text-anchor', 'middle')
                .style('fill', self._options[labelType].fontColor)
                .attr('y', yPos)
                .attr('x', xPos)
                .attr('transform', function (d) {
                    return 'rotate(' + self._options[labelType].rotation + ' ' + xPos.toString() + ' ' + yPos.toString() + ')';
                })
                .style('font-size', self._options[labelType].fontSize)
                .style('font-family', self._options[labelType].fontType)
                .style('text-decoration', function () {
                    return self._options[labelType].fontUnderline? 'underline' : 'none';
                })
                .style('font-weight', function () {
                    return self._options[labelType].fontBold? 'bold': 'normal';
                })
                .style('font-style', function () {
                    return self._options[labelType].fontItalic ? 'italic' : 'normal';
                })
                .text(self._options[labelType].text);
        } else {
            if (bChart.existy(drawSecAxis) && drawSecAxis) {
                chartSVG.select('.bChart_ylabel_2').style('display', 'none');

            } else {
                chartSVG.select('.bChart_ylabel').style('display', 'none');

            }
        }

    }
};