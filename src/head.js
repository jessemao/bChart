(function (factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else {
        window.bChart = factory();
    }
})(function () {
    "use strict";
